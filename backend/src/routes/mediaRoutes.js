const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController'); 

// Rota para adicionar mídia à biblioteca do usuário (POST /api/media)
// Usa simulateAuth como middleware de teste
router.post('/', mediaController.simulateAuth, mediaController.addMedia);

// Rota para buscar a biblioteca do usuário (GET /api/media)
// Usa simulateAuth como middleware de teste
router.get('/', mediaController.simulateAuth, mediaController.getLibrary);

// ⚠️ FUTURO: Rota para atualizar status ou rating (PUT /api/media/:id)
// router.put('/:id', mediaController.simulateAuth, mediaController.updateMedia);

module.exports = router;