// Dados iniciais da aplicação
let mediaData = [
    {
        id: '1',
        title: 'Duna',
        year: 2021,
        type: 'movie',
        poster: 'https://images.unsplash.com/photo-1620153850780-0883dd907257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGZpbG18ZW58MXx8fHwxNzU3NTczNjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        status: 'completed',
        rating: 5
    },
    {
        id: '2',
        title: 'Breaking Bad',
        year: 2008,
        type: 'series',
        poster: 'https://images.unsplash.com/photo-1705123898140-11c516829f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0diUyMHNlcmllcyUyMHNjcmVlbnxlbnwxfHx8fDE3NTc2MTk1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        status: 'watching',
        rating: 4,
        progress: { current: 45, total: 62 }
    },
    {
        id: '3',
        title: 'O Senhor dos Anéis',
        year: 1954,
        type: 'book',
        poster: 'https://images.unsplash.com/photo-1650513259622-081281181c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBsaWJyYXJ5fGVufDF8fHx8MTc1NzYxOTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        status: 'planning',
        progress: { current: 0, total: 50 }
    },
    {
        id: '4',
        title: 'Your Name',
        year: 2016,
        type: 'anime',
        poster: 'https://images.unsplash.com/photo-1569701813229-33284b643e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwcG9zdGVyfGVufDF8fHx8MTc1NzYxOTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        status: 'completed',
        rating: 5
    },
    {
        id: '5',
        title: 'One Piece',
        year: 1997,
        type: 'anime',
        poster: 'https://images.unsplash.com/photo-1569701813229-33284b643e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwcG9zdGVyfGVufDF8fHx8MTc1NzYxOTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        status: 'watching',
        rating: 4,
        progress: { current: 950, total: 1000 }
    }
];

// Estado da aplicação
let state = {
    activeType: 'all',
    activeStatus: 'all',
    viewMode: 'grid'
};

// Configurações
const typeLabels = {
    movie: 'Filme',
    series: 'Série',
    book: 'Livro',
    anime: 'Anime'
};

const statusLabels = {
    planning: 'Planejando',
    watching: 'Assistindo/Lendo',
    completed: 'Concluído',
    paused: 'Pausado'
};

const statusIcons = {
    planning: 'fas fa-bookmark',
    watching: 'fas fa-play',
    completed: 'fas fa-check',
    paused: 'fas fa-pause'
};

const defaultPosters = {
    movie: 'https://images.unsplash.com/photo-1620153850780-0883dd907257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGZpbG18ZW58MXx8fHwxNzU3NTczNjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    series: 'https://images.unsplash.com/photo-1705123898140-11c516829f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0diUyMHNlcmllcyUyMHNjcmVlbnxlbnwxfHx8fDE3NTc2MTk1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    book: 'https://images.unsplash.com/photo-1650513259622-081281181c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBsaWJyYXJ5fGVufDF8fHx8MTc1NzYxOTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    anime: 'https://images.unsplash.com/photo-1569701813229-33284b643e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwcG9zdGVyfGVufDF8fHx8MTc1NzYxOTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
};

// Funções utilitárias
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animação de entrada
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remover após 2 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toastContainer.removeChild(toast), 300);
    }, 2000);
}

function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function getFilteredMedia() {
    return mediaData.filter(item => {
        const typeMatch = state.activeType === 'all' || item.type === state.activeType;
        const statusMatch = state.activeStatus === 'all' || item.status === state.activeStatus;
        return typeMatch && statusMatch;
    });
}

function calculateCounts() {
    const byType = mediaData.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
    }, {});

    const byStatus = mediaData.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
    }, {});

    return {
        total: mediaData.length,
        byType,
        byStatus
    };
}

// Funções de renderização
function createMediaCard(media, isListView = false) {
    const progressPercent = media.progress ? 
        Math.min(100, (media.progress.current / media.progress.total) * 100) : 0;
    
    const cardClass = isListView ? 'media-card list-view' : 'media-card';
    
    return `
        <div class="${cardClass}" data-id="${media.id}">
            <div class="card-poster">
                <img src="${media.poster}" alt="${media.title} poster" loading="lazy">
                <div class="card-type-badge">${typeLabels[media.type]}</div>
            </div>
            <div class="card-content">
                ${isListView ? `
                    <div class="list-view-header">
                        <div>
                            <h3 class="card-title">${media.title}</h3>
                            <p class="card-year">${media.year}</p>
                        </div>
                        <div class="list-view-meta">
                            ${media.progress ? `<span>${media.progress.current}/${media.progress.total}</span>` : ''}
                            ${media.rating ? `<span>⭐ ${media.rating}/5</span>` : ''}
                        </div>
                    </div>
                    ${media.progress ? `
                        <div class="progress-section">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progressPercent}%"></div>
                            </div>
                        </div>
                    ` : ''}
                ` : `
                    <h3 class="card-title">${media.title}</h3>
                    <p class="card-year">${media.year}</p>
                    
                    ${media.progress ? `
                        <div class="progress-section">
                            <div class="progress-header">
                                <span>Progresso</span>
                                <span>${media.progress.current}/${media.progress.total}</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progressPercent}%"></div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="status-badge status-${media.status}">
                        <i class="${statusIcons[media.status]}"></i>
                        ${statusLabels[media.status]}
                    </div>
                    
                    <div class="rating-section">
                        ${[1, 2, 3, 4, 5].map(star => `
                            <i class="fas fa-star star ${media.rating && star <= media.rating ? 'filled' : ''}" 
                               data-rating="${star}"></i>
                        `).join('')}
                        ${media.rating ? `<span class="rating-text">${media.rating}/5</span>` : ''}
                    </div>
                    
                    <div class="card-actions">
                        <button class="action-btn ${media.status === 'watching' ? 'primary' : ''}" 
                                data-action="toggle-status">
                            ${media.status === 'watching' ? 'Concluir' : 'Iniciar'}
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
}

function renderMediaGrid() {
    const mediaGrid = document.getElementById('mediaGrid');
    const emptyState = document.getElementById('emptyState');
    const filteredMedia = getFilteredMedia();
    
    if (filteredMedia.length === 0) {
        mediaGrid.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }
    
    mediaGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    // Atualizar classe do grid baseado no view mode
    mediaGrid.className = state.viewMode === 'list' ? 'media-grid list-view' : 'media-grid';
    
    mediaGrid.innerHTML = filteredMedia.map(media => 
        createMediaCard(media, state.viewMode === 'list')
    ).join('');
    
    // Adicionar event listeners para os cards
    addCardEventListeners();
}

function updateFilters() {
    const counts = calculateCounts();
    
    // Atualizar summary
    const summaryCount = document.querySelector('.summary-count');
    summaryCount.textContent = `${counts.total} ${counts.total === 1 ? 'item' : 'itens'} na sua coleção`;
    
    // Atualizar filtros de tipo
    document.querySelectorAll('[data-type]').forEach(btn => {
        const type = btn.dataset.type;
        const count = type === 'all' ? counts.total : (counts.byType[type] || 0);
        const badge = btn.querySelector('.badge');
        badge.textContent = count;
        
        // Atualizar estado ativo
        btn.classList.toggle('active', state.activeType === type);
    });
    
    // Atualizar filtros de status
    document.querySelectorAll('[data-status]').forEach(btn => {
        const status = btn.dataset.status;
        const count = status === 'all' ? counts.total : (counts.byStatus[status] || 0);
        const badge = btn.querySelector('.badge');
        badge.textContent = count;
        
        // Atualizar estado ativo
        btn.classList.toggle('active', state.activeStatus === status);
    });
    
    // Atualizar view mode buttons
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === state.viewMode);
    });
}

function addCardEventListeners() {
    // Event listeners para rating
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = parseInt(e.target.dataset.rating);
            const cardId = e.target.closest('.media-card').dataset.id;
            updateMediaRating(cardId, rating);
        });
    });
    
    // Event listeners para ações
    document.querySelectorAll('[data-action="toggle-status"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cardId = e.target.closest('.media-card').dataset.id;
            const media = mediaData.find(m => m.id === cardId);
            const newStatus = media.status === 'watching' ? 'completed' : 'watching';
            updateMediaStatus(cardId, newStatus);
        });
    });
}

// Funções de manipulação de dados
function updateMediaRating(id, rating) {
    const mediaIndex = mediaData.findIndex(m => m.id === id);
    if (mediaIndex !== -1) {
        mediaData[mediaIndex].rating = rating;
        showToast(`Avaliação atualizada: ${rating} estrelas`);
        renderMediaGrid();
        updateFilters();
    }
}

function updateMediaStatus(id, status) {
    const mediaIndex = mediaData.findIndex(m => m.id === id);
    if (mediaIndex !== -1) {
        mediaData[mediaIndex].status = status;
        showToast(`Status alterado para: ${statusLabels[status]}`);
        renderMediaGrid();
        updateFilters();
    }
}

function addMedia(mediaItem) {
    const newMedia = {
        ...mediaItem,
        id: generateId(),
        poster: mediaItem.poster || defaultPosters[mediaItem.type]
    };
    
    mediaData.push(newMedia);
    showToast('Mídia adicionada com sucesso!');
    renderMediaGrid();
    updateFilters();
}

// Event listeners para filtros
function initializeEventListeners() {
    // Filtros de tipo
    document.querySelectorAll('[data-type]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.activeType = e.currentTarget.dataset.type;
            renderMediaGrid();
            updateFilters();
        });
    });
    
    // Filtros de status
    document.querySelectorAll('[data-status]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.activeStatus = e.currentTarget.dataset.status;
            renderMediaGrid();
            updateFilters();
        });
    });
    
    // View mode buttons
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.viewMode = e.currentTarget.dataset.view;
            renderMediaGrid();
            updateFilters();
        });
    });
    
    // Modal controls
    const modal = document.getElementById('addMediaModal');
    const addBtn = document.getElementById('addMediaBtn');
    const closeBtn = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('addMediaForm');
    
    addBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    // Fechar modal clicando fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const title = document.getElementById('mediaTitle').value.trim();
        const type = document.getElementById('mediaType').value;
        const year = parseInt(document.getElementById('mediaYear').value);
        const status = document.getElementById('mediaStatus').value;
        const poster = document.getElementById('mediaPoster').value.trim();
        const episodes = parseInt(document.getElementById('mediaEpisodes').value) || 1;
        
        if (!title) return;
        
        const newMedia = {
            title,
            type,
            year,
            status,
            poster,
            progress: type !== 'movie' ? {
                current: 0,
                total: episodes
            } : undefined
        };
        
        addMedia(newMedia);
        form.reset();
        document.getElementById('mediaYear').value = new Date().getFullYear();
        modal.classList.remove('show');
    });
    
    // Mostrar/esconder campo de episódios baseado no tipo
    const typeSelect = document.getElementById('mediaType');
    const episodesGroup = document.getElementById('episodesGroup');
    const episodesLabel = document.getElementById('episodesLabel');
    
    typeSelect.addEventListener('change', (e) => {
        const type = e.target.value;
        if (type === 'movie') {
            episodesGroup.style.display = 'none';
        } else {
            episodesGroup.style.display = 'block';
            episodesLabel.textContent = type === 'book' ? 'Capítulos' : 'Episódios';
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderMediaGrid();
    updateFilters();
    initializeEventListeners();
    
    // Definir ano atual no formulário
    document.getElementById('mediaYear').value = new Date().getFullYear();
});