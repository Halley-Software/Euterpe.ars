import type { IPlaylist } from "#types/playlist"
import type { ISong } from "#types/song"
import type { DoubleLinkedList } from "@utils/DoubleLinkedList/DoubleLinkedList"

export interface PlayableSong extends ISong {
    audio: HTMLAudioElement
}

export interface PlayablePlaylist extends IPlaylist {
    songs: DoubleLinkedList<PlayableSong>
}