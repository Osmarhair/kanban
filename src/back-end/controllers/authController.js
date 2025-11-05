const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bd = require("../database/bd"); 

// Lógica de Cadastro
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        
        bd.run (
            "INSERT INTO users (email, password) VALUES (?, ?)", 
            [ email, hash ],
            function(err) { 
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: "E-mail já registrado" });
                    }
                    return res.status(500).json({ error: "Erro interno do servidor." });
                }
                res.status(201).json({ message: "Usuário registrado com sucesso!", id: this.lastID });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Erro ao criptografar senha" });
    }
};

// Lógica de Login
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    bd.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => { 
        if (err) return res.status(500).json({ error: "Erro na consulta ao banco" });
        
        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado" });

        const valido = await bcrypt.compare(password, user.password);
        if (!valido)
            return res.status(401).json({ error: "Senha incorreta"});
            
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "SEGREDO", { expiresIn: "1h"});
        
        res.json({ message: "Login aprovado", token });
    });
};