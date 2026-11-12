import {Router} from "express";

import { getContactsPage,  getContactByIdPage} from "../controllers/contactsPageController.ts";

const contactPageRouter = Router();

contactPageRouter.get("/", getContactsPage);

contactPageRouter.get("/:id", getContactByIdPage);

export default contactPageRouter;