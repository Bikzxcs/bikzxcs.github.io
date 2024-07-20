document.addEventListener('DOMContentLoaded', function() {
    const audio = new Audio('https://nisradio.xyz/listen/main/radio.mp3');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    const artistSpan = document.getElementById('artist');
    const titleSpan = document.getElementById('title');
    const artistSpan2 = document.getElementById('artist2');
    const titleSpan2 = document.getElementById('title2');
    const listenerSpan = document.getElementById('listenertest');
    const streamerNameSpan = document.getElementById('streamer-name');
    const streamerImg = document.getElementById('streamer-img');

    const statusSpan = document.getElementById('status');
    const liveSpan = document.getElementById('live');
    const autoSpan = document.getElementById('auto');
    const offlineSpan = document.getElementById('offline');

    const defaultStreamerImage = "https://www.habbo.com/habbo-imaging/avatarimage?figure=ch-3342-75-75.lg-3526-80.sh-3524-64-1408.ha-5241&direction=4&head_direction=3&action=wav&gesture=sml&size=m";
    const defaultStreamerName = "Auto DJ";

    const scrollYes = document.getElementById('scroll-yes');
    const scrollNo = document.getElementById('scroll-no');

    const volumeSlider = document.getElementById('volume-slider');
    const volumeNum = document.getElementById('volnum');

    liveSpan.style.display = 'none';
    autoSpan.style.display = 'none';
    offlineSpan.style.display = 'block';

    scrollYes.style.display = 'none';  // Hide scrolling text
    scrollNo.style.display = 'block';

    audio.volume = volumeSlider.value / 100;

    

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
        volumeNum.textContent = volumeSlider.value;
    });


    function updateSliderBackground() {
        const value = volumeSlider.value;
        volumeSlider.style.setProperty('--progress-value', `${value}%`);
    }

    volumeSlider.addEventListener('input', updateSliderBackground);

    // Initial update
    updateSliderBackground();


    let isPlaying = false;

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

    function updateVisibility() {
        // Combine artist and title text
        const artistText = artistSpan.textContent;
        const titleText = titleSpan.textContent;
        const combinedText = artistText + ' - ' + titleText;

        // Count characters
        const characterCount = combinedText.length;

        console.log('Artist:', artistText);
        console.log('Title:', titleText);
        console.log('Combined Text:', combinedText);
        console.log('Character Count:', combinedText.length);

        // Define the threshold
        const threshold = 31;

        // Show or hide elements based on character count
        if (characterCount > threshold) {
            scrollYes.style.display = 'block'; // Show scrolling text
            scrollNo.style.display = 'none';  // Hide static text
        } else {
            scrollYes.style.display = 'none';  // Hide scrolling text
            scrollNo.style.display = 'block'; // Show static text
        }
    }


    async function fetchNowPlaying() {
        try {
            const response = await fetch('https://nisradio.xyz/api/nowplaying/1');
            const data = await response.json();
            const artist = data.now_playing.song.artist;
            const title = data.now_playing.song.title;
            const listener = data.listeners.unique;
            const isOnline = data.is_online;
            const isLive = data.live.is_live;

            artistSpan.textContent = artist;
            titleSpan.textContent = title;
            artistSpan2.textContent = artist;
            titleSpan2. textContent = title;
            listenerSpan.textContent = listener;
            
            updateVisibility();
            updateUI(isOnline, isLive);

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
    setInterval(fetchNowPlaying, 5000); // Refresh every 5 seconds

    function updateUI(isOnline, isLive){

        offlineSpan.style.display = "block";

        if (isOnline === false){
            console.log('Offline');
            liveSpan.style.display = 'none';
            autoSpan.style.display = 'none';
            offlineSpan.style.display = 'block';
        } else if (isOnline === true && isLive === true){
            console.log('Live');
            liveSpan.style.display = 'block';
            autoSpan.style.display = 'none';
            offlineSpan.style.display = 'none';
        } else if (isOnline === true && isLive === false){
            console.log('Auto');
            liveSpan.style.display = 'none';
            autoSpan.style.display = 'block';
            offlineSpan.style.display = 'none';
        }
    }
});
