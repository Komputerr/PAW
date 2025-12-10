const express = require('express');
const { PrismaClient } = require('@prisma/client')
const app = express();
const prisma = new PrismaClient();
require('dotenv').config()
const { connectDB } = require("./mongo/mongoConnect.js");
const { accessLogger, errorLogger } = require("./mongo/mongoLogger.js");

const wpisRouter = require("./routes/wpis");
const kategoriaRouter = require("./routes/kategoria");
const komentarzRouter = require("./routes/komentarz");

connectDB();
app.use(accessLogger);
app.use(express.json());
app.use("/wpis", wpisRouter);
app.use("/kategoria", kategoriaRouter);
app.use("/komentarz", komentarzRouter);

app.get("*", (req, res, next) => {
    next(new Error("Not Found"));
});

app.use(errorLogger);
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(3000, () => {
    console.log("Server started on http://127.0.0.1:3300");
});
