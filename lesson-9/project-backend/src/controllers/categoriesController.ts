import { type Request, type Response } from "express";

import {prisma} from "../prisma.ts";

export const getCategories = async(req: Request, res: Response)=> {
    const categories = await prisma.category.findMany({
        include: {
            contacts: true
        }
    });
    res.json(categories);
}

export const addCategory = async(req: Request, res: Response)=> {
    const newCategory = await prisma.category.create({
        data: req.body
    });
    res.status(201).json(newCategory);
}