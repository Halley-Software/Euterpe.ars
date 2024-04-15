/**
 * Artist, the autors of the songs
 * 
 * An artist can be author of 1 or multiple songs
 * And a song can have 1 or multiple artists
 */
CREATE TABLE IF NOT EXISTS ARTISTS (
	ID_ARTIST INTEGER NOT NULL AUTO_INCREMENT,
	NAME VARCHAR(30) NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

	PRIMARY KEY(ID_ARTIST)
) ENGINE=INNODB;

/**
 * The SONG_ARTISTS table defines:
 * 
 * - The songs that an artist is his creator
 * - The number of songs that this Artist have 
*/
CREATE TABLE IF NOT EXISTS SONG_ARTISTS (
	ID_SONG_ARTIST INTEGER NOT NULL AUTO_INCREMENT,
	ID_ARTIST INTEGER,
	ID_SONG INTEGER,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	
	PRIMARY KEY(ID_SONG_ARTIST),
	FOREIGN KEY(ID_ARTIST) REFERENCES ARTISTS(ID_ARTIST),
	FOREIGN KEY(ID_SONG) REFERENCES SONGS(ID_SONG)
) ENGINE=INNODB;

/**
 * A Song contains an:
 * 	ID of the song itself
 * 	ID of his author (Artist)
 * 	ID of the playlist that belongs to
 * 
 * 	NAME of the song
 * 	DURATION of the song
*/
CREATE TABLE IF NOT EXISTS SONGS (
	ID_SONG INTEGER NOT NULL AUTO_INCREMENT,
	NAME VARCHAR(40) NOT NULL,
	URL VARCHAR(100) NOT NULL,
	DURATION INTEGER NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY(ID_SONG)
) ENGINE=INNODB;

/**
 * The SONG_PLAYLISTS table defines:
 * 
 * - The songs that belongs to a playlist
 * - The number of songs of that playlist contains
*/
CREATE TABLE IF NOT EXISTS SONG_PLAYLISTS (
	ID_SONG_PLAYLIST INTEGER NOT NULL AUTO_INCREMENT,
	ID_PLAYLIST INTEGER NOT NULL DEFAULT 1,
	ID_SONG INTEGER NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	
	PRIMARY KEY(ID_SONG_PLAYLIST),
	FOREIGN KEY(ID_PLAYLIST) REFERENCES PLAYLISTS(ID_PLAYLIST),
	FOREIGN KEY(ID_SONG) REFERENCES SONGS(ID_SONG)
) ENGINE=INNODB;

/**
 * A Playlist contains songs an is accesible by a name or ID
 * 
 * An playlist can have 1 or multiple songs
 * And a song can belongs to a 1 or multiple songs
*/
CREATE TABLE IF NOT EXISTS PLAYLISTS (
	ID_PLAYLIST INTEGER NOT NULL AUTO_INCREMENT,
	NAME VARCHAR(20) NOT NULL,

	PRIMARY KEY(ID_PLAYLIST)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS USERS (
	ID_USER INTEGER NOT NULL AUTO_INCREMENT,
	
	NAME VARCHAR(20) NOT NULL UNIQUE,
	PASSWORD VARCHAR NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP,
	
	PRIMARY KEY(ID_USER)
) ENGINE=INNODB;

DELETE FROM artist;
DELETE FROM song_artist_artist;
DELETE FROM song;
DELETE FROM song_playlist_playlist;
DELETE FROM playlist;

ALTER TABLE artist AUTO_INCREMENT = 1;
ALTER TABLE song_artist_artist AUTO_INCREMENT = 1;
ALTER TABLE song AUTO_INCREMENT = 1;
ALTER TABLE song_playlist_playlist AUTO_INCREMENT = 1;
ALTER TABLE playlist AUTO_INCREMENT = 1;

ALTER TABLE playlist
	MODIFY image_url varchar(255) AFTER name;

SELECT *
	FROM playlist p
		INNER JOIN song_playlist_playlist spp ON(spp.playlistId = p.id)
		INNER JOIN song s ON(spp.songId = s.id);


SELECT *
	FROM playlist p
		INNER JOIN song_playlist_playlist spp ON(spp.playlistId = p.id)
		INNER JOIN song s ON(spp.songId = s.id)
	WHERE SPP.;

DELIMITER ^
CREATE OR ALTER TRIGGER
	AFTER INSERT ON song_artist_artist
BEGIN
	UPDATE artist A
		SET A.SIZE = A.SIZE + NEW.SIZE
		WHERE A.ID = NEW.ID;
END ^

DELIMITER ;

DELIMITER ^

CREATE TRIGGER AD_SPP_1
	AFTER DELETE ON song_playlist_playlist
UPDATE playlist P
	SET P.SIZE = P.SIZE - OLD.SIZE
	WHERE P.ID = OLD.ID;
^

DELIMITER ;

DROP TRIGGER AD_SPP_1;

/* Poniendo a prueba la base de datoas y las tablas creadas arriba */
-- ---------- --

/* Selecciona el nombre de todas las canciones en la lista de reproduccion por defecto */
SELECT S.NAME
	FROM SONGS S
		INNER JOIN SONG_PLAYLISTS SP USING(ID_SONG)
		INNER JOIN PLAYLISTS P USING(ID_PLAYLIST)
	WHERE P.NAME = 'default';

/*
 * Insertamos otro registro en SONG_PLAYLISTS,
 * haciendo que la cancion con id 3 pertenezca
 * a una nueva playlist que crearemos
*/
-- Primero crearemos la playlist
INSERT INTO PLAYLISTS
	(NAME, createdAt)
VALUES ('antisemita_typeshit', CURRENT_TIMESTAMP);

-- Ahora haremos que la cancion 3 pertenezca a esta nueva playlist
INSERT INTO SONG_PLAYLISTS
	(ID_PLAYLIST, ID_SONG, createdAt)
VALUES (2, 3, CURRENT_TIMESTAMP);

-- Insert the song 'Bala'
INSERT INTO SONG_PLAYLISTS
	(ID_PLAYLIST, ID_SONG, createdAt)
VALUES (1, 4, CURRENT_TIMESTAMP);

INSERT INTO ARTISTS
	(NAME, createdAt)
VALUES ('Keyblade', CURRENT_TIMESTAMP);

INSERT INTO SONGS
	(NAME, DURATION, URL, createdAt)
VALUES (
	'Keyblade - El arte sano',
	335,
	'https://www.youtube.com/watch?v=33HDwBfzDhU',
	CURRENT_TIMESTAMP
);

INSERT INTO SONG_ARTISTS
	(ID_ARTIST, ID_SONG, createdAt)
VALUES (5, 6, CURRENT_TIMESTAMP);

INSERT INTO SONG_PLAYLISTS
	(ID_PLAYLIST, ID_SONG, createdAt)
VALUES (2, 6, CURRENT_TIMESTAMP);

-- Repetiremos la consulta select anterior para filtar por las canciones unicamente en la nueva PlayList
SELECT S.NAME
	FROM SONGS S
		INNER JOIN SONG_PLAYLISTS USING(ID_SONG)
		INNER JOIN PLAYLISTS P USING(ID_PLAYLIST)
	WHERE P.NAME = 'antisemita_typeshit';

/* Repetiremos estos cambios
 * pero ahora para hacer que la nueva cancion
 * pertenezca a su correspondiente artista
 * En este caso el artista seria La Raiz
*/
INSERT INTO SONG_ARTISTS
	(ID_ARTIST, ID_SONG, createdAt)
VALUES (2, 3, CURRENT_TIMESTAMP);

INSERT INTO SONG_ARTISTS
	(ID_ARTIST, ID_SONG, createdAt)
VALUES (3, 4, CURRENT_TIMESTAMP);

-- Selecciona el nombre del artista por la cancion
SELECT S.NAME
	FROM SONGS S
		INNER JOIN SONG_ARTISTS USING(ID_SONG)
		INNER JOIN ARTISTS A USING(ID_ARTIST)
	WHERE A.NAME = 'La Raiz';

-- Obtener el ID del autor por el nombre
SELECT A.ID_ARTIST
	FROM ARTISTS A
	WHERE A.NAME = 'El cuarteto de Nos';

-- Obtener el nombre del autor por el nombre de la cancion
SELECT A.NAME
	FROM ARTISTS A
		INNER JOIN SONG_ARTISTS USING(ID_ARTIST)
		INNER JOIN SONGS S USING(ID_SONG)
	WHERE S.NAME = 'Jilgueros';

-- Contar todas las canciones de cada playlist
SELECT 	P.NAME AS PLAYLIST_NAME,
		COUNT(SP.ID_SONG_PLAYLIST) AS SONGS_PER_PLAYLIST
	FROM PLAYLISTS P
		INNER JOIN SONG_PLAYLISTS SP USING(ID_PLAYLIST)
	GROUP BY 1;

SELECT 	A.NAME AS ARTIST_NAME,
		COUNT(SA.ID_SONG_ARTIST) AS SONGS_PER_ARTIST
	FROM ARTISTS A
		LEFT JOIN SONG_ARTISTS SA USING(ID_ARTIST)
	GROUP BY 1;

-- Saca las canciones por artista
SELECT	S.NAME
	FROM SONGS S
		INNER JOIN SONG_ARTISTS USING(ID_SONG)
		INNER JOIN ARTISTS A USING(ID_ARTIST)
	WHERE A.ID_ARTIST = 2

-- Reiniciar el contador auto incrementable de SONG_PLAYLISTS
ALTER TABLE SONG_ARTISTS AUTO_INCREMENT = 6;

-- Nombre Cancion, duracion y artista de una lista de reproduccion
SELECT	S.NAME,
		S.DURATION,
		A.NAME
	FROM SONGS S
		INNER JOIN SONG_ARTISTS USING(ID_SONG)
		INNER JOIN ARTISTS A USING(ID_ARTIST)

-- TRIGGER para modificar el numero de canciones que tiene un artista o una playlist
-- CREATE OR ALTER TRIGGER MODIFY_COUNT ON 

-- Tabla usuario
SELECT P.NAME
	FROM PLAYLISTS P
		INNER JOIN USERS U USING(P.ID_PLAYLIST)

SELECT S.*
	FROM SONGS S
		LEFT JOIN SONG_ARTISTS SA USING(ID_SONG)
		LEFT JOIN ARTISTS A USING(ID_ARTIST)

SELECT	S.NAME,
		S.DURATION,
		S.createdAt,
		P.NAME,
		A.NAME
	FROM SONGS S
		INNER JOIN SONG_ARTISTS SA USING(ID_SONG)
		INNER JOIN SONG_PLAYLISTS SP USING(ID_SONG)
		INNER JOIN ARTISTS A USING(ID_ARTIST)
		INNER JOIN PLAYLISTS P USING(ID_PLAYLIST);

SELECT CURRENT_TIMESTAMP;






















