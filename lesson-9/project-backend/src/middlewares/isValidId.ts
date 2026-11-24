import { type Request, type Response, type NextFunction } from "express";

import {type  IdLocals, IdSchema } from "../validators/index.ts";

const isValidId = (req: Request, res: Response<unknown, IdLocals>, next: NextFunction)=> {
    const result = IdSchema.safeParse(req.params);
        if(!result.success) {
            return res.status(400).json({
                error: "Invalid id",
                details: result.error.issues
            });
        }
        res.locals.id = result.data.id;
    next();
}

export default isValidId;