// hashTestPassword.js

const bcrypt = require('bcrypt');

// --- 1. Senha de Teste que você quer criptografar ---
const TEST_PASSWORD = '12345678'; 

// --- 2. Fator de Custo (Salt Rounds) ---
// Quanto maior o número, mais seguro, mas mais lento. 10 é um bom padrão.
const SALT_ROUNDS = 10; 

/**
 * Gera o hash de uma senha e exibe no console.
 */
async function generateHash() {
    try {
        console.log(`Gerando hash para a senha: "${TEST_PASSWORD}"`);
        
        // Gera o hash de forma assíncrona
        const hashedPassword = await bcrypt.hash(TEST_PASSWORD, SALT_ROUNDS);
        
        console.log('--- Copie este Hash e cole no seu banco de dados ---');
        console.log(`Hash gerado: ${hashedPassword}`);
        console.log('----------------------------------------------------');

        // Exemplo de como verificar (apenas para teste)
        const isMatch = await bcrypt.compare(TEST_PASSWORD, hashedPassword);
        console.log(`Verificação bem-sucedida (deve ser true): ${isMatch}`);

    } catch (error) {
        console.error('Erro ao gerar o hash:', error);
    }
}

generateHash();