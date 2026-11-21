import {Router} from "express";

import validateBody from "../middlewares/validateBody.ts";

import { registerSchema, loginSchema } from "../validators/authValidator.ts";

import {register, login} from "../controllers/authController.ts";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register)

authRouter.post("/login", validateBody(loginSchema), login);

export default authRouter;