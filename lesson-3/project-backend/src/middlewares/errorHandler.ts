import { type Request, type Response, type NextFunction } from "express";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction)=> {
    res.status(500).json({
        message: error.message,
    })
};

export default errorHandler;