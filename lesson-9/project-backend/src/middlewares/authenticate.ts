import { type Request, type Response, type NextFunction } from "express";

import { verifyToken } from "../utils/jwt.ts";
import {prisma} from "../prisma.ts";

const authenticate = async(req: Request, res: Response, next: NextFunction)=> {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(401).json({
            message: "Missing authorization header"
        });
    }

    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Expected authorization header: Bearer <token>"
        });
    }

    const {data, error} = verifyToken(token);
    if(error) {
          return res.status(401).json({
            message: error.message
        });
    }
    const userId = Number(data.sub);
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        omit: {
            password: true
        }
    });
    if(!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }
    req.user = user;
    next();
}

export default authenticate;