import { populateSongList } from "./ui.js";
import { playMusicFromCloudinary } from "./player.js";

export let songs = [];

export async function loadPlaylists() {
    const res = await fetch("/songs.json");
    const playlists = await res.json();

    const container = document.querySelector(".cardContainer");
    container.innerHTML = "";

    playlists.forEach((playlist, index) => {
        container.innerHTML += `
            <div class="card" data-index="${index}">
                <div class="play"><svg width="16" height="16"><path d="M5 20V4L19 12L5 20Z"/></svg></div>
                <img src="${playlist.cover}" alt="">
                <h2>${playlist.name}</h2>
                <p>${playlist.description}</p>
            </div>`;
    });

    Array.from(container.querySelectorAll(".card")).forEach((card, i) => {
        card.addEventListener("click", () => {
            loadPlaylist(playlists[i].songs);
        });
    });

    // Optionally preload the first playlist
    if (playlists.length > 0) loadPlaylist(playlists[0].songs);
}

function loadPlaylist(playlistSongs) {
    songs = playlistSongs;
    populateSongList(songs, playMusicFromCloudinary);
    playMusicFromCloudinary(0, true);
}
