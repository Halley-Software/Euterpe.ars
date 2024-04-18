import type { IArtist } from "#types/artist";
import type { IPlaylist } from "#types/playlist";

/**
 * Represents the data incoming from the Astro.js frontend
 */
export interface PostFetchedISong {
  name: string,
  url: string,
  duration: number,
  artist: IArtist,
  playlist: IPlaylist
}