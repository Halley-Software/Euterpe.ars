import { atom } from "nanostores"
import type { PlayablePlaylist, PlayableSong } from "@ctypes/ClientPlaylist"
import type { Nullable } from "@utils/utils"
import type { Node } from "@utils/DoubleLinkedList/DoubleLinkedList"

export const playlist = atom<Nullable<PlayablePlaylist>>(null)
export const song = atom<Nullable<Node<PlayableSong>>>(null)
export const isPaused = atom(false)