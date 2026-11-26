import {Router} from "express";

import authenticate from "../middlewares/authenticate.ts";
import isValidId from "../middlewares/isValidId.ts";

import { getContacts, getContactById, addContact, updateContactById, deleteContactById } from "../controllers/contactsController.ts";

import validateBody from "../middlewares/validateBody.ts";
import validateQuery from "../middlewares/validateQuery.ts";

import { getContactsQuerySchema, createContactSchema, updateContactSchema  } from './../validators/contactsValidator.ts';

const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get("/", validateQuery(getContactsQuerySchema), getContacts);

contactRouter.get("/:id", isValidId, getContactById);

contactRouter.post("/", validateBody(createContactSchema), addContact);

contactRouter.patch("/:id", validateBody(updateContactSchema), updateContactById);

contactRouter.delete("/:id", deleteContactById);

export default contactRouter;