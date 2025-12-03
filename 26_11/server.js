const express = require('express');
const { PrismaClient, Prisma } = require('@prisma/client')
const app = express();
const prisma = new PrismaClient();
require('dotenv').config()
const {MongoClient} = require('mongodb');
const mongoUrl = process.env.MONGO_URL;
const client = new MongoClient(mongoUrl);
console.log(mongoUrl);
const {connectDB} = require("./mongo/mongoConnect.js");
const {accessLogger,errorLogger} = require("./mongo/mongoLogger.js");

connectDB();

app.use(accessLogger);
app.use((err, req, res, next) => {
    next(err);
})
app.use(express.json())


app.get("/wpis", async (req, res,next) => {
    try {
        const posts = await prisma.wpis.findMany();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
})
app.get("/wpis/:id", async (req, res,next) => {
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

    } catch (err) {
        next(err);
    }
})

app.post('/wpis', async (req, res,next) => {
    try {
        const content = req.body;
        const post = await prisma.wpis.create({
            data: content
        })
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
})

app.put('/wpis/:id', async (req, res,next) => {
    try {
        const id = req.params.id;
        const content = req.body;

        const post = await prisma.wpis.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
})

app.patch('/wpis/:id', async (req, res,next) => {
    try {
        const id = req.params.id;
        const content = req.body;

        const post = await prisma.wpis.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(post);
    } catch (err) {

        next(err);
    }
})

app.delete('/wpis/:id', async (req, res,next) => {
    try {
        const id = req.params.id;
        await prisma.komentarz.deleteMany({
            where: {postId: Number(id)}
        });

        const post = await prisma.wpis.delete({
            where: {id: Number(id)},
        })
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
})
app.get('/kategoria', async (req, res,next) => {
    try {
        const kategoria = await prisma.kategoria.findMany();
        res.status(200).json(kategoria);
    } catch (err) {
        next(err);
    }
})

app.get('/kategoria/:id', async (req, res,next) => {
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

    } catch (err) {
        next(err);
    }
})

app.post(`/kategoria`, async (req, res,next) => {
    try {
        const content = req.body;
        const kategoria = await prisma.kategoria.create({
            data: content
        })
        res.status(201).json(kategoria);
    } catch (err) {
        next(err);
    }
})

app.put('/kategoria/:id', async (req, res,next) => {
    try {
        const id = req.params.id;
        const content = req.body;
        const kategoria = await prisma.kategoria.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(kategoria);
    } catch (err) {
        next(err);
    }
})

app.patch('/kategoria/:id', async (req, res,next) => {
    try {
        const id = req.params.id;
        const content = req.body;
        const kategoria = await prisma.kategoria.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(kategoria);
    } catch (err) {
        next(err);
    }
})

app.delete('/kategoria/:id', async (req, res,next) => {
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
    } catch (err) {
        next(err);
    }
})

app.get('/komentarz', async (req, res,next) => {
    try {
        const komentarze = await prisma.komentarz.findMany();
        res.status(200).json(komentarze);
    } catch (err) {
        next(err);
    }
})

app.get('/komentarz/:id', async (req, res,next) => {
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
    } catch (err) {
        next(err);
    }
})

app.post('/komentarz', async (req, res,next) => {
    try {
        const content = req.body;
        const komentarz = await prisma.komentarz.create({
            data: content
        })
        res.status(201).json(komentarz);
    } catch (err) {
        next(err);
    }
})

app.put('/komentarz/:id', async (req, res,next) => {
    try {
        const id = req.params.id;
        const content = req.body;
        const komentarz = await prisma.komentarz.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(komentarz);
    } catch (err) {
        next(err);
    }
})

app.patch('/komentarz/:id', async (req, res,next) => {
    try {
        const id = req.params.id;
        const content = req.body;
        const komentarz = await prisma.komentarz.update({
            where: {id: Number(id)},
            data: content
        })
        res.status(200).json(komentarz);
    } catch (err) {
        next(err);
    }
})

app.delete('/komentarz/:id', async (req, res,next) => {
    try {
        const id = req.params.id;
        const komentarz = await prisma.komentarz.delete({
            where: {id: Number(id)},
        })
        res.status(200).json(komentarz);
    } catch (err) {
        next(err);
    }
})
app.get("*", async (req, res,next) => {
    next(new Error('Not Found'));
})
app.use((err, req,res,next)=>{
    next(err);
})
app.use(errorLogger);
app.use((err,res,next)=>{
    res.status(err.status || 500);
    res.json({error:err});
})

app.listen(3000, () =>
{
    console.log('Server started on http://127.0.0.1.3306');
})
