const express = require('express');
const path = require("node:path");
const fs = require('fs');
const mime = require('mime-types')
const {readFile} = require('fs/promises');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BazaPalacz'
});
connection.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'static', 'index.html'));
});

app.get('/o_nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'o_nas.html'));
});

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'oferta.html'));
});

app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'kontakt.html'));
});

app.post('/submited', (req, res) => {
    const { imie, nazwisko, email, message } = req.body
    console.log(`Imię: ${imie}`)
    console.log(`Nazwisko: ${nazwisko}`)
    console.log(`Email: ${email}`)
    console.log(`Treść: ${message}`)

    let values = [imie, nazwisko, email,message];
    connection.query('INSERT INTO `messages`(`firstname`, `lastname`, `email`, `message`) VALUES (?,?,?,?)', values, (err) => {
        if (err) throw err

        console.log('Dane dodane do tabeli');
    })
    res.redirect(`/`)
});
app.get('/api/contact-messages', (req, res) => {
    connection.query('SELECT * FROM messages', (err,result) => {
        if (err) throw err
        res.json(result);
    });
});
app.get('/api/contact-messages/:id', (req, res) => {
    const id = req.params.id;

    connection.query('SELECT * FROM messages WHERE id = ?',[id], (err,result) => {
        if (err) throw err
        if(result.length > 0){
            res.json(result);
        }
        else{
            res.json("Error: 404");
        }


    });
});

app.get('*', (req, res) => {
    res.status(404).send('404 - Strona nie istnieje');
});

app.listen(3000, () => {
    console.log('Server started on http://127.0.0.1:3000');
});
