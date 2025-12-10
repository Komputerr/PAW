const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
    try {
        const komentarze = await prisma.komentarz.findMany();
        res.status(200).json(komentarze);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const komentarz = await prisma.komentarz.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!komentarz) return res.status(404).json("Comment not found");
        res.status(200).json(komentarz);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const komentarz = await prisma.komentarz.create({
            data: req.body
        });
        res.status(201).json(komentarz);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const komentarz = await prisma.komentarz.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.status(200).json(komentarz);
    } catch (err) {
        next(err);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const komentarz = await prisma.komentarz.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.status(200).json(komentarz);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const komentarz = await prisma.komentarz.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(200).json(komentarz);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
