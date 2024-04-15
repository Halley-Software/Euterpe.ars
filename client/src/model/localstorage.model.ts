const { localStorage } = globalThis

export default {
    saveVolume: function saveVolume(volume: string) {
        localStorage.setItem("volume", volume)
    },

    getVolume: function saveVolume() {
        return localStorage.getItem("volume")
    },

    setLastPlaylist: function setLastPlaylist(playlistID: string) {
        localStorage.setItem("lastPlaylist", playlistID)
    },

    getLastPlaylist: function getLastPlaylist() {
        return localStorage.getItem("lastPlaylist")
    }
}