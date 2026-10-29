import {resolve} from "node:path";
import { appendFile } from "node:fs/promises";

const auditLogPath = resolve("src", "data", "audit.log");

export const writeAuditLog = async({operation, request})=> {
    const timestamp = new Date().toISOString();
    const line = `${timestamp} ${operation} ${request.id}\n`;
    await appendFile(auditLogPath, line);
}