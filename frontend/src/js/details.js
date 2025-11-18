// details.js

document.addEventListener('DOMContentLoaded', () => {
    // ⚠️ ATENÇÃO: SUBSTITUA ESTE VALOR PELA SUA CHAVE OMDB REAL
    const OMDB_API_KEY = 'f67311e'; 
    const API_URL = "http://localhost:3000";
    const detailsContainer = document.querySelector('.media-details-container');
    detailsContainer.style.display = 'none';

    // Elementos da Mídia
    const mediaPoster = document.getElementById('mediaPoster');
    const mediaType = document.getElementById('mediaType');
    const mediaTitle = document.getElementById('mediaTitle');
    const mediaRuntime = document.getElementById('mediaRuntime');
    const mediaGenre = document.getElementById('mediaGenre');
    const mediaYear = document.getElementById('mediaYear');
    const externalRating = document.getElementById('externalRating');
    const mediaPlot = document.getElementById('mediaPlot');
    const mediaDirector = document.getElementById('mediaDirector');
    const mediaWriter = document.getElementById('mediaWriter');
    const mediaActors = document.getElementById('mediaActors');
    const mediaCountry = document.getElementById('mediaCountry');
    const mediaLanguage = document.getElementById('mediaLanguage');
    const mediaAwards = document.getElementById('mediaAwards');

    // Elementos de Interação do Usuário
    const addToLibraryBtn = document.getElementById('addToLibraryBtn');
    const manageLibraryBtn = document.getElementById('manageLibraryBtn');
    const userRatingStars = document.querySelectorAll('.star-edit');
    const userNotesInput = document.getElementById('userNotes');
    const saveNotesBtn = document.getElementById('saveNotesBtn');
    
    let currentMediaId = null;
    let currentMediaDetails = null;

    // Função para obter o parâmetro 'id' da URL
    function getMediaIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    // Função para buscar detalhes da mídia na OMDB
    async function fetchMediaDetails(imdbID) {
        const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Falha ao buscar detalhes da mídia.');
            const data = await response.json();
            if (data.Response === "False") throw new Error(data.Error);
            return data;
        } catch (error) {
            console.error("Erro ao buscar detalhes:", error);
            document.querySelector('.container').innerHTML = `<p style="text-align: center; color: #dc3545; padding-top: 50px;">Erro ao carregar os detalhes da mídia: ${error.message}</p>`;
            return null;
        }
    }
    
    // Função para preencher a interface com os dados
    function populateMediaData(data) {
        mediaPoster.src = data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=Poster+Nao+Disponivel';
        mediaPoster.alt = data.Title;
        mediaType.textContent = data.Type ? data.Type.toUpperCase() : 'MÍDIA';
        mediaTitle.textContent = data.Title;
        mediaRuntime.textContent = data.Runtime !== 'N/A' ? data.Runtime : 'N/A';
        mediaGenre.textContent = data.Genre !== 'N/A' ? data.Genre : 'N/A';
        mediaYear.textContent = data.Year !== 'N/A' ? data.Year : 'N/A';
        externalRating.textContent = data.imdbRating !== 'N/A' ? data.imdbRating : 'N/A';
        mediaPlot.textContent = data.Plot !== 'N/A' ? data.Plot : 'Sinopse não disponível.';
        mediaDirector.textContent = data.Director !== 'N/A' ? data.Director : 'N/A';
        mediaWriter.textContent = data.Writer !== 'N/A' ? data.Writer : 'N/A';
        mediaActors.textContent = data.Actors !== 'N/A' ? data.Actors : 'N/A';
        mediaCountry.textContent = data.Country !== 'N/A' ? data.Country : 'N/A';
        mediaLanguage.textContent = data.Language !== 'N/A' ? data.Language : 'N/A';
        mediaAwards.textContent = data.Awards !== 'N/A' ? data.Awards : 'N/A';

        detailsContainer.style.display = 'flex';
    }

    // Função para inicializar/atualizar o rating do usuário
    function initUserRating(currentRating) {
        userRatingStars.forEach(star => {
            const ratingValue = parseInt(star.dataset.rating);
            star.classList.remove('active');
            if (ratingValue <= currentRating) {
                star.classList.add('active');
            }
            
            star.onclick = () => {
                // Chama a função para simular salvar o rating
                setUserRating(ratingValue);
                // Atualiza a visualização
                initUserRating(ratingValue); 
            };
        });
    }

    // Função para simular o salvamento do rating (conecte à sua API de backend!)
    function setUserRating(rating) {
        console.log(`Salvando rating ${rating} para a mídia: ${currentMediaId}`);
        // 🚨 Aqui você faria a chamada real para o seu backend para salvar o rating 🚨
    }
    
    // Função principal de carregamento
    async function loadMediaPage() {
        currentMediaId = getMediaIdFromUrl();

        if (!currentMediaId) {
            document.querySelector('.container').innerHTML = `<p style="text-align: center; color: #dc3545; padding-top: 50px;">ID da Mídia não fornecido na URL.</p>`;
            return;
        }

        const mediaDetails = await fetchMediaDetails(currentMediaId);
        
        if (mediaDetails) {
            currentMediaDetails = mediaDetails;
            populateMediaData(mediaDetails);
            
            // 🚨 SIMULAÇÃO DE STATUS DO USUÁRIO 🚨
            // Em uma aplicação real, você fará uma chamada para seu backend aqui (Ex: GET /api/user/media/:imdbID/status)
            const userStatus = {
                 isInLibrary: false, // Inicia como não estando na biblioteca
                 userRating: 0, 
                 userNotes: ''
            };

            // Atualizar UI com dados do usuário
            if (userStatus.isInLibrary) {
                 addToLibraryBtn.style.display = 'none';
                 manageLibraryBtn.style.display = 'inline-block';
            }
            initUserRating(userStatus.userRating);
            userNotesInput.value = userStatus.userNotes;
        }
    }

    // Listener de Interação: ADICIONAR À BIBLIOTECA
    addToLibraryBtn.addEventListener('click', () => {
        // Lógica de API: POST /api/user/media (para adicionar à biblioteca)
        if (currentMediaDetails) {
             console.log("Adicionando à biblioteca:", currentMediaDetails.Title);
             alert(`${currentMediaDetails.Title} adicionado à sua biblioteca!`);
             addToLibraryBtn.style.display = 'none';
             manageLibraryBtn.style.display = 'inline-block';
             // 🚨 Chamada real para sua API de backend aqui (passando currentMediaDetails) 🚨
        }
    });

    manageLibraryBtn.addEventListener('click', () => {
        // Redirecionar para a página da biblioteca para gerenciar (Ex: mudar status, progresso)
        window.location.href = `index.html?focus=${currentMediaId}`;
    });

    saveNotesBtn.addEventListener('click', () => {
        // Lógica de API: PUT /api/user/media/notes (para salvar as notas)
        console.log("Salvando notas:", userNotesInput.value);
        alert("Notas salvas com sucesso!");
        // 🚨 Chamada real para sua API de backend aqui 🚨
    });
    
    loadMediaPage();
});