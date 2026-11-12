import { type Request, type Response } from "express";
import {readFile} from "node:fs/promises";

import { type idParams } from "../types/index.ts";

import {prisma} from "../prisma.ts";

interface Contact {
    id: number
    name: string
    email: string
    phone: string
}

const contactsPath = new URL("../data/contacts.json", import.meta.url);

const getContactsFromStorage = async(): Promise<Contact[]>=> {
    return JSON.parse(await readFile(contactsPath, "utf-8"));
}

export const getContacts = async (req: Request, res: Response)=> {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
};

export const getContactById = async (req: Request<idParams>, res: Response)=> {
    const id = Number(req.params.id);
    const contact = await prisma.contact.findUnique({
        where: {
            id
        }
    });
    res.json(contact);
}

export const addContact = async(req: Request, res: Response)=> {
    const newContact = await prisma.contact.create({
        data: req.body
    });
    res.status(201).json(newContact);
}
