document.addEventListener('DOMContentLoaded', function() {
    const audio = new Audio('https://nisradio.xyz/listen/main/radio.mp3');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const artistSpan = document.getElementById('artist');
    const titleSpan = document.getElementById('title');
    const listenerSpan = document.getElementById('listener');
    const streamerNameSpan = document.getElementById('streamer-name');
    const volumeSlider = document.getElementById('volume-slider');
    const streamerImg = document.getElementById('streamer-img');
    

    let isPlaying = false;
    const defaultStreamerName = "Auto DJ";
    const defaultStreamerImage = "https://www.habbo.com/habbo-imaging/avatarimage?figure=ch-3342-75-75.lg-3526-80.sh-3524-64-1408.ha-5241&direction=4&head_direction=3&action=wav&gesture=sml&size=m";

    audio.volume = volumeSlider.value / 100;
    
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
            const artist = data.now_playing.song.artist;
            const title = data.now_playing.song.title;
            const listener = data.listeners.unique;

            artistSpan.textContent = artist;
            titleSpan.textContent = title;
            streamerNameSpan.textContent = data.now_playing.streamer;
            listenerSpan.textContent = listener;

            const streamerName = data.now_playing.streamer || defaultStreamerName;
            const streamerImage = data.now_playing.streamer
                ? `https://www.habbo.com/habbo-imaging/avatarimage?direction=4&head_direction=3&action=wav&gesture=sml&size=m&user=${data.now_playing.streamer}`
                : defaultStreamerImage;

            streamerNameSpan.textContent = streamerName;
            streamerImg.src = streamerImage;
        } catch (error) {
            console.error('Error fetching now playing data:', error);
            // Fallback to default values if an error occurs
            streamerNameSpan.textContent = defaultStreamerName;
            streamerImg.src = defaultStreamerImage;
        }
    }

    fetchNowPlaying();
    setInterval(fetchNowPlaying, 5000); // Refresh every 15 seconds
});
