console.log('Lets write JavaScript');

let currentSong = new Audio();
let songs = []; // Songs from songs.json (Cloudinary)
let currentIndex = 0;

// Format seconds to mm:ss
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Fetch songs.json from Cloudinary or your hosting
async function getSongsFromCloudinary(jsonUrl) {
    const res = await fetch(jsonUrl);
    songs = await res.json();

    const songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    songs.forEach((song, i) => {
        songUL.innerHTML += `
            <li>
                <img class="invert" width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${song.title}</div>
                    <div>Shubham</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="">
                </div>
            </li>
        `;
    });

    // Add click listeners to each <li>
    Array.from(songUL.getElementsByTagName("li")).forEach((e, i) => {
        e.addEventListener("click", () => {
            playMusicFromCloudinary(i);
        });
    });
}



async function displayPlaylistsFromJSON() {
    let res = await fetch("/songs.json");
    let playlists = await res.json();

    const cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = "";

    playlists.forEach((playlist, index) => {
        cardContainer.innerHTML += `
            <div class="card" data-index="${index}">
                <div class="play">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                            stroke-linejoin="round" />
                    </svg>
                </div>
                <img src="${playlist.cover}" alt="">
                <h2>${playlist.name}</h2>
                <p>${playlist.description}</p>
            </div>`;
    });

    // On card click → load that playlist
    Array.from(document.querySelectorAll(".card")).forEach(card => {
        card.addEventListener("click", async e => {
            let index = e.currentTarget.dataset.index;
            loadPlaylist(index, playlists[index].songs);
        });
    });
}

function loadPlaylist(index, selectedSongs) {
    songs = selectedSongs;
    currentIndex = 0;

    const songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    for (const song of songs) {
        songUL.innerHTML += `
            <li>
                <img class="invert" width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${song.title}</div>
                    <div>Shubham</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="">
                </div>
            </li>`;
    }

    // Attach click to each song
    Array.from(songUL.getElementsByTagName("li")).forEach((e, i) => {
        e.addEventListener("click", () => {
            playMusicFromCloudinary(i);
        });
    });

    playMusicFromCloudinary(0, true); // load first track in pause
}




// Play song from songs array
function playMusicFromCloudinary(index, pause = false) {
    currentIndex = index;
    const song = songs[index];
    currentSong.src = song.url;

    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(song.title);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

// App logic
async function main() {
    await getSongsFromCloudinary("./songs.json"); // Hosted alongside index.html
    playMusicFromCloudinary(0, true); // Load first song (paused)

    // Play/Pause toggle
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    // Seekbar update
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Seekbar seek
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width);
        currentSong.currentTime = currentSong.duration * percent;
        document.querySelector(".circle").style.left = percent * 100 + "%";
    });

    // Hamburger open
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    // Hamburger close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Previous song
    previous.addEventListener("click", () => {
        if (currentIndex > 0) {
            playMusicFromCloudinary(currentIndex - 1);
        }
    });

    // Next song
    next.addEventListener("click", () => {
        if (currentIndex < songs.length - 1) {
            playMusicFromCloudinary(currentIndex + 1);
        }
    });

    // Volume control
    document.querySelector(".range input").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".volume > img").src = "img/volume.svg";
        }
    });

    // Mute toggle
    document.querySelector(".volume > img").addEventListener("click", (e) => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 0.1;
            document.querySelector(".range input").value = 10;
        }
    });
}(async function () {
  await displayPlaylistsFromJSON();
  main();
})();
