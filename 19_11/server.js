const express = require('express');
const { PrismaClient } = require('@prisma/client')
const app = express();
const prisma = new PrismaClient();
const {mongoUrl, mongoClient, _createCollection}  = require('mongodb.js');

require('dotenv').config()
app.use(express.json())
app.use((req,res,next)=>{

    next();
})

app.get("/wpis", async (req, res) => {
    try {
        const posts = await prisma.wpis.findMany();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
})
app.get("/wpis/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await prisma.wpis.findUnique({
            where: {id: Number(id)}
        });

        if (post==null) {
            res.status(404).json('Post not found');
        }
        else {
            res.status(200).json(post);
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

app.post('/wpis', async (req, res) => {
    try {
        const content = req.body;
        const post = await prisma.wpis.create({
            data: content
        })
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.put('/wpis/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const content = req.body;

        const post = await prisma.wpis.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.patch('/wpis/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const content = req.body;

        const post = await prisma.wpis.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(post);
    } catch (error) {

        res.status(500).json(error);
    }
})

app.delete('/wpis/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await prisma.komentarz.deleteMany({
            where: {postId: Number(id)}
        });

        const post = await prisma.wpis.delete({
            where: {id: Number(id)},
        })
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})
app.get('/kategoria', async (req, res) => {
    try {
        const kategoria = await prisma.kategoria.findMany();
        res.status(200).json(kategoria);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.get('/kategoria/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const kategoria = await prisma.kategoria.findUnique({
            where: {id: Number(id)},
        })

        if (kategoria==null) {
            res.status(404).json('Category not found');
        }
        else {
            res.status(200).json(kategoria);
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

app.post(`/kategoria`, async (req, res) => {
    try {
        const content = req.body;
        const kategoria = await prisma.kategoria.create({
            data: content
        })
        res.status(201).json(kategoria);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.put('/kategoria/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const content = req.body;
        const kategoria = await prisma.kategoria.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(kategoria);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.patch('/kategoria/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const content = req.body;
        const kategoria = await prisma.kategoria.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(kategoria);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.delete('/kategoria/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await prisma.komentarz.deleteMany({
            where: {
                wpis: {categoryId: Number(id)}
            }
        });

        await prisma.wpis.deleteMany({
            where: {categoryId: Number(id)}
        });

        const kategoria = await prisma.kategoria.delete({
            where: {id: Number(id)},
        })
        res.status(200).json(kategoria);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.get('/komentarz', async (req, res) => {
    try {
        const komentarze = await prisma.komentarz.findMany();
        res.status(200).json(komentarze);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.get('/komentarz/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const komentarz = await prisma.komentarz.findUnique({
            where: {id: Number(id)},
        })
        if (komentarz==null) {
            res.status(404).json('Comment not found');
        }
        else {
            res.status(200).json(komentarz);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

app.post('/komentarz', async (req, res) => {
    try {
        const content = req.body;
        const komentarz = await prisma.komentarz.create({
            data: content
        })
        res.status(201).json(komentarz);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.put('/komentarz/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const content = req.body;
        const komentarz = await prisma.komentarz.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(komentarz);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.patch('/komentarz/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const content = req.body;
        const komentarz = await prisma.komentarz.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(komentarz);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.delete('/komentarz/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const komentarz = await prisma.komentarz.delete({
            where: {id: Number(id)},
        })
        res.status(200).json(komentarz);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.listen(3000, () =>
{
    console.log('Server started on http://127.0.0.1.3306');
})
