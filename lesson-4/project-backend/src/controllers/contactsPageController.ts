import { type Request, type Response } from "express";
import {readFile} from "node:fs/promises";
import {resolve} from "node:path";


import { type idParams } from "../types/index.ts";

interface Contact {
    id: number
    name: string
    email: string
    phone: string
}

const contactsPath = resolve("src", "data", "contacts.json");

const getContactsFromStorage = async(): Promise<Contact[]>=> {
    return JSON.parse(await readFile(contactsPath, "utf-8"));
}

export const getContactsPage = async (req: Request, res: Response)=> {
    const contacts = await getContactsFromStorage();
    res.render("contacts", {
        title: "My contacts",
        contacts
    });
};

export const getContactByIdPage = async (req: Request, res: Response)=> {
      const id = Number(req.params.id);
    const contacts = await getContactsFromStorage();
    const contact = contacts.find(contact => contact.id === id);
    res.render("contacts-by-id", {
        title: `Contact ${contact.name}`,
        contact
    });
};