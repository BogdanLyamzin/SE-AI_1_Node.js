
import {Router} from "express";

import isValidId from "../middlewares/isValidId.ts";

import { getContacts, getContactById, addContact } from "../controllers/contactsController.ts";

const contactRouter = Router();

contactRouter.get("/", getContacts);

contactRouter.get("/:id", isValidId, getContactById);

contactRouter.post("/", addContact);

export default contactRouter;