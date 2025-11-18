const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds = 10; 


// 1. Definição da função de Registro (agora como CONST)
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Verificar se o usuário já existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Este email já está em uso.' });
        }
        
        // 2. Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, saltRounds); 

        // 3. Salvar no banco de dados
        const userId = await User.create({ username, email, password_hash: hashedPassword });

        res.status(201).json({ 
            message: 'Usuário registrado com sucesso!', 
            userId: userId 
        });

    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
    }
};

// 2. Definição da função de Login (agora como CONST)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar o usuário e o hash da senha no DB
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 2. Comparar a senha fornecida com o hash (Segurança: Bcrypt)
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 3. Sucesso no Login! 
        res.status(200).json({ 
            message: 'Login realizado com sucesso!', 
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno ao tentar logar.' });
    }
};


// 3. Exportação ÚNICA e EXPLÍCITA de todas as funções
module.exports = {
    registerUser,
    loginUser
};