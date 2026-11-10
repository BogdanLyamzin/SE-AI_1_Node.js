import { program } from "commander";
import fs from "node:fs/promises";
import { resolve } from "node:path";

const commandList = ["show", "errors"];

program
  .option("--command <command>")
  .option("--file <path>");
program.parse();
const {command, file: filePath} = program.opts();

try {
  // const command = process.argv[2];
  // const filePath = process.argv[3];
  if(!command || !filePath) {
    console.error("Please enter command and filePath");
    process.exit(1);
  }

  if(!commandList.includes(command)) {
    console.error("Avaible commands only: show, errors");
    process.exit(1);
  }

  const content = await fs.readFile(filePath, "utf8");

  switch(command) {
    case "show": 
      console.log(content);
      break;
    
    case "errors":
      const errors = content.split("\n").filter(line => line.trim().startsWith("ERROR"));
      console.log(errors.join("\n"));
      break;
  }
} catch (error) {
  console.error("Read error:", error.message);
  process.exitCode = 1;
}

