const express = require("express");
const uuid = require("uuid");

const path = require("path");
const fs = require("fs");

const db = require("./db/db.json");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());


app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

app.get("/api/notes", (req, res) => res.json(db));

app.post("/api/notes", (req, res) => {
    let note = req.body;
    note.id = uuid.v4();

    db.push(note);

    fs.writeFile("./db/db.json", JSON.stringify(db), "utf-8", (err) => err ? console.log(err) : console.log("Note written"));
    res.send("Note written");
});


app.listen(PORT, () => console.log(`Note Taker App listening on port ${PORT}!`));