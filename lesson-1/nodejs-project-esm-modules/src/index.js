// import {isLeapYear} from "./dateFunctions.js";
// import User from "./User.js";

// console.log(isLeapYear(2008));
// import fs from "node:fs";

// fs.readFile("./src/data/sallaries.json", (error, buffer)=> {
//     if(error) {
//         return console.log(error.message);
//     }
//     console.log(buffer);
// });

import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

// readFile("./src/data/sallaries.json")
//     .then(buffer => console.log(buffer))
//     .catch(error => console.log(error.message));

// const sallariesPath = join("src", "data", "sallaries.json");
// const sallariesPath = join(process.cwd(), "src", "data", "sallaries.json");
const sallariesPath = resolve("src", "data", "sallaries.json");
// console.log(sallariesPath);

try {
  //   const buffer = await readFile(sallariesPath);
  //   const text = buffer.toString();
  //   console.log(text);
  // const text = await readFile(sallariesPath, "utf-8");
  // console.log(text[0]);
  const sallaries = JSON.parse(await readFile(sallariesPath, "utf-8"));
  console.log(sallaries);
} catch (error) {
  console.log(error.message);
}
