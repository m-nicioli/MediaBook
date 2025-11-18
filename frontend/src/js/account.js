// account.js

document.addEventListener('DOMContentLoaded', () => {
    // ⚠️ Confirme a porta da sua API. Se for 3000, está OK.
    const API_URL = "http://localhost:3000"; 
    
    // Seleciona os elementos para preencher
    const usernameDisplay = document.getElementById('currentUsername');
    const userEmailDisplay = document.getElementById('userEmail');
    const memberSinceDisplay = document.getElementById('memberSince');
    const userIdDisplay = document.getElementById('userId');
    const logoutButton = document.getElementById('logoutButton');

    // Função de logout padrão
    function handleLogout() {
        localStorage.removeItem('authToken'); // O Token é a chave
        localStorage.removeItem('username'); // Opcional
        window.location.href = 'login.html';
    }

    async function loadProfile() {
        const token = localStorage.getItem('authToken');

        // Se não houver token, redireciona
        if (!token) {
            alert('Sessão não encontrada. Faça login.');
            window.location.href = 'login.html';
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/auth/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Envia o Token JWT
                }
            });

            if (response.ok) {
                const user = await response.json();
                
                // Preenche os dados reais na página
                usernameDisplay.textContent = user.username || 'Usuário';
                userEmailDisplay.textContent = user.email;
                userIdDisplay.textContent = user.id;
                
                // Formata a data de criação
                const creationDate = new Date(user.created_at);
                memberSinceDisplay.textContent = creationDate.toLocaleDateString('pt-BR');

            } else if (response.status === 401 || response.status === 403) {
                // Token inválido/expirado
                alert('Sessão expirada. Faça login novamente.');
                handleLogout();
            } else {
                usernameDisplay.textContent = 'Erro ao carregar';
                console.error('Falha ao buscar perfil:', await response.text());
            }

        } catch (error) {
            console.error('Erro de conexão ao carregar perfil:', error);
            usernameDisplay.textContent = 'Erro de rede.';
        }
    }

    // Inicialização
    loadProfile();

    // Listener do botão Sair
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});