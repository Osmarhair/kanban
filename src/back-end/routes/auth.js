const express = require("express");
const router = express.Router();
// Importa as funções do Controller
const authController = require("../controllers/authController"); 

// CADASTO: Apenas chama a função para cadastro
router.post("/register", authController.registerUser);

// LOGIN: Apenas chama a função para o login
router.post("/login", authController.loginUser);

module.exports = router;