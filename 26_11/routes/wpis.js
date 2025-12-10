const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
    try {
        const posts = await prisma.wpis.findMany();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const post = await prisma.wpis.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!post) return res.status(404).json("Post not found");
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const post = await prisma.wpis.create({
            data: req.body
        });
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const post = await prisma.wpis.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const post = await prisma.wpis.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await prisma.komentarz.deleteMany({
            where: { postId: id }
        });

        const post = await prisma.wpis.delete({
            where: { id }
        });
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
