import { readFile } from "node:fs/promises";

const filePath = process.argv[2] ?? "src/data/big-server.log";

try {
  const memoryBefore = process.memoryUsage().rss / 1024 ** 2;
  console.log("Memory before (MiB):", memoryBefore.toFixed(2));

  const content = await readFile(filePath, "utf8");

  const memoryAfter = process.memoryUsage().rss / 1024 ** 2;
  console.log("Characters read:", content.length);
  console.log("Memory after (MiB):", memoryAfter.toFixed(2));
  console.log("Memory increase (MiB):", (memoryAfter - memoryBefore).toFixed(2));
} catch (error) {
  console.error("Read error:", error.message);
  process.exitCode = 1;
}
