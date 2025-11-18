// frontend/src/js/login.js

// Endereço base da API Node.js. 
// const API_BASE_URL = 'http://localhost:3000/api/auth'; 
const API_BASE_URL = 'http://localhost:3000/api/auth';

document.addEventListener('DOMContentLoaded', () => {
    // 1. BUSCA DE ELEMENTOS HTML
    // Se o erro do 'registerToggle' persistir, o problema é que algum desses IDs não existe no HTML.
    const form = document.getElementById('loginForm');
    const formTitle = document.getElementById('formTitle');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username'); 
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword'); 
    const errorMessage = document.getElementById('errorMessage');
    const submitButton = document.getElementById('submitButton');
    const registerToggle = document.getElementById('registerToggle'); // O elemento que estava causando erro!
    const usernameGroup = document.getElementById('usernameGroup');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');

    let isRegisterMode = false;

    // --- VERIFICAÇÃO INICIAL (Se já estiver logado, redireciona) ---
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
        return;
    }

    // --- LÓGICA DE ALTERNÂNCIA DE MODO (LOGIN/REGISTRO) ---
    if (registerToggle) { // Proteção extra contra o erro 'null'
        registerToggle.addEventListener('click', (e) => {
            e.preventDefault();
            isRegisterMode = !isRegisterMode;

            form.reset();
            errorMessage.textContent = '';
            
            // Lógica de alternância de exibição...
            if (isRegisterMode) {
                formTitle.textContent = 'Criar uma Nova Conta';
                submitButton.textContent = 'Registrar';
                registerToggle.textContent = 'Voltar para o Login';
                usernameGroup.style.display = 'block';
                confirmPasswordGroup.style.display = 'block';
            } else {
                formTitle.textContent = 'Entrar no MediaBook';
                submitButton.textContent = 'Acessar';
                registerToggle.textContent = 'Crie uma agora!';
                usernameGroup.style.display = 'none';
                confirmPasswordGroup.style.display = 'none';
            }
        });
    }


    // --- FUNÇÃO PARA LOGIN COM A API (Busca no DB) ---
    const handleLogin = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) { // Status 200 OK do backend
                const loggedInUser = data.user.username || email; 
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('currentUser', loggedInUser);
                window.location.href = '../public/index.html'; // CORRIGIDO PARA A PASTA CORRETA
            } else {
                errorMessage.textContent = data.message || 'Erro ao fazer login. Credenciais inválidas.';
                passwordInput.value = '';
            }
        } catch (error) {
            console.error('Erro de rede/API:', error);
            errorMessage.textContent = 'Erro de conexão com o servidor. Verifique se o backend está ativo.';
        }
    };
    
    // --- FUNÇÃO PARA REGISTRO COM A API ---
    const handleRegister = async (username, email, password, confirmPassword) => {
        if (password !== confirmPassword) {
            errorMessage.textContent = 'As senhas não coincidem.';
            confirmPasswordInput.value = '';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                errorMessage.textContent = `Registro de ${username} realizado! Redirecionando...`;
                
                // Login automático após registro
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('currentUser', username); 
                
                setTimeout(() => {
                    window.location.href = '../public/index.html'; // CORRIGIDO PARA A PASTA CORRETA
                }, 1000);

            } else {
                errorMessage.textContent = data.message || 'Erro ao registrar. Email já pode estar em uso.';
            }
        } catch (error) {
            console.error('Erro de rede/API:', error);
            errorMessage.textContent = 'Erro de conexão com o servidor. Verifique se o backend está ativo.';
        }
    };

    // --- EVENT LISTENER DE SUBMISSÃO ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        errorMessage.textContent = ''; 

        if (isRegisterMode) {
            handleRegister(username, email, password, confirmPassword);
        } else {
            handleLogin(email, password);
        }
    });
});