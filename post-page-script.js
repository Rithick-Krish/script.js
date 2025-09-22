    <script>
        // Episodes per season - YOUR WORKING DATA
        const seasons = {
            1: [
                'https://www.youtube.com/watch?v=-1xBO_Y1994',
                'https://www.youtube.com/watch?v=yGL9Skhk0Qc',
                'https://www.youtube.com/watch?v=EKXAzm8I96A',
                'https://www.youtube.com/watch?v=BqFCWT0asa8',
                'https://www.youtube.com/watch?v=yZvGziEOBaM',
                'https://www.youtube.com/watch?v=iO8NA3HSLuk',
                'https://www.youtube.com/watch?v=utrk248xyEk',
                'https://www.youtube.com/watch?v=Aff3y35J1HA',
                'https://www.youtube.com/watch?v=IQggtFLiOm4',
                'https://www.youtube.com/watch?v=NyYDLOx7c1w',
                'https://www.youtube.com/watch?v=DgzAFHWzeZ4',
                'https://www.youtube.com/watch?v=ifu4KFUwuYk'
            ],
            2: [
                'https://www.youtube.com/watch?v=tJj__u7UuiM',
                'https://www.youtube.com/watch?v=ge4Ss4nzMnU',
                'https://www.youtube.com/watch?v=Vf1qqMX-EnU',
                'https://www.youtube.com/watch?v=QbUlna5Uj-I',
                'https://www.youtube.com/watch?v=GTkXWUfyjjA',
                'https://www.youtube.com/watch?v=8G8KFoMKfkI',
                'https://www.youtube.com/watch?v=3x2QZVQ73hw',
                'https://www.youtube.com/watch?v=eEUybcGhpck',
                'https://www.youtube.com/watch?v=LiA8EMwvaAA',
                'https://www.youtube.com/watch?v=vFcOS-qTWqM',
                'https://www.youtube.com/watch?v=xSjQldVb4So',
                'https://www.youtube.com/watch?v=B2qpCoqpApg',
                'https://www.youtube.com/watch?v=mbP4xMcUPYM'
            ]
        };

        let currentSeason = 1;
        let isVideoLoaded = false; // Track if iframe is already loaded

        // Create lightweight facade placeholder
        function createVideoFacade() {
            const videoContainer = document.getElementById('videoPlayer');
            videoContainer.innerHTML = `
                <div class="video-placeholder" onclick="loadFirstEpisode()">
                    <span>Click to Play Episode</span>
                </div>
            `;
        }

        // YOUR ORIGINAL loadVideo function - UNCHANGED
        function loadVideo(videoUrl) {
            // Extract video ID properly, works for both full youtube URL and youtu.be
            let videoId = '';
            if (videoUrl.includes('watch?v=')) {
                videoId = videoUrl.split('watch?v=')[1].split('&')[0];
            } else if (videoUrl.includes('youtu.be/')) {
                videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
            } else {
                // fallback if some other format
                videoId = videoUrl;
            }
            
            const iframeHtml = `
                <iframe class="video-iframe" width="100%" height="100%" 
                   src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0"
                  title="Anime Episode" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen>
                </iframe>`;
            document.getElementById('videoPlayer').innerHTML = iframeHtml;
            isVideoLoaded = true;
        }

        // Load first episode specifically
        function loadFirstEpisode() {
            const episodes = seasons[currentSeason];
            if (episodes.length > 0) {
                loadVideo(episodes[0]);
            }
        }
      

        // YOUR ORIGINAL createEpisodeButtons - UNCHANGED
        function createEpisodeButtons(seasonNumber) {
            const grid = document.getElementById('episodesGrid');
            grid.innerHTML = '';

            const episodes = seasons[seasonNumber];
            episodes.forEach((videoUrl, index) => {
                const btn = document.createElement('button');
                btn.className = 'episode-btn';

                const epNum = document.createElement('div');
                epNum.className = 'episode-number';
                epNum.textContent = `Episode ${index + 1}`;

                const subText = document.createElement('div');
                subText.className = 'sub-text';
                subText.textContent = 'Tamil';

                btn.appendChild(epNum);
                btn.appendChild(subText);

                btn.onclick = () => {
                    loadVideo(videoUrl);
                    // Set active class
                    document.querySelectorAll('.episode-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                };

                if (index === 0) btn.classList.add('active');

                grid.appendChild(btn);
            });

            // Show facade initially instead of auto-loading
            if (!isVideoLoaded) {
                createVideoFacade();
            }
        }

        // YOUR ORIGINAL switchSeason - UNCHANGED
        function switchSeason(seasonNumber) {
            currentSeason = seasonNumber;
            // Toggle active class on season buttons
            const seasonBtns = document.querySelectorAll('.season-btn');
            seasonBtns.forEach((btn, idx) => {
                if (idx === seasonNumber - 1) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            createEpisodeButtons(seasonNumber);
        }

        // Initialize with facade
        window.onload = () => {
            createEpisodeButtons(currentSeason);
        };

        // Optional: Auto-load when video comes into viewport (for better UX)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isVideoLoaded) {
                    // Load first episode when video section is visible
                    loadFirstEpisode();
                }
            });
        }, { threshold: 0.3 });

        // Start observing after a short delay
        setTimeout(() => {
            const videoWrapper = document.querySelector('.video-wrapper');
            if (videoWrapper) {
                videoObserver.observe(videoWrapper);
            }
        }, 500);
    </script>
<script>
    // Detect fullscreen change (works in most browsers)
    document.addEventListener("fullscreenchange", handleFullscreen);
    document.addEventListener("webkitfullscreenchange", handleFullscreen); // Safari
    document.addEventListener("mozfullscreenchange", handleFullscreen);    // Firefox
    document.addEventListener("MSFullscreenChange", handleFullscreen);     // IE/Edge

    function handleFullscreen() {
        const isFullscreen = document.fullscreenElement 
            || document.webkitFullscreenElement 
            || document.mozFullScreenElement 
            || document.msFullscreenElement;

        if (isFullscreen) {
            // Only try on mobile devices
            if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
                lockOrientation("landscape");
            }
        } else {
            // When exiting fullscreen, return to portrait
            if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
                lockOrientation("portrait");
            }
        }
    }

    function lockOrientation(orientation) {
        const screenObj = screen.orientation || screen.mozOrientation || screen.msOrientation;
        if (screenObj && screenObj.lock) {
            screenObj.lock(orientation).catch(err => {
                // Some browsers may not allow lock without user gesture
                console.warn("Orientation lock failed:", err);
            });
        }
    }
</script>
