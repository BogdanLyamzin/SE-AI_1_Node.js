import {z} from "zod";
import type { Request, Response, NextFunction } from "express";

const validateBody = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction)=> {
        const result = schema.safeParse(req.body);
        if(!result.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: result.error
            });
        }
        req.body = result.data;
        next();
    }
}

export default validateBody;