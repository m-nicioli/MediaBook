const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds = 10; 


// Lógica para Criar Conta (Registro)
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Verificar se o usuário já existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Este email já está em uso.' });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds); 

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

// Lógica para Login
exports.loginUser = async (req, res) => {
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

        // 3. Se as senhas baterem: AQUI VOCÊ GERARIA O JWT TOKEN
        // Por enquanto, apenas retornamos o sucesso
        
        res.status(200).json({ 
            message: 'Login bem-sucedido!', 
            userId: user.id 
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};