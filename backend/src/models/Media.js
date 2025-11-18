// models/Media.js

const pool = require('../config/config'); // Deve ser o pool.promise()

class Media {
    
    // Mapeia o Type da OMDB ('movie', 'series') para o seu ENUM do DB
    static mapTypeToEnum(omdbType) {
        switch (omdbType.toLowerCase()) {
            case 'movie':
                return 'Filme';
            case 'series':
            case 'episode':
                return 'Série';
            // Adicione 'Livro' e 'Anime' se usar outras APIs
            default:
                return 'Série'; 
        }
    }
    
    // 1. Tenta inserir na tabela Media (ou atualiza se o tmdb_id já existir)
    static async findOrCreateMedia(mediaDetails) {
        
        const { imdbID, Title, Year, Type, Poster } = mediaDetails;
        
        const mediaTypeEnum = Media.mapTypeToEnum(Type);
        
        // 🚨 Ponto Crítico 1: Esta query DEVE estar correta
        const insertQuery = `
            INSERT INTO Media (tmdb_id, title, release_year, media_type, poster_url)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            title = VALUES(title), 
            release_year = VALUES(release_year), 
            media_type = VALUES(media_type),
            poster_url = VALUES(poster_url)
        `; 
        
        await pool.execute(insertQuery, [
            imdbID, // Usando imdbID no campo tmdb_id
            Title,
            Year !== 'N/A' ? Year : null,
            mediaTypeEnum,
            Poster !== 'N/A' ? Poster : null 
        ]);

        // 1.2 Obtém o ID da tabela Media para usar na UserMedia
        const selectQuery = 'SELECT id FROM Media WHERE tmdb_id = ?';
        const [rows] = await pool.execute(selectQuery, [imdbID]);
        
        if (!rows || rows.length === 0) {
            // Isso indica um erro grave na query ou na conexão anterior
            throw new Error('Falha crítica ao obter ID da Mídia após inserção.');
        }

        return rows[0].id;
    }

    // 2. Adicionar Rastreamento (UserMedia) à Biblioteca
    static async addMediaToLibrary(userId, mediaId) {
        // 🚨 Ponto Crítico 2: Esta query DEVE estar correta
        const query = `
            INSERT INTO UserMedia 
            (user_id, media_id, status) 
            VALUES (?, ?, 'Planejando')
            ON DUPLICATE KEY UPDATE media_id=VALUES(media_id) 
        `; 

        const [result] = await pool.execute(query, [
            userId,
            mediaId
        ]);
        return result.insertId;
    }

    // 3. Buscar a Biblioteca do Usuário
    static async getLibraryByUserId(userId) {
        const query = `
            SELECT 
                UM.id AS user_media_id,
                UM.status,
                UM.user_rating,
                UM.user_notes,
                M.tmdb_id AS imdbID, 
                M.title,
                M.release_year AS year,
                M.media_type AS type,
                M.poster_url AS poster
            FROM UserMedia UM
            JOIN Media M ON UM.media_id = M.id
            WHERE UM.user_id = ?
            ORDER BY UM.id DESC
        `;
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    }
}

module.exports = Media;