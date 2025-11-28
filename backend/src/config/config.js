// Arquivo: backend/src/config.js

// O require('dotenv').config() foi removido daqui!
const mysql = require('mysql2');

// =======================================================
// ⭐ INSERIR SUAS CREDENCIAIS REAIS AQUI ⭐
// O erro era porque o Node.js estava lendo estas credenciais como vazias.
const DB_CREDENTIALS = {
    host: 'localhost',       // Geralmente 'localhost'
    user: 'root',       // Seu usuário do MySQL (ex: 'root')
    password: '',  // Sua senha do MySQL
    database: ''   // O nome do seu banco de dados
};
// =======================================================

const pool = mysql.createPool({
    host: DB_CREDENTIALS.host,
    user: DB_CREDENTIALS.user,
    password: DB_CREDENTIALS.password,
    database: DB_CREDENTIALS.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        // Agora ele exibirá o erro de "Access denied" apenas se as credenciais inseridas acima estiverem erradas.
        console.error('⚠️ ERRO AO CONECTAR AO BANCO DE DADOS:', err.message);
        return;
    }
    console.log('✅ Conexão com o MySQL estabelecida com sucesso!');
    connection.release();
});

module.exports = pool.promise();



