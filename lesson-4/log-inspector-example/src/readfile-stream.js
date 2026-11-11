import { EventEmitter, once } from "node:events";
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

class LogReader extends EventEmitter {
  async read(filePath) {
    const input = createReadStream(filePath, { encoding: "utf8" });
    const lines = createInterface({ input, crlfDelay: Infinity });
    const stats = { lines: 0, errors: 0 };

    this.emit("start", filePath);

    try {
      lines.on("line", (line) => {
        stats.lines++;

        if (line.trimStart().startsWith("ERROR ")) {
          stats.errors++;
        }

        if (stats.lines % 50_000 === 0) {
          this.emit("progress", stats.lines);
        }
      });

      await once(lines, "close");
      this.emit("complete", stats);
    } catch (error) {
      this.emit("error", error);
    } finally {
      lines.close();
      input.destroy();
    }
  }
}

const filePath = process.argv[2] ?? "src/data/big-server.log";
const reader = new LogReader();
const memoryBefore = process.memoryUsage().rss / 1024 ** 2;

reader.on("start", (filePath) => {
  console.log("Reading:", filePath);
  console.log("Memory before (MiB):", memoryBefore.toFixed(2));
});

reader.on("progress", (count) => {
  console.log("Lines processed:", count);
});

reader.on("complete", (stats) => {
  const memoryAfter = process.memoryUsage().rss / 1024 ** 2;

  console.log("Lines read:", stats.lines);
  console.log("Error lines:", stats.errors);
  console.log("Memory after (MiB):", memoryAfter.toFixed(2));
  console.log("Memory increase (MiB):", (memoryAfter - memoryBefore).toFixed(2));
});

reader.on("error", (error) => {
  console.error("Read error:", error.message);
  process.exitCode = 1;
});

await reader.read(filePath);
