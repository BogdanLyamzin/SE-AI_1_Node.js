import {Router} from "express";

import { getCategories, addCategory } from "../controllers/categoriesController.ts";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);

categoryRouter.post("/", addCategory);

export default categoryRouter;