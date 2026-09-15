import { randomBytes } from "crypto";

const ESTIMATE_ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export type EstimateFailureLogContext = {
  requestId: string;
  estimateId: string;
  errorCategory: string;
};

export function estimateFailureLogContext(
  requestId: string,
  estimateId: string,
  errorCategory: string,
): EstimateFailureLogContext {
  return { requestId, estimateId, errorCategory };
}

export function createEstimatePublicId(): string {
  const bytes = randomBytes(16);
  let value = "";
  for (const byte of bytes) value += ESTIMATE_ID_ALPHABET[byte % ESTIMATE_ID_ALPHABET.length];
  return `EST-${value}`;
}

function pdfEscape(text: string): string {
  return text.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

/** Deterministic one-page PDF writer for the saved, already-rendered summary text. */
export function writeEstimatePdf(text: string): Buffer {
  const lines = text.split("\n").flatMap((line) => {
    const chunks: string[] = [];
    for (let i = 0; i < line.length; i += 92) chunks.push(line.slice(i, i + 92) || " ");
    return chunks.length ? chunks : [" "];
  }).slice(0, 46);
  const commands = [
    "BT",
    "/F1 10 Tf",
    "48 744 Td",
    "13 TL",
    ...lines.map((line, index) => `${index ? "T* " : ""}(${pdfEscape(line)}) Tj`),
    "ET",
  ].join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(commands, "ascii")} >>\nstream\n${commands}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 0; i < objects.length; i += 1) {
    offsets.push(Buffer.byteLength(pdf, "ascii"));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xref = Buffer.byteLength(pdf, "ascii");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i += 1) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "ascii");
}