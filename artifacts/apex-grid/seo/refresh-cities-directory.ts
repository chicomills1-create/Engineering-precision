/**
 * Refreshes the lightweight city directory from the Census Gazetteer.
 *
 * This deliberately updates only cities-directory.json. It does not generate
 * pages (or alter any generated artifacts); run seo:generate separately when
 * that is desired.
 */
import fs from "node:fs";
import path from "node:path";
import { inflateRawSync } from "node:zlib";
import {
  LEGACY_LOCATION_REDIRECTS,
  RETAINED_LEGACY_LOCATIONS,
  locationPath,
} from "./legacy-locations";

const GAZETTEER_URL =
  "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2025_Gazetteer/2025_Gaz_place_national.zip";
const ACS_POPULATION_YEAR = 2024;
const ACS_POPULATION_URL =
  `https://www2.census.gov/programs-surveys/acs/summary_file/${ACS_POPULATION_YEAR}/table-based-SF/data/5YRData/acsdt5y${ACS_POPULATION_YEAR}-b01003.dat`;
const DIRECTORY_PATH = path.join(import.meta.dirname, "cities-directory.json");

interface ExistingCity {
  slug: string;
  name: string;
  pop?: number;
}

interface CensusCity {
  GEOID: string;
  NAME: string;
  LSAD: string;
  FUNCSTAT: string;
  INTPTLAT: string;
  INTPTLONG: string;
}

interface DirectoryCity extends ExistingCity {
  geoid: string;
  designation: string;
  lsad: string;
  lat: number;
  lng: number;
  populationYear?: number;
  populationSource?: string;
}

type CityDirectory = Record<string, ExistingCity[]>;
type RefreshedDirectory = Record<string, DirectoryCity[]>;

// State and territory abbreviations used by the Gazetteer. Entries not in the
// existing directory are intentionally ignored, keeping the output keyed by
// Apex Grid's established state slugs.
const STATE_SLUGS: Record<string, string> = {
  AL: "alabama", AK: "alaska", AZ: "arizona", AR: "arkansas", CA: "california",
  CO: "colorado", CT: "connecticut", DE: "delaware", FL: "florida", GA: "georgia",
  HI: "hawaii", ID: "idaho", IL: "illinois", IN: "indiana", IA: "iowa",
  KS: "kansas", KY: "kentucky", LA: "louisiana", ME: "maine", MD: "maryland",
  MA: "massachusetts", MI: "michigan", MN: "minnesota", MS: "mississippi",
  MO: "missouri", MT: "montana", NE: "nebraska", NV: "nevada",
  NH: "new-hampshire", NJ: "new-jersey", NM: "new-mexico", NY: "new-york",
  NC: "north-carolina", ND: "north-dakota", OH: "ohio", OK: "oklahoma",
  OR: "oregon", PA: "pennsylvania", RI: "rhode-island", SC: "south-carolina",
  SD: "south-dakota", TN: "tennessee", TX: "texas", UT: "utah", VT: "vermont",
  VA: "virginia", WA: "washington", WV: "west-virginia", WI: "wisconsin",
  WY: "wyoming", DC: "district-of-columbia", PR: "puerto-rico",
  VI: "u-s-virgin-islands", GU: "guam", MP: "northern-mariana-islands",
  AS: "american-samoa",
};

const LSAD_DESIGNATIONS: Record<string, string> = {
  "21": "Borough",
  "25": "City",
  "26": "City and borough",
  "27": "City and county",
  "28": "Borough",
  "29": "Municipality",
  "43": "Town",
  "47": "Village",
  "57": "Census designated place",
};

function readZipText(zip: Buffer): string {
  // Locate the end-of-central-directory record, which can be preceded by a
  // ZIP comment of up to 65,535 bytes.
  const minimumEocdOffset = Math.max(0, zip.length - 0xffff - 22);
  let eocd = -1;
  for (let offset = zip.length - 22; offset >= minimumEocdOffset; offset--) {
    if (zip.readUInt32LE(offset) === 0x06054b50) {
      eocd = offset;
      break;
    }
  }
  if (eocd < 0) throw new Error("Census download is not a valid ZIP archive");

  const entries = zip.readUInt16LE(eocd + 10);
  let offset = zip.readUInt32LE(eocd + 16);
  for (let entry = 0; entry < entries; entry++) {
    if (zip.readUInt32LE(offset) !== 0x02014b50) throw new Error("Invalid ZIP central directory");
    const compression = zip.readUInt16LE(offset + 10);
    const compressedSize = zip.readUInt32LE(offset + 20);
    const nameLength = zip.readUInt16LE(offset + 28);
    const extraLength = zip.readUInt16LE(offset + 30);
    const commentLength = zip.readUInt16LE(offset + 32);
    const localOffset = zip.readUInt32LE(offset + 42);
    const name = zip.subarray(offset + 46, offset + 46 + nameLength).toString("utf8");

    if (name.endsWith(".txt")) {
      if (zip.readUInt32LE(localOffset) !== 0x04034b50) throw new Error("Invalid ZIP local header");
      const localNameLength = zip.readUInt16LE(localOffset + 26);
      const localExtraLength = zip.readUInt16LE(localOffset + 28);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = zip.subarray(dataStart, dataStart + compressedSize);
      if (compression === 0) return compressed.toString("utf8");
      if (compression === 8) return inflateRawSync(compressed).toString("utf8");
      throw new Error(`Unsupported ZIP compression method: ${compression}`);
    }
    offset += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error("Census ZIP does not contain a place Gazetteer text file");
}

function parseGazetteer(text: string): CensusCity[] {
  const [header, ...rows] = text.trim().split(/\r?\n/);
  const delimiter = header.includes("|") ? "|" : "\t";
  const columns = header.split(delimiter);
  const required = ["GEOID", "NAME", "LSAD", "FUNCSTAT", "INTPTLAT", "INTPTLONG"];
  if (!required.every((column) => columns.includes(column))) {
    throw new Error(`Unexpected Census Gazetteer columns: ${header}`);
  }
  return rows.map((line) => {
    const values = line.split(delimiter);
    return Object.fromEntries(columns.map((column, index) => [column, values[index] ?? ""])) as CensusCity;
  });
}

function displayName(name: string, designation: string): string {
  const normalized = name.normalize("NFKC").replace(/\s+/g, " ").trim();
  // Gazetteer NAME values normally include the legal place type (e.g.,
  // "Huntsville city"). Store it independently and keep the display name
  // consistent with Apex Grid's existing city names.
  const suffix = designation.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return normalized.replace(new RegExp(`\\s+${suffix}$`, "i"), "").trim();
}

function slugify(name: string): string {
  const slug = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) throw new Error(`Cannot create a safe slug for "${name}"`);
  return slug;
}

async function main() {
  const current = JSON.parse(fs.readFileSync(DIRECTORY_PATH, "utf8")) as CityDirectory;
  const response = await fetch(GAZETTEER_URL, {
    headers: { "User-Agent": "Apex-Grid-Census-Directory-Refresh/1.0" },
  });
  if (!response.ok) throw new Error(`Census download failed: ${response.status} ${response.statusText}`);

  const source = parseGazetteer(readZipText(Buffer.from(await response.arrayBuffer())));
  const priorPopulation = new Map<string, number>();
  for (const [state, cities] of Object.entries(current)) {
    for (const city of cities) {
      if (typeof city.pop === "number") priorPopulation.set(`${state}/${city.slug}`, city.pop);
    }
  }

  const grouped = new Map<string, CensusCity[]>();
  // The national file identifies a state's portion of GEOID by FIPS. Convert
  // that code to USPS first, then use the USPS-to-Apex-slug map above.
  const stateFipsToAbbreviation: Record<string, string> = {
    "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT", "10": "DE", "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI", "56": "WY",
  };
  const populationByGeoid = new Map<string, number>();
  const populationResponse = await fetch(ACS_POPULATION_URL, {
    headers: { "User-Agent": "Apex-Grid-Census-Directory-Refresh/1.0" },
  });
  if (!populationResponse.ok) {
    throw new Error(`Census ACS population download failed: ${populationResponse.status} ${populationResponse.statusText}`);
  }
  const [populationHeader, ...populationRows] = (await populationResponse.text()).trim().split(/\r?\n/);
  const populationColumns = populationHeader.split("|");
  const geoidIndex = populationColumns.indexOf("GEO_ID");
  const populationIndex = populationColumns.indexOf("B01003_E001");
  if (geoidIndex < 0 || populationIndex < 0) {
    throw new Error(`Unexpected Census ACS population columns: ${populationHeader}`);
  }
  for (const row of populationRows) {
    const values = row.split("|");
    const geoId = values[geoidIndex] ?? "";
    if (!geoId.startsWith("1600000US")) continue;
    const population = Number(values[populationIndex]);
    if (Number.isFinite(population) && population > 0) {
      populationByGeoid.set(geoId.slice("1600000US".length), population);
    }
  }
  for (const city of source) {
    const stateSlug = STATE_SLUGS[stateFipsToAbbreviation[city.GEOID.slice(0, 2)] ?? ""];
    if (!stateSlug || !Object.hasOwn(current, stateSlug) || city.FUNCSTAT !== "A" || city.LSAD === "57") continue;
    const list = grouped.get(stateSlug) ?? [];
    list.push(city);
    grouped.set(stateSlug, list);
  }

  const refreshed: RefreshedDirectory = {};
  let retainedPopulation = 0;
  let addedWithoutPopulation = 0;
  for (const stateSlug of Object.keys(current)) {
    const used = new Set<string>();
    const cities = (grouped.get(stateSlug) ?? []).sort((a, b) => a.GEOID.localeCompare(b.GEOID));
    const refreshedCities: DirectoryCity[] = [];
    for (const city of cities) {
      const designation = LSAD_DESIGNATIONS[city.LSAD] ?? `Census LSAD ${city.LSAD}`;
      const name = displayName(city.NAME, designation);
      const baseSlug = slugify(name);
      let slug = baseSlug;
      if (used.has(slug)) {
        slug = `${baseSlug}-${city.GEOID}`;
        let suffix = 2;
        while (used.has(slug)) slug = `${baseSlug}-${city.GEOID}-${suffix++}`;
      }
      used.add(slug);
      const acsPopulation = populationByGeoid.get(city.GEOID);
      const pop = acsPopulation ?? priorPopulation.get(`${stateSlug}/${slug}`);
      const latitude = Number(city.INTPTLAT);
      const longitude = Number(city.INTPTLONG);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        throw new Error(`Invalid Census coordinates for ${city.GEOID}`);
      }
      if (pop === undefined) addedWithoutPopulation++;
      else retainedPopulation++;
      refreshedCities.push({
        slug,
        name,
        ...(pop === undefined ? {} : { pop }),
        ...(acsPopulation === undefined
          ? {}
          : {
              populationYear: ACS_POPULATION_YEAR,
              populationSource: ACS_POPULATION_URL,
            }),
        geoid: city.GEOID,
        designation,
        lsad: city.LSAD,
        lat: latitude,
        lng: longitude,
      });
    }
    refreshed[stateSlug] = refreshedCities;
  }

  const count = Object.values(refreshed).reduce((total, cities) => total + cities.length, 0);
  if (!count) throw new Error("Refusing to replace directory: no active incorporated places were found");
  const retainedPaths = new Set(
    RETAINED_LEGACY_LOCATIONS.map(({ stateSlug, city }) => locationPath(stateSlug, city.slug)),
  );
  const uncoveredRemovals: string[] = [];
  for (const [stateSlug, cities] of Object.entries(current)) {
    const refreshedSlugs = new Set((refreshed[stateSlug] ?? []).map((city) => city.slug));
    for (const city of cities) {
      if (refreshedSlugs.has(city.slug)) continue;
      const oldPath = locationPath(stateSlug, city.slug);
      if (!LEGACY_LOCATION_REDIRECTS[oldPath] && !retainedPaths.has(oldPath)) {
        uncoveredRemovals.push(oldPath);
      }
    }
  }
  if (uncoveredRemovals.length) {
    throw new Error(
      `Refusing to remove ${uncoveredRemovals.length} existing location URLs without an explicit redirect or retained-page entry:\n${uncoveredRemovals.join("\n")}`,
    );
  }
  // Do not leave a partial directory behind if writing is interrupted.
  const temporaryPath = `${DIRECTORY_PATH}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(refreshed, null, 2)}\n`);
  fs.renameSync(temporaryPath, DIRECTORY_PATH);
  console.log(`Refreshed ${count} active incorporated Census places across ${Object.keys(refreshed).length} states; retained ${retainedPopulation} population values and added ${addedWithoutPopulation} verified places without population claims.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});