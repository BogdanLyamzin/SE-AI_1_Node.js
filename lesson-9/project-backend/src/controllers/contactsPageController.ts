import { type Request, type Response } from "express";

import { prisma } from "../prisma.ts";

import { type idParams } from "../types/index.ts";

export const getContactsPage = async (req: Request, res: Response) => {
  const contacts = await prisma.contact.findMany({});
  res.render("contacts", {
    title: "My contacts",
    contacts,
  });
};

export const getContactByIdPage = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const contact = await prisma.contact.findUnique({
    where: {
      id,
    },
  });
  res.render("contacts-by-id", {
    title: `Contact ${contact?.name}`,
    contact,
  });
};
