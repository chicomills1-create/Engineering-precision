import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "public");
const destination = path.join(root, "dist/public");
let copied = 0;
let skippedHtml = 0;

function copyNonHtmlFiles(directory: string) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const input = path.join(directory, entry.name);
    const relative = path.relative(source, input);
    const output = path.join(destination, relative);
    if (entry.isDirectory()) {
      copyNonHtmlFiles(input);
    } else if (path.extname(entry.name).toLowerCase() === ".html") {
      skippedHtml++;
    } else {
      fs.mkdirSync(path.dirname(output), { recursive: true });
      fs.copyFileSync(input, output);
      copied++;
    }
  }
}

copyNonHtmlFiles(source);
for (const relative of ["capabilities-statement.html", "licensing-service-coverage/index.html", "procurement/submit-rfp-rfq/index.html"]) {
  const input = path.join(source, relative);
  const output = path.join(destination, relative);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.copyFileSync(input, output);
  copied++;
}
console.log(`Copied ${copied} static public assets to dist/public; skipped ${skippedHtml} generated HTML files`);