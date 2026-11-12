import { cp } from "node:fs/promises";

for (const directory of ["templates", "data"]) {
    await cp(
        new URL(`../src/${directory}/`, import.meta.url),
        new URL(`../dist/${directory}/`, import.meta.url),
        { recursive: true }
    );
}
