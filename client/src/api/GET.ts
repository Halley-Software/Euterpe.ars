import type { AllPlaylists } from "../types/Playlists";
import type { Song } from "../types/Songs";

export const getAllPlayLists = async () => (
  (await fetch("http://localhost:5000/playlists")).json()
) as Promise<AllPlaylists[]>

export const getFromPlaylist = async (name: string) => (
  (await fetch("http://localhost:5000/playlists/" + name)).json()
) as Promise<Song[]>