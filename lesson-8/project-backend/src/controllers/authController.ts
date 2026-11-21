import { type Request, type Response } from "express";
import bcrypt from "bcrypt";

import {prisma} from "../prisma.ts";

import { type RegisterBody, type LoginBody } from "../validators/authValidator.ts";

// const salt = await bcrypt.genSalt(10);
// console.log(salt);
// const hashStr = await bcrypt.hash("123456", 10);
// console.log(hashStr);
// const compareResult1 = await bcrypt.compare("123456", hashStr);
// console.log(compareResult1);
// const compareResult2 = await bcrypt.compare("123457", hashStr);
// console.log(compareResult2);

export const register = async(req: Request<{}, {}, RegisterBody>, res: Response)=> {
    const {username, email, password} = req.body;
    const userWithUsername = await prisma.user.findUnique({
        where: {
            username
        }
    });
    if(userWithUsername) {
        res.status(409).json({
            message: `Username ${username} already taken`
        })
    }
    const userWithEmail = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if(userWithEmail) {
        res.status(409).json({
            message: `Email ${email} already taken`
        })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            ...req.body,
            password: hashPassword,
        },
        select: {
            id: true,
            username: true,
            name: true,
            email: true
        }
    });

    res.status(201).json({
        user: newUser
    });
}


export const login = async(req: Request<{}, {}, LoginBody>, res: Response) => {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if(!user) {
        return res.status(401).json({
            message: `Invalid email or password`
        })
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
        return res.status(401).json({
            message: `Invalid email or password`
        })
    }
    const token = "fdgs.e422.343242";
    res.json({
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,

        }
    })
}