
import {Router} from "express";

import isValidId from "../middlewares/isValidId.ts";

import { getContacts, getContactById } from "../controllers/contactsController.ts";

const contactRouter = Router();

contactRouter.get("/", getContacts);

contactRouter.get("/:id", isValidId, getContactById);

export default contactRouter;