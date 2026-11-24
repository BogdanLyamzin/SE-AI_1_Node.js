import {Router} from "express";

import validateBody from "../middlewares/validateBody.ts";

import { registerSchema, loginSchema, refreshSchema } from "../validators/authValidator.ts";

import {register, login, refresh} from "../controllers/authController.ts";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register)

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.post("/refresh", validateBody(refreshSchema), refresh);

export default authRouter;