const pool = require('../config/config');

class User {
    // 1. Função para criar um novo usuário no DB
    static async create({ username, email, password_hash }) {
        const query = 'INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [username, email, password_hash]);
        return result.insertId;
    }

    // 2. Função para buscar um usuário pelo email (essencial para o login)
    static async findByEmail(email) {
        const query = 'SELECT * FROM Users WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);
        return rows[0]; 
    }

    // pode adicionar outras funções aqui (ex: findById, update)
}

module.exports = User;