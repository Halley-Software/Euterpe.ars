/**
 * An `HTMLAudioElement` only accepts values between 0 and 1 as limits to sets the volume
 * 
 * To be able to manage a likeable sound volumes without gets our eardrum break.
 * A value between 0 and 100 will be divided by this constant value
 */
export const VOLUME_MAX_DIVIDER = 300

export const ADDR =
    "192.168.1.139"
    // "192.168.5.103"

export const MUSIC_NOT_FOUND_MESSAGES: string[] = [
    "We have not found songs to be played yet! So we are singing them ;)",
    "Maybe u will need to sing yout own songs",
    "No music to be played. Stage your own musical group and start play music"
]