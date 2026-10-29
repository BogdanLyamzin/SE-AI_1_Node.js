import {resolve} from "node:path";
import { readFile, writeFile } from "node:fs/promises";

const statsPath = resolve("src", "data", "stats.json");

export const getStats = async ()=> JSON.parse(await readFile(statsPath, "utf-8"));

export const updateStats = async(operation)=> {
    const stats = await getStats();
    stats[operation] += 1;
    await writeFile(statsPath, JSON.stringify(stats, null, 2));
}