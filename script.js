document.addEventListener('DOMContentLoaded', function() {
    const audio = new Audio('https://nisradio.xyz/listen/test/radio.mp3');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const artistSpan = document.getElementById('artist');
    const titleSpan = document.getElementById('title');
    const streamerNameSpan = document.getElementById('streamer-name');
    const volumeSlider = document.getElementById('volume-slider');
    const streamerImg = document.getElementById('streamer-img');

    let isPlaying = false;
    const streamerName = "Funkyhabbo"; // Define the streamer's name

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
        isPlaying = !isPlaying;
    });

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });

    async function fetchNowPlaying() {
        try {
            const response = await fetch('https://nisradio.xyz/api/nowplaying/1');
            const data = await response.json();
            artistSpan.textContent = data.now_playing.song.artist;
            titleSpan.textContent = data.now_playing.song.title;
            streamerNameSpan.textContent = data.now_playing.streamer; // Set the streamer name
            streamerImg.src = `https://www.habbo.com/habbo-imaging/avatarimage?direction=4&head_direction=3&action=wav&gesture=sml&size=m&user=${data.now_playing.streamer}`; // Set the streamer image
        } catch (error) {
            console.error('Error fetching now playing data:', error);
        }
    }

    fetchNowPlaying();
    setInterval(fetchNowPlaying, 15000); // Refresh every 15 seconds
});
