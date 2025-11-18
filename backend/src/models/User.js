const pool = require('../config/config'); // Importa a conexão

class User {
    // ... (função create para o registro)

    /**
     * Busca um usuário no banco de dados usando o email.
     * @param {string} email - O email para buscar.
     * @returns {object | undefined} O objeto do usuário ou undefined.
     */
    static async findByEmail(email) {
        // Query para selecionar todas as colunas onde o email corresponde
        const query = 'SELECT * FROM Users WHERE email = ?';
        
        // pool.execute executa a query e retorna uma Promise
        const [rows] = await pool.execute(query, [email]);
        
        // Retorna o primeiro (e único) resultado encontrado
        return rows[0]; 
    }

    // ... (outras funções do modelo)
}

module.exports = User;