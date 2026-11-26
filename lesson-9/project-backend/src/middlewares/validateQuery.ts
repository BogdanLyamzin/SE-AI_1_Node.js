import {z} from "zod";
import type { Request, Response, NextFunction } from "express";

const validateQuery = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction)=> {
        const result = schema.safeParse(req.query);
        if(!result.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: result.error.issues
            });
        }
        res.locals.query = result.data;
        next();
    }
}

export default validateQuery;