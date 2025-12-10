const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
    try {
        const kategoria = await prisma.kategoria.findMany();
        res.status(200).json(kategoria);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const kategoria = await prisma.kategoria.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!kategoria) return res.status(404).json("Category not found");
        res.status(200).json(kategoria);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const kategoria = await prisma.kategoria.create({
            data: req.body
        });
        res.status(201).json(kategoria);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const kategoria = await prisma.kategoria.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.status(200).json(kategoria);
    } catch (err) {
        next(err);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const kategoria = await prisma.kategoria.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.status(200).json(kategoria);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await prisma.komentarz.deleteMany({
            where: { wpis: { categoryId: id } }
        });
        await prisma.wpis.deleteMany({
            where: { categoryId: id }
        });
        const kategoria = await prisma.kategoria.delete({
            where: { id }
        });
        res.status(200).json(kategoria);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
