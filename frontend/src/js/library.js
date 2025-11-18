// library.js

document.addEventListener('DOMContentLoaded', () => {
    const API_URL = "http://localhost:3000";
    const mediaGrid = document.getElementById('mediaGrid');
    const subtitle = document.getElementById('library-subtitle');
    const emptyMessage = document.getElementById('empty-message');
    const defaultPoster = 'https://via.placeholder.com/200x300?text=Poster+Nao+Encontrado';

    async function loadLibrary() {
        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('Você precisa estar logado para ver sua biblioteca.');
            window.location.href = 'login.html';
            return;
        }

        try {
            subtitle.textContent = "Buscando seus títulos...";
            
            const response = await fetch(`${API_URL}/api/library`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const libraryItems = await response.json();
                
                if (libraryItems.length === 0) {
                    subtitle.textContent = "Sua biblioteca está pronta!";
                    emptyMessage.style.display = 'block';
                } else {
                    subtitle.textContent = `Você possui ${libraryItems.length} títulos.`;
                    displayLibrary(libraryItems);
                }

            } else if (response.status === 401 || response.status === 403) {
                alert('Sessão expirada. Faça login novamente.');
                localStorage.removeItem('authToken');
                window.location.href = 'login.html';
            } else {
                subtitle.textContent = 'Erro ao carregar sua biblioteca.';
            }

        } catch (error) {
            console.error('Erro de conexão ao carregar biblioteca:', error);
            subtitle.textContent = 'Erro de rede. Tente novamente.';
        }
    }

    function displayLibrary(items) {
        mediaGrid.innerHTML = ''; 
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'media-card';
            
            const ratingHtml = item.user_rating 
                ? `<i class="fas fa-star" style="color:#ffc107;"></i> ${item.user_rating}/10` 
                : '';
            
            card.innerHTML = `
                <img src="${item.poster_url || defaultPoster}" alt="${item.title}">
                <div class="media-info">
                    <h3>${item.title} (${item.release_year || 'N/A'})</h3>
                    <p><strong>Tipo:</strong> ${item.media_type}</p>
                    <p><strong>Status:</strong> ${item.status}</p>
                    <p class="media-rating">${ratingHtml}</p>
                </div>
            `;
            mediaGrid.appendChild(card);
        });
    }

    loadLibrary();
});