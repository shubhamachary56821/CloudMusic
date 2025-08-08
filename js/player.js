import { songs } from './playlist.js';
import { updateTime, updateSeekBar, updateSongTitle } from './ui.js';
import { secondsToMinutesSeconds } from './utils.js';

export let currentSong = new Audio();
let currentIndex = 0;

export function playMusicFromCloudinary(index, pause = false) {
    currentIndex = index;
    currentSong.src = songs[index].url;

    if (!pause) {
        currentSong.play();
        document.getElementById("play").src = "img/pause.svg";
    }

    updateSongTitle(songs[index].title);
    updateTime("00:00", "00:00");
}

export function initPlayerControls() {
    document.getElementById("play").addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        updateTime(
            secondsToMinutesSeconds(currentSong.currentTime),
            secondsToMinutesSeconds(currentSong.duration)
        );
        updateSeekBar(currentSong.currentTime, currentSong.duration);
    });

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = e.offsetX / e.target.getBoundingClientRect().width;
        currentSong.currentTime = percent * currentSong.duration;
    });

    document.getElementById("next").addEventListener("click", () => {
        if (currentIndex < songs.length - 1) playMusicFromCloudinary(currentIndex + 1);
    });

    document.getElementById("previous").addEventListener("click", () => {
        if (currentIndex > 0) playMusicFromCloudinary(currentIndex - 1);
    });

    // Volume controls
    const range = document.querySelector(".range input");
    const volIcon = document.querySelector(".volume > img");

    range.addEventListener("input", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        volIcon.src = currentSong.volume > 0 ? "img/volume.svg" : "img/mute.svg";
    });

    volIcon.addEventListener("click", () => {
        if (currentSong.volume === 0) {
            currentSong.volume = 0.1;
            range.value = 10;
            volIcon.src = "img/volume.svg";
        } else {
            currentSong.volume = 0;
            range.value = 0;
            volIcon.src = "img/mute.svg";
        }
    });
}
