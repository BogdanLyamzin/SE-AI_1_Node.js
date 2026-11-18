import { type Request, type Response } from "express";

const notFoundHanler = (req: Request, res: Response)=> {
    const {method, url} = req;
    res.status(404).json({
        message: `${method} ${url} not found`
    })
};

export default notFoundHanler;