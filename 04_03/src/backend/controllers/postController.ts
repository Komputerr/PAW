import {PrismaClient} from "@prisma/client";
import type {Request, Response, NextFunction} from "express";

const prisma = new PrismaClient();

export const getPost = async (res : Response, next: NextFunction) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}
export const getOnePost = async (req : Request, res : Response, next: NextFunction) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!post) return res.status(404).json("Post not found");
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

