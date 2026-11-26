import { type Request, type Response } from "express";

import { type IdLocals } from "../validators/index.ts";
import { type GetContactsQuery } from "./../validators/contactsValidator.ts";

import { prisma } from "../prisma.ts";

import { type CreateContactBody } from "./../validators/contactsValidator.ts";

export const getContacts = async (req: Request, res: Response<unknown, {query: GetContactsQuery}>) => {
  const { id: user_id } = req.user!;
  const {page = 1, limit = 10, sort = "newest", search} = res.locals.query;
  const skip = (page - 1) * limit;
  const [contacts, totalItems] = await Promise.all([prisma.contact.findMany({
    where: {
      user_id,
      name: {
        contains: search,
        mode: "insensitive"
      }
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: sort === "oldest" ? "asc" : "desc"
    },
    include: {
      category: true,
    },
  }), prisma.contact.count({
    where: {
      user_id,
       name: {
        contains: search,
        mode: "insensitive"
      }
    }
  })]);
  const totalPages = Math.ceil(totalItems / limit);

  res.json({
    contacts,
    pagination: {
      totalItems,
      totalPages,
      page,
      limit
    }
  });
};

export const getContactById = async (
  req: Request,
  res: Response<unknown, IdLocals>,
) => {
  const { id } = res.locals;
  const { id: user_id } = req.user!;
  const contact = await prisma.contact.findUnique({
    where: {
      id,
      user_id,
    },
  });
  res.json(contact);
};

export const addContact = async (
  req: Request<{}, unknown, CreateContactBody>,
  res: Response,
) => {
  const { id: user_id } = req.user!;
  const newContact = await prisma.contact.create({
    data: {
      ...req.body,
      user_id,
    },
  });
  res.status(201).json(newContact);
};

export const updateContactById = async (
  req: Request,
  res: Response<unknown, IdLocals>,
) => {
  const { id } = res.locals;
  const { id: user_id } = req.user!;
  const updateContact = await prisma.contact.update({
    where: {
      id,
      user_id,
    },
    data: req.body,
  });
  res.json(updateContact);
};

export const deleteContactById = async (
  req: Request,
  res: Response<unknown, IdLocals>,
) => {
  const { id } = res.locals;
  const { id: user_id } = req.user!;
  await prisma.contact.delete({
    where: {
      id,
      user_id,
    },
  });
  res.status(204).send();
};
