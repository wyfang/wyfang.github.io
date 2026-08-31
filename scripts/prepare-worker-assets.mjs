import { execFile } from "node:child_process";
import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(repositoryRoot, ".worker-assets");

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
}

console.log(
  `Prepared ${copiedFileCount} Worker assets in ${outputDirectory}`,
);
