import { execFile } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(repositoryRoot, ".worker-assets");
const analyticsScript = '<script src="/analytics.js"></script>';
const analyticsScriptPattern =
  /[ \t]*<script\b[^>]*\bsrc=(["'])\/analytics\.js(?:\?[^"']*)?\1[^>]*>\s*<\/script>[ \t]*(?:\r?\n)?/gi;

const deploymentFiles = new Set([
  ".gitignore",
  "AGENTS.md",
  "package-lock.json",
  "package.json",
  "README.md",
  "scripts/prepare-worker-assets.mjs",
  "wrangler.jsonc",
]);

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });

const { stdout } = await execFileAsync("git", ["ls-files", "-z"], {
  cwd: repositoryRoot,
  encoding: "buffer",
  maxBuffer: 16 * 1024 * 1024,
});
const trackedFiles = new Set(
  stdout.toString("utf8").split("\0").filter(Boolean),
);
trackedFiles.add("_headers");
let copiedFileCount = 0;
let injectedHtmlCount = 0;

for (const relativePath of trackedFiles) {
  if (deploymentFiles.has(relativePath)) {
    continue;
  }

  const sourcePath = path.join(repositoryRoot, relativePath);
  const destinationPath = path.join(outputDirectory, relativePath);

  await mkdir(path.dirname(destinationPath), { recursive: true });
  await cp(sourcePath, destinationPath, {
    dereference: false,
    preserveTimestamps: true,
  });
  copiedFileCount += 1;

  if (relativePath.toLowerCase().endsWith(".html")) {
    let html = await readFile(destinationPath, "utf8");
    const newline = html.includes("\r\n") ? "\r\n" : "\n";
    const closingHeadPattern = /([ \t]*)<\/head\s*>/i;

    html = html.replace(analyticsScriptPattern, "");

    if (!closingHeadPattern.test(html)) {
      throw new Error(`Cannot inject analytics into ${relativePath}: missing </head>`);
    }

    html = html.replace(
      closingHeadPattern,
      (_closingHead, indentation) =>
        `${indentation}${analyticsScript}${newline}${indentation}</head>`,
    );
    await writeFile(destinationPath, html, "utf8");
    injectedHtmlCount += 1;
  }
}

console.log(
  `Prepared ${copiedFileCount} Worker assets and injected analytics into ${injectedHtmlCount} HTML files in ${outputDirectory}`,
);
