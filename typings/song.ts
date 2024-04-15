import { type IArtist } from "./artist"
import { type IPlaylist } from "./playlist"

export interface ISong {
    id: number,
    name: string,
    url: string,
    duration: number,
    artist: IArtist[],
    playlist: [IPlaylist],
    added_at: Date
}