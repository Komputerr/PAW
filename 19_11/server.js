const express = require('express');
const path = require("node:path");
const fs = require('fs');
const { PrismaClient } = require('@prisma/client')
const app = express();
const prisma = new PrismaClient();
require('dotenv').config()
app.use(express.json())

app.get("/wpis", async (req, res) => {
    const posts = await prisma.wpis.findMany();
    res.json(posts)
})
app.get("/wpis/:id", async (req, res) => {
    const id = req.params.id;
    const post = await prisma.wpis.findUnique({
        where: {id: Number(id)}
    });
    res.status(200).json(post)
})

app.post(`/Kategoria`, async (req, res) => {
    const category = req.body.category
    const result = await prisma.kategoria.create({
        data: {
            category: category
        }
    })
    res.status(201).json(result)
})

app.listen(3000, () =>
{
    console.log('Server started on http://127.0.0.1.3306');
})
