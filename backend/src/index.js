require('dotenv').config(); 

const express = require('express');
const app = express();
const port = process.env.API_PORT || 3000;

const authRoutes = require('./routes/authRoutes');
// 💡 NOVO: Importa as Rotas de Mídia
const mediaRoutes = require('./routes/mediaRoutes');

app.use(express.json()); 

// Middleware CORS (Atualizado para incluir PUT para futuras edições)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Rotas de Autenticação
app.use('/api/auth', authRoutes);

// 💡 NOVO: Rotas de Mídia
app.use('/api/media', mediaRoutes);

app.get('/', (req, res) => {
    res.send('API do MediaBook está rodando!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});