// CÓDIGO CORRETO
const Media = require('../src/models/Media.js'); // a linha vermelha é normal são se assuste. 

// ⚠️ Middleware de Autenticação SIMULADO
// Este middleware é essencial até que você implemente o JWT.
// Ele injeta um userId fixo (1) na requisição para simular um usuário logado.
function simulateAuth(req, res, next) {
    // ⚠️ Mude este ID se o seu usuário de teste não for o ID 1
    req.userId = 1; 
    next();
}

// Controller para adicionar mídia (POST /api/media)
exports.addMedia = async (req, res) => {
    try {
        const userId = req.userId;
        const mediaDetails = req.body; 

        if (!mediaDetails.imdbID || !mediaDetails.Title) {
            return res.status(400).json({ message: 'Dados de mídia incompletos.' });
        }

        // 1. Garante que o filme está na tabela base Media e pega seu ID.
        const mediaId = await Media.findOrCreateMedia(mediaDetails);

        // 2. Adiciona o rastreamento do usuário na tabela UserMedia.
        await Media.addMediaToLibrary(userId, mediaId);

        res.status(201).json({
            message: 'Mídia adicionada à biblioteca com sucesso!',
            mediaId: mediaId 
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(200).json({
                message: 'Esta mídia já está na sua biblioteca.',
                duplicate: true
            });
        }
        console.error('Erro ao adicionar mídia:', error);
        res.status(500).json({ error: 'Erro interno ao salvar mídia.' });
    }
};

// Controller para buscar a biblioteca (GET /api/media)
exports.getLibrary = async (req, res) => {
    try {
        const userId = req.userId; // Vem do simulateAuth
        const library = await Media.getLibraryByUserId(userId);
        res.status(200).json(library);
    } catch (error) {
        console.error('Erro ao buscar biblioteca:', error);
        res.status(500).json({ error: 'Erro interno ao buscar a biblioteca.' });
    }
};

exports.simulateAuth = simulateAuth;