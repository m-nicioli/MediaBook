CREATE DATABASE IF NOT EXISTS mediabook DEFAULT CHARACTER SET UTF8MB4; 
USE mediabook;

create table Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Campo para rastrear a última atividade (útil para segurança e manutenção)
    last_login TIMESTAMP NULL 
);

CREATE TABLE Media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    -- ID externo da TheTVDB, IMDb ou TMDb (fundamental para integração)
    tmdb_id VARCHAR(50) UNIQUE, 
    media_type ENUM('Filme', 'Série', 'Livro', 'Anime') NOT NULL,
    -- Dados essenciais para a interface
    poster_url VARCHAR(255) NULL,
    release_year YEAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserMedia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- Chaves estrangeiras (Foreign Keys) para criar o relacionamento 
    user_id INT NOT NULL,
    media_id INT NOT NULL,
    -- Dados de rastreamento do usuário
    status ENUM('Planejando', 'Em Andamento', 'Concluído', 'Abandonado') NOT NULL,
    user_rating DECIMAL(2, 1) CHECK (user_rating >= 0 AND user_rating <= 10.0),
    user_notes TEXT NULL,
    start_date DATE NULL,
    completion_date DATE NULL,
    -- Garante que um usuário só possa rastrear o mesmo item uma vez
    UNIQUE KEY unique_user_media (user_id, media_id), 
    -- Definição das chaves estrangeiras
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES Media(id) ON DELETE CASCADE 
);