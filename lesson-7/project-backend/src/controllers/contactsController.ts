
import { type Request, type Response } from "express";

import { type idParams } from "../types/index.ts";

import { prisma } from "../prisma.ts";

import { type CreateContactBody } from './../validators/contactsValidator.ts';

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await prisma.contact.findMany({
    include: {
      category: true, 
    }
  });
  res.json(contacts);
};

export const getContactById = async (req: Request<idParams>, res: Response) => {
  const id = Number(req.params.id);
  const contact = await prisma.contact.findUnique({
    where: {
      id,
    },
  });
  res.json(contact);
};

export const addContact = async (req: Request<{}, unknown, CreateContactBody>, res: Response) => {
  const newContact = await prisma.contact.create({
    data: req.body,
  });
  res.status(201).json(newContact);
};

export const updateContactById = async(req: Request, res: Response)=> {
    const id = Number(req.params.id);
    const updateContact = await prisma.contact.update({
        where: {
            id,
        },
        data: req.body
    });
    res.json(updateContact);
}

export const deleteContactById = async(req: Request, res: Response)=> {
    const id = Number(req.params.id);
    await prisma.contact.delete({
        where: {
            id
        }
    });
    res.status(204).send();
}

/*
1. Створити таблицу categories і заповнити даними з таблиці contacts:
SELECT DISTINCT category FROM contacts;

2. Додати до таблиці contacts поле category_id і заповнити його правильним id
з таблиці categories, спираючись на значенння колонки contacts.category.

3. Видаляюємо з таблиці contacts поле category.

4. Створюємо зв'язок (relation) між полем contacts.category_id і полем categories.id
*/