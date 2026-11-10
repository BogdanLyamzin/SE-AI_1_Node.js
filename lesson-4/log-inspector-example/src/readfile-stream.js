// import {readFile} from "node:fs/promises";
import { createReadStream } from "node:fs";
import {resolve} from "node:path";
import { createInterface } from "node:readline";

const filePath = resolve("src", "data", "big-server.log");

// const content = await readFile(filePath, "utf-8");
// console.log(content);
console.log(process.memoryUsage().rss / 1024 ** 2);
const stream = createReadStream(filePath);

const lines = createInterface({
    input: stream,
    crlfDelay: Infinity,
})
let counter = 0;
lines.on("line", line => {
    console.log(line);
    counter += 1;
        console.log(`counter: ${counter}`)
    if(counter === 1000) process.exit(1);
})
const findErrorFromText = text => {

}
stream.pipe(findErrorFromText);
// stream.on("data", chunk => {
//     console.log(chunk.toString());
// })

// stream.on("end", ()=> {
//     console.log(process.memoryUsage().rss / 1024 ** 2);
// })