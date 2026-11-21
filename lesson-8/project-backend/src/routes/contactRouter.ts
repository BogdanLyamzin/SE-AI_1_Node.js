import {Router} from "express";

import isValidId from "../middlewares/isValidId.ts";

import { getContacts, getContactById, addContact, updateContactById, deleteContactById } from "../controllers/contactsController.ts";

import validateBody from "../middlewares/validateBody.ts";

import { createContactSchema, updateContactSchema } from './../validators/contactsValidator.ts';

const contactRouter = Router();

contactRouter.get("/", getContacts);

contactRouter.get("/:id", isValidId, getContactById);

contactRouter.post("/", validateBody(createContactSchema), addContact);

contactRouter.patch("/:id", validateBody(updateContactSchema), updateContactById);

contactRouter.delete("/:id", deleteContactById);

export default contactRouter;