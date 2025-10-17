require('dotenv').config(); 

const express = require('express');
const app = express();
const port = process.env.API_PORT || 3000;

const authRoutes = require('./routes/authRoutes');

app.use(express.json()); 

// Middleware CORS (Importante para conectar o Front-end)
// **NOTA:** Para produção, este deve ser configurado com cuidado!
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API do MediaBook está rodando!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});