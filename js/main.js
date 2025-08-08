import { displayPlaylistsFromJSON } from './playlist.js';
import { playMusicFromCloudinary } from './player.js';

async function main() {
     // 💥 THIS is what shows your playlist UI!

    // 👇 Optional: Autoload first song of first playlist (if needed)
    // You might do this after selecting a playlist from displayPlaylistsFromJSON

    window.addEventListener('DOMContentLoaded', async () => {
        await loadPlaylists();  // Load all albums
        setupPlayer();          // Set up music controls
        initUI();               // Handle hamburger, modal, etc.
    });

    function setupUIEvents() {
        document.querySelector(".hamburger").addEventListener("click", () => {
            document.querySelector(".left").style.left = "0";
        });

        document.querySelector(".close").addEventListener("click", () => {
            document.querySelector(".left").style.left = "-120%";
        });
    }

    async function main() {
        await loadPlaylists();
        initPlayerControls();
        setupUIEvents();
    }
}

await displayPlaylistsFromJSON();

main();
