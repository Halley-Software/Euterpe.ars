# Euterpe.ars (provisional name)

Euterpe.ars is a music player with a built-in downloader coded in python

Is compound of 3 servers:

    - BBDD server: responsible of save metadata in the database of every song, playlist and author (TypeScript, JavaScript)

    - Client server: responsible of show the GUI and manage the playlists, songs, pause or play them, etc (Astro.js, TypeScript (with tsx for react, and raw TypeScript for data structures, etc))

    - Downloader server: responsible of download the audio that corresponds to the metadata saved in the database (Python)
