export function updateTime(current, total) {
    document.querySelector(".songtime").innerText = `${current} / ${total}`;
}

export function updateSongTitle(title) {
    document.querySelector(".songinfo").innerText = decodeURI(title);
}

export function updateSeekBar(current, duration) {
    const percent = (current / duration) * 100;
    document.querySelector(".circle").style.left = `${percent}%`;
}

export function populateSongList(songs, clickCallback) {
    const songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    songs.forEach((song, index) => {
        songUL.innerHTML += `
            <li>
                <img class="invert" width="34" src="img/music.svg" />
                <div class="info">
                    <div>${song.title}</div>
                    <div>Shubham</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" />
                </div>
            </li>`;
    });

    Array.from(songUL.getElementsByTagName("li")).forEach((li, i) => {
        li.addEventListener("click", () => clickCallback(i));
    });
}
