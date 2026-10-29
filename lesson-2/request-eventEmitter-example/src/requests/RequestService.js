import { EventEmitter } from "node:events";
import { resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

const requestsPath = resolve("src", "data", "requests.json");

export default class RequestService extends EventEmitter {
  async getAll() {
    return JSON.parse(await readFile(requestsPath, "utf-8"));
  }

  async create(payload) {
    const requests = await this.getAll();
    const newRequest = {
      ...payload,
      id: randomUUID(),
      status: "new",
    };
    requests.push(newRequest);
    await this.update(requests);
    this.emit("requestCreated", newRequest);
    return newRequest;
  }

  update(requests) {
    return writeFile(requestsPath, JSON.stringify(requests, null, 2));
  }

  async deleteById(id) {
    const requests = await this.getAll();
    const idx = requests.findIndex((item) => item.id === id);
    if (idx === -1) return null;
    const [deletedRequest] = requests.splice(idx, 1);
    await this.update(requests);
    this.emit("requestDeleted", deletedRequest);
    return deletedRequest;
  }
}
