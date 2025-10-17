const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importa o Controller

// Rota para Cadastro de Usuário
router.post('/register', userController.registerUser);

// Rota para Login
router.post('/login', userController.loginUser);

module.exports = router;