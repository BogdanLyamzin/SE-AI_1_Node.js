import { open } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const filePath = fileURLToPath(
  new URL("../src/data/big-server.log", import.meta.url),
);
const sizeMiB = Number(process.argv[2] ?? 20);

if (!Number.isSafeInteger(sizeMiB) || sizeMiB <= 0) {
  console.error("Size must be a positive integer in MiB.");
  process.exit(1);
}

// Four lines of 128 bytes each. The complete block is exactly 1 MiB.
const template = [
  "INFO Server started",
  "INFO Request completed successfully",
  "WARN Slow response",
  "ERROR Connection timeout",
]
  .map((line) => line.padEnd(127, " ") + "\n")
  .join("");
const block = Buffer.from(template.repeat(2048));

try {
  // wx creates a new file without overwriting an existing one.
  const file = await open(filePath, "wx");

  try {
    for (let writtenMiB = 0; writtenMiB < sizeMiB; writtenMiB++) {
      await file.writeFile(block);

      if ((writtenMiB + 1) % 32 === 0) {
        console.log(`Written: ${writtenMiB + 1}/${sizeMiB} MiB`);
      }
    }
  } finally {
    await file.close();
  }

  console.log(`File created: ${filePath}`);
  console.log(`Size: ${sizeMiB} MiB`);
  console.log(`Lines: ${sizeMiB * 8192}`);
} catch (error) {
  if (error.code === "EEXIST") {
    console.error(`File already exists: ${filePath}`);
    console.error("You can run the reading demos now.");
  } else {
    console.error("File creation error:", error.message);
  }

  process.exitCode = 1;
}
