import { resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

import { writeAuditLog } from "../logs/logsOperations.js";
import { updateStats } from "../stats/statsOperations.js";

const requestsPath = resolve("src", "data", "requests.json");

const updateRequests = (requests) =>
  writeFile(requestsPath, JSON.stringify(requests, null, 2));

export const getRequests = async () =>
  JSON.parse(await readFile(requestsPath, "utf-8"));

export const createRequest = async (payload) => {
  const requests = await getRequests();
  const newRequest = {
    ...payload,
    id: randomUUID(),
    status: "new",
  };
  requests.push(newRequest);
  await updateRequests(requests);
  await writeAuditLog({ operation: "requestCreated", request: newRequest });
  await updateStats("requestCreated");
  return newRequest;
};

export const deleteRequestById = async (id) => {
  const requests = await getRequests();
  const idx = requests.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  const [deletedRequest] = requests.splice(idx, 1);
  await updateRequests(requests);
  await writeAuditLog({ operation: "requestDeleted", request: deletedRequest });
  await updateStats("requestDeleted");
  return deletedRequest;
};
