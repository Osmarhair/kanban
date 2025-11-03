const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/db");
const router = express.Router();

//CADASTO
router.post("/register", async (req, res) => {
    const { email, password } = rec.body;

    const hash = await bcrypt.hash(password, 10);

    db.run (
        [ email, hash ],
        err => {
            if (err) return res.status(400).json({ error: "E-mail já registrado" });
        }
    );
});

//LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => { 
        if (!user)
            return res.status(400).json({ error: "Usuaário não encontrado" });

    const valido = await bcrypt.compare(password, user.password);
        if (!valido)
            return res.status(401).json({ error: "Senha incorreta"});
        
    const token = jwt.sign({ id: user.id }, "SEGREDO", { expiresIn: "1h"});

    res.json({ message: "Login aprovado", token });
    });
});


module.exports = router;
