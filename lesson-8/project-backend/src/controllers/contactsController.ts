
import { type Request, type Response } from "express";

import { type IdLocals } from "../validators/index.ts";

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

export const getContactById = async (req: Request, res: Response<unknown, IdLocals>) => {
  const {id} = res.locals;
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

export const updateContactById = async(req: Request, res: Response<unknown, IdLocals>)=> {
    const id = Number(req.params.id);
    const updateContact = await prisma.contact.update({
        where: {
            id,
        },
        data: req.body
    });
    res.json(updateContact);
}

export const deleteContactById = async(req: Request, res: Response<unknown, IdLocals>)=> {
    const id = Number(req.params.id);
    await prisma.contact.delete({
        where: {
            id
        }
    });
    res.status(204).send();
}
