import { type Request, type Response, type NextFunction } from "express";

import { type idParams } from "../types/index.ts";

const isValidId = (req: Request<idParams>, res: Response, next: NextFunction)=> {
    const id = Number(req.params.id);
    if(Number.isNaN(id)){
        return res.status(404).json({
            message: `${req.params.id} not valid id`
        });
    }
    next();
}

export default isValidId;