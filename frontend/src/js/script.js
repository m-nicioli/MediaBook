// Dados iniciais da aplicação
const OMDB_API_KEY = 'f67311e'; // ⚠️ OBRIGATÓRIO: Substitua pela sua chave OMDB
const API_URL = "http://localhost:3000";

// Elementos da UI
const mediaGrid = document.getElementById('mediaGrid');
const emptyState = document.getElementById('emptyState');

// ⚠️ Variável global para armazenar a biblioteca do usuário
let mediaData = []; 

// Mapeamento dos ENUMs do DB para as chaves do Front-end
const statusMap = {
    'Planejando': 'planning',
    'Em Andamento': 'watching',
    'Concluído': 'completed',
    'Abandonado': 'paused' 
};

// ----------------------------------------------------
// 1. Lógica de Carregamento da Biblioteca (Backend) 💡 NOVO
// ----------------------------------------------------

/**
 * Busca a biblioteca do usuário na API do backend (GET /api/media)
 * e armazena os resultados na variável global mediaData.
 */
async function carregarBibliotecaDoBackend() {
    // ⚠️ Se este script for usado na página principal (index.html),
    // esta função deve ser chamada.
    // Se for usado apenas na página de busca, esta função pode ser removida
    // ou adaptada para a sua lógica de navegação.

    mediaGrid.innerHTML = '';
    emptyState.style.display = 'none';

    try {
        const response = await fetch(`${API_URL}/api/media`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + sessionStorage.getItem('token') // ⚠️ Adicionar token JWT aqui
            }
        });

        if (!response.ok) throw new Error('Falha ao carregar a biblioteca do servidor.');

        const library = await response.json();
        
        if (library && library.length > 0) {
            // Mapeia e sanitiza os dados do backend para o formato do front-end
            mediaData = library.map(item => ({
                // ID para referenciar o item na tabela UserMedia (para edição/exclusão)
                id: item.user_media_id ? item.user_media_id.toString() : item.id, 
                title: item.title,
                year: item.year || item.release_year, 
                type: item.type.toLowerCase(), 
                poster: item.poster || item.poster_url,
                status: statusMap[item.status] || 'planning', 
                rating: item.user_rating ? parseFloat(item.user_rating) : 0,
                // ID externo para linkar ao details.html
                imdbID: item.imdbID || item.tmdb_id 
            }));

            // ⚠️ NOTA: Como este arquivo está focado na busca,
            // renderizarResultados será adaptado para a biblioteca:
            renderizarResultados(mediaData);
            
        } else {
            mediaGrid.innerHTML = '';
            emptyState.style.display = 'block';
            emptyState.querySelector('h3').textContent = "Biblioteca Vazia";
            emptyState.querySelector('p').textContent = "Você não tem mídias rastreadas. Use a busca para começar!";
        }

    } catch (error) {
        console.error("Erro ao carregar biblioteca:", error);
        mediaGrid.innerHTML = '';
        emptyState.style.display = 'block';
        emptyState.querySelector('h3').textContent = "Erro de Conexão";
        emptyState.querySelector('p').textContent = `Houve um erro ao buscar sua biblioteca: ${error.message}`;
    }
}

// ----------------------------------------------------
// 2. Lógica de Busca de Mídia (usando API OMDB)
// ----------------------------------------------------

async function buscarFilmes(termo, tipo = 'movie') {
    mediaGrid.innerHTML = '';
    emptyState.style.display = 'none';

    try {
        // A busca OMDB não suporta 'book', então voltamos para 'movie' por enquanto
        const omdbTipo = (tipo === 'series' || tipo === 'movie') ? tipo : 'movie'; 
        
        const url = `http://www.omdbapi.com/?s=${encodeURIComponent(termo)}&type=${omdbTipo}&apikey=${OMDB_API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Falha na comunicação com a API de mídia.');

        const data = await response.json();

        if (data.Response === "True" && data.Search) {
            renderizarResultados(data.Search);
        } else {
            mediaGrid.innerHTML = '';
            emptyState.style.display = 'block';
            emptyState.querySelector('h3').textContent = "Nenhuma mídia encontrada";
            emptyState.querySelector('p').textContent = `Não encontramos resultados para "${termo}".`;
        }

    } catch (error) {
        console.error("Erro na busca:", error);
        mediaGrid.innerHTML = '';
        emptyState.style.display = 'block';
        emptyState.querySelector('h3').textContent = "Erro de Conexão";
        emptyState.querySelector('p').textContent = `Houve um erro ao buscar os dados. Verifique sua chave OMDB ou conexão.`;
    }
}

// ⚠️ FUNÇÃO MODIFICADA: Cria links para details.html E renderiza cards
function renderizarResultados(resultados) {
    mediaGrid.innerHTML = '';

    if (resultados && resultados.length > 0) {
        resultados.forEach(item => {
            // A API de Busca OMDB usa imdbID, a de Biblioteca usa imdbID/tmdb_id
            const itemId = item.imdbID || item.id; 
            
            // 1. Cria o elemento A para envolver o card e criar o link
            const link = document.createElement('a');
            // IMPORTANTE: Passa o ID da mídia na URL (details.html?id=ttXXXXXXX)
            link.href = `details.html?id=${itemId}`; 
            link.classList.add('media-link'); 
            
            // 2. Cria o card de mídia
            const card = document.createElement('div');
            card.classList.add('media-card');
            
            // Determina a imagem do poster (usa poster_url para biblioteca ou Poster para busca)
            const posterUrl = item.poster || item.Poster;
            const finalPoster = posterUrl && posterUrl !== 'N/A' ? posterUrl : 'https://via.placeholder.com/300x450?text=Poster+Nao+Disponivel';

            // Verifica se é um resultado da busca (Title, Type) ou da biblioteca (title, type)
            const title = item.Title || item.title;
            const year = item.Year || item.year;
            const type = item.Type || item.type;

            // Adaptação: Se for da biblioteca, mostra o status/rating
            const libraryDetails = item.status ? `
                <div class="library-details">
                    <span class="status-${item.status}">${item.status.toUpperCase()}</span>
                    ${item.rating ? `<span class="rating">⭐ ${item.rating}/5</span>` : ''}
                </div>
            ` : '';
            
            card.innerHTML = `
                <div class="card-poster">
                    <img src="${finalPoster}" alt="${title}">
                    <span class="card-type-badge">${type ? (type.charAt(0).toUpperCase() + type.slice(1)) : 'Mídia'}</span>
                </div>
                <div class="card-info">
                    ${libraryDetails}
                    <h3 class="card-title">${title}</h3>
                    <p class="card-year">${year}</p>
                </div>
            `;
            
            // 3. Adiciona o card dentro do link
            link.appendChild(card);
            // 4. Adiciona o link (agora clicável) ao grid
            mediaGrid.appendChild(link); 
        });
        emptyState.style.display = 'none';
    } else {
        emptyState.style.display = 'block';
    }
}

function carregarFilmesPopulares() {
    const populares = [
        "Avengers",
        "Batman",
        "Spider-Man",
        "Harry Potter",
        "Fast and Furious",
        "Star Wars",
        "Guardians of the Galaxy",
        "Deadpool"
    ];
    // Carrega um termo aleatório para a tela inicial
    const termo = populares[Math.floor(Math.random() * populares.length)];
    // Apenas para testes, carrega resultados iniciais no grid
    buscarFilmes(termo);
}

// ----------------------------------------------------
// 3. Event Listeners (Mantidos da sua lógica de busca)
// ----------------------------------------------------

// Campo de Pesquisa Grande
const searchField = document.getElementById("searchField");
const searchButton = document.getElementById("searchButton");

if (searchButton && searchField) {
    searchButton.addEventListener("click", () => {
        const termo = searchField.value.trim();
        if (termo === "") return alert("Digite o nome de um filme, série ou livro.");
        // Faz a busca na OMDB
        buscarFilmes(termo, 'movie'); 
    });

    searchField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const termo = searchField.value.trim();
            if (termo === "") return alert("Digite o nome de um filme, série ou livro.");
            buscarFilmes(termo, 'movie');
        }
    });
}

// ----------------------------------------------------
// 4. Inicialização
// ----------------------------------------------------

// Carrega sugestões populares ao carregar a página (Comentado para não interferir)
// window.addEventListener("load", carregarFilmesPopulares);

window.addEventListener("load", () => {
    // ⚠️ Se este script estiver na página principal (index.html)
    // Descomente a linha abaixo para carregar a biblioteca do usuário:
    // carregarBibliotecaDoBackend(); 
    
    // ⚠️ Se este script estiver na página de busca (search.html)
    // Descomente a linha abaixo para carregar sugestões:
    carregarFilmesPopulares();
});