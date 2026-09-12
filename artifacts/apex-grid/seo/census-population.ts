export type PopulationStatus = "verified-positive" | "confirmed-zero" | "unavailable";

export interface PopulationRecord {
  geoid: string;
  name?: string;
  population: number;
}

export interface PopulationResolution {
  pop?: number;
  populationDataset?: "ACS 5-year" | "Population Estimates Program";
  populationStatus: PopulationStatus;
  populationEvidenceNote?: string;
}

const ACS_SUMMARY_LEVEL_PREFIX = "1600000US";
const PEP_SUMMARY_LEVELS = new Set(["162", "061"]);

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index++) {
    const character = line[index];
    if (character === "\"") {
      if (quoted && line[index + 1] === "\"") {
        value += "\"";
        index++;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }
  values.push(value);
  return values;
}

export function parseAcsPopulations(text: string): Map<string, PopulationRecord> {
  const [header, ...rows] = text.trim().split(/\r?\n/);
  const columns = header.split("|");
  const required = ["GEO_ID", "B01003_E001"];
  if (!required.every((column) => columns.includes(column))) {
    throw new Error(`Unexpected Census ACS population columns: ${header}`);
  }
  const geoidIndex = columns.indexOf("GEO_ID");
  const populationIndex = columns.indexOf("B01003_E001");
  const populations = new Map<string, PopulationRecord>();
  for (const row of rows) {
    const values = row.split("|");
    const censusId = values[geoidIndex] ?? "";
    if (!censusId.startsWith(ACS_SUMMARY_LEVEL_PREFIX)) continue;
    const geoid = censusId.slice(ACS_SUMMARY_LEVEL_PREFIX.length);
    const population = Number(values[populationIndex]);
    if (/^\d{7}$/.test(geoid) && Number.isFinite(population) && population >= 0) {
      populations.set(geoid, { geoid, population });
    }
  }
  return populations;
}

export function parsePepPopulations(text: string): Map<string, PopulationRecord> {
  const [header, ...rows] = text.trim().split(/\r?\n/);
  const columns = parseCsvLine(header);
  const required = ["SUMLEV", "STATE", "PLACE", "COUSUB", "NAME", "POPESTIMATE2024"];
  if (!required.every((column) => columns.includes(column))) {
    throw new Error(`Unexpected Census Population Estimates columns: ${header}`);
  }
  const indexOf = (column: string) => columns.indexOf(column);
  const populations = new Map<string, PopulationRecord>();
  for (const row of rows) {
    const values = parseCsvLine(row);
    const summaryLevel = values[indexOf("SUMLEV")];
    if (!PEP_SUMMARY_LEVELS.has(summaryLevel)) continue;
    const geography = summaryLevel === "162" ? values[indexOf("PLACE")] : values[indexOf("COUSUB")];
    const geoid = `${values[indexOf("STATE")]}${geography}`;
    const population = Number(values[indexOf("POPESTIMATE2024")]);
    if (/^\d{7}$/.test(geoid) && Number.isFinite(population) && population >= 0) {
      populations.set(geoid, { geoid, name: values[indexOf("NAME")], population });
    }
  }
  return populations;
}

export function resolvePopulation(
  geoid: string,
  acs: ReadonlyMap<string, PopulationRecord>,
  pep: ReadonlyMap<string, PopulationRecord>,
  crosswalk?: { pepGeoid: string; note: string },
): PopulationResolution {
  const acsRecord = acs.get(geoid);
  if (acsRecord) {
    return {
      pop: acsRecord.population,
      populationDataset: "ACS 5-year",
      populationStatus: acsRecord.population > 0 ? "verified-positive" : "confirmed-zero",
    };
  }
  const pepRecord = pep.get(crosswalk?.pepGeoid ?? geoid);
  if (pepRecord) {
    return {
      pop: pepRecord.population,
      populationDataset: "Population Estimates Program",
      populationStatus: pepRecord.population > 0 ? "verified-positive" : "confirmed-zero",
      ...(crosswalk ? { populationEvidenceNote: crosswalk.note } : {}),
    };
  }
  return {
    populationStatus: "unavailable",
    populationEvidenceNote: "No matching record in the current ACS or Population Estimates file.",
  };
}

export function populationAllowsIndexing(status: PopulationStatus | undefined): boolean {
  return status === "verified-positive";
}