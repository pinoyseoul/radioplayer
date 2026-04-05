<!-- 
  PINOY SEOUL RADIO LAUNCHPAD (BROADCAST DECK V24 - ALIGNMENT & VISUALIZER FIX)
  - Sticky Footer Design
  - CSS FIX: Perfect vertical alignment for "Listeners • Playlist • 128k"
  - LOGIC FIX: Visualizer now uses robust Class-Toggling (.playing)
  - META FIX: Aggressive MediaSession updates for Mobile Lock Screen info
  - FEATURE: WebView/App Detection (Prevents duplicates in native apps)
  - PALETTE: Deep Signal Green (#00e04b)
  - OFFLINE STATE: Grey colors, "OFF AIR" badge, static logo
-->

<style>
/* --- CSS STYLES --- */

/* Reset & Container */
#ps-radio-deck {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px; 
    background-color: #0f1115; 
    color: #ffffff;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.6);
    border-top: 1px solid #333;
    transition: transform 0.3s ease;
    user-select: none;
    -webkit-user-select: none;
    box-sizing: border-box;
}

/* Push body up so footer doesn't cover content */
body { margin-bottom: 80px !important; }

/* 1. Progress Bar */
#ps-progress-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #1a1a1a;
    overflow: hidden;
}
#ps-progress-fill {
    height: 100%;
    background: #00e04b; 
    width: 0%;
    transition: width 1s linear;
    box-shadow: 0 0 10px #00e04b;
}

/* OFFLINE: Progress bar grey */
#ps-radio-deck.offline #ps-progress-fill {
    background: #666;
    box-shadow: none;
}

/* 2. Left Zone: Art & Visuals */
.ps-deck-left {
    display: flex;
    align-items: center;
    padding-left: 15px;
    width: 300px; 
    flex-shrink: 0;
}

#ps-album-art {
    width: 56px;
    height: 56px;
    border-radius: 4px;
    object-fit: cover;
    margin-right: 15px;
    border: 1px solid #333;
    background: #000;
    box-shadow: 0 4px 8px rgba(0,0,0,0.5);
}

/* VISUALIZER (Fixed) */
.ps-visualizer {
    display: flex;
    align-items: flex-end;
    height: 20px;
    gap: 3px;
    margin-right: 15px;
}
.ps-bar {
    width: 4px;
    background: #00e04b;
    animation: bounce 0s infinite alternate; 
    animation-play-state: paused; /* Default Paused */
    min-height: 2px;
}
/* This class controls the animation now */
#ps-radio-deck.playing .ps-bar {
    animation-play-state: running !important;
}

/* OFFLINE: Visualizer grey */
#ps-radio-deck.offline .ps-bar {
    background: #666;
}

.ps-bar:nth-child(1) { height: 12px; animation-duration: 0.4s; }
.ps-bar:nth-child(2) { height: 20px; animation-duration: 0.6s; }
.ps-bar:nth-child(3) { height: 14px; animation-duration: 0.5s; }

@keyframes bounce {
    0% { height: 4px; opacity: 0.5; }
    100% { height: 20px; opacity: 1; }
}

.ps-live-badge {
    font-size: 10px;
    color: #ff3333;
    font-weight: 800;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
}

.ps-live-badge.offline {
    color: #888;
}

.ps-dot {
    width: 6px;
    height: 6px;
    background: #ff3333;
    border-radius: 50%;
    margin-right: 5px;
    box-shadow: 0 0 5px #ff3333;
    animation: pulse 2s infinite;
}

/* OFFLINE: Dot grey */
#ps-radio-deck.offline .ps-dot {
    background: #666;
    box-shadow: none;
    animation: none;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
}

/* 3. Center Zone: Information */
.ps-deck-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
    padding-right: 20px;
}

#ps-song-title {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
}

#ps-artist-name {
    font-size: 13px;
    color: #bbb;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
}

/* META ROW (Fixed Alignment) */
.ps-meta-row {
    font-size: 11px;
    color: #666;
    display: flex;
    align-items: center; /* Crucial for vertical alignment */
    gap: 8px; /* Consistent spacing */
    font-family: 'Courier New', monospace; 
    line-height: 1; /* Reset line height for precise alignment */
}

/* OFFLINE: Meta text grey */
#ps-radio-deck.offline .ps-meta-row {
    color: #666;
}

#ps-radio-deck.offline .ps-meta-row a {
    color: #666;
}

/* Individual items in meta row */
.ps-meta-item {
    display: flex;
    align-items: center;
}

.ps-meta-row a {
    color: #00e04b;
    text-decoration: none;
    transition: color 0.2s;
}
.ps-meta-row a:hover { color: #fff; text-decoration: underline; }

/* 4. Right Zone: Controls */
.ps-deck-right {
    display: flex;
    align-items: center;
    padding-right: 20px;
    gap: 15px;
}

#ps-play-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #00e04b;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s, box-shadow 0.2s;
    box-shadow: 0 4px 10px rgba(0, 224, 75, 0.3);
}
#ps-play-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 224, 75, 0.5);
}
#ps-play-btn:active { transform: scale(0.95); }
#ps-play-btn.disabled { background: #444; cursor: not-allowed; box-shadow: none; }
#ps-play-btn.buffering { animation: pulse-white 1s infinite; }

/* OFFLINE: Play button grey */
#ps-radio-deck.offline #ps-play-btn {
    background: #666;
    box-shadow: none;
}

@keyframes pulse-white {
    0% { box-shadow: 0 0 0 rgba(255,255,255,0.4); }
    50% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
    100% { box-shadow: 0 0 0 rgba(255,255,255,0.4); }
}

#ps-play-icon {
    width: 0; height: 0; 
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 12px solid #0f1115;
    margin-left: 2px;
}
.ps-pause-icon {
    width: 10px; height: 12px;
    border-left: 3px solid #0f1115;
    border-right: 3px solid #0f1115;
    display: none;
}

/* OFFLINE: Pause icon grey */
#ps-radio-deck.offline .ps-pause-icon {
    border-left-color: #333;
    border-right-color: #333;
}

/* Volume & Popout */
.ps-volume-wrap {
    display: flex; align-items: center; gap: 8px; position: relative;
}
#ps-vol-slider {
    -webkit-appearance: none; width: 70px; height: 4px;
    background: #333; border-radius: 2px; outline: none;
}
#ps-vol-slider::-webkit-slider-thumb {
    -webkit-appearance: none; width: 12px; height: 12px;
    border-radius: 50%; background: #fff; cursor: pointer;
}

/* Unmute Badge */
#ps-unmute-badge {
    position: absolute; top: -30px; left: 50%; transform: translateX(-50%);
    background: #ff3333; color: white; font-size: 9px; padding: 3px 6px;
    border-radius: 3px; font-weight: bold; display: none; white-space: nowrap;
    animation: bounce-badge 1s infinite; cursor: pointer; z-index: 50;
}
@keyframes bounce-badge {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-3px); }
}

.ps-popout-btn {
    background: transparent; border: 1px solid #444; color: #888;
    border-radius: 4px; padding: 5px 10px; font-size: 10px;
    cursor: pointer; text-transform: uppercase; font-weight: 700;
}
.ps-popout-btn:hover { border-color: #00e04b; color: #00e04b; }

/* --- RESPONSIVE BREAKPOINTS --- */
@media (max-width: 768px) {
    #ps-radio-deck { height: 70px; padding: 0 5px; }
    .ps-deck-left { width: auto; padding-left: 5px; }
    #ps-album-art { width: 48px; height: 48px; margin-right: 10px; }
    
    /* Hide Desktop-only elements */
    .ps-visualizer, .ps-live-text { display: none; }
    .ps-volume-wrap { display: none; } 
    .ps-popout-btn { display: none; } 
    
    /* Ensure play button size is accessible */
    #ps-play-btn { width: 38px; height: 38px; }
    
    /* Typography adjustments */
    #ps-song-title { font-size: 14px; }
    #ps-artist-name { font-size: 12px; }
    .ps-meta-row { font-size: 10px; }
}
</style>

<div id="ps-radio-deck">
    <div id="ps-progress-container"><div id="ps-progress-fill"></div></div>
    
    <!-- Left: Art & Visuals -->
    <div class="ps-deck-left">
        <img id="ps-album-art" src="https://cdn-profiles.tunein.com/s295854/images/logog.png" alt="Album Art" />
        <div class="ps-visualizer">
            <div class="ps-bar"></div><div class="ps-bar"></div><div class="ps-bar"></div>
        </div>
        <div class="ps-live-badge" id="ps-live-indicator"><div class="ps-dot"></div> <span class="ps-live-text">ON AIR</span></div>
    </div>

    <!-- Center: Info & Metadata -->
    <div class="ps-deck-center">
        <div id="ps-song-title">Connecting...</div>
        <div id="ps-artist-name">Pinoy Seoul Radio</div>
        <!-- ALIGNMENT FIX: Use flex items for perfect centering -->
        <div class="ps-meta-row">
            <div class="ps-meta-item"><span id="ps-listeners">👥 --</span></div>
            <div class="ps-meta-item" style="opacity: 0.5">•</div>
            <div class="ps-meta-item"><a href="https://www.pinoyseoul.com/p/schedule.html" target="_blank" id="ps-playlist-link">📋 Schedule</a></div>
            <div class="ps-meta-item" style="opacity: 0.5">•</div>
            <div class="ps-meta-item"><span class="ps-bitrate">--k</span></div>
        </div>
    </div>

    <!-- Right: Controls -->
    <div class="ps-deck-right">
        <div class="ps-volume-wrap">
            <div id="ps-unmute-badge">TAP TO UNMUTE</div>
            <svg width="16" height="16" viewbox="0 0 24 24" fill="#888"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            <input type="range" id="ps-vol-slider" min="0" max="1" step="0.1" value="0.8" />
        </div>
        <button id="ps-play-btn" aria-label="Play Radio">
            <div id="ps-play-icon"></div>
            <div class="ps-pause-icon"></div>
        </button>
        <button class="ps-popout-btn" id="ps-popout-trigger">Pop-Out</button>
    </div>
    
    <!-- Audio Element -->
    <audio id="ps-audio-stream" preload="none" muted autoplay></audio>
</div>

<script>
(function() {
    // 0. MOBILE APP / WEBVIEW DETECTION
    // If 'wv' is in user agent (Android WebView), hide widget to prevent duplicate audio in App
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (ua.indexOf("wv") > -1) { 
        const deck = document.getElementById('ps-radio-deck');
        if(deck) deck.style.display = 'none';
        return; // EXIT SCRIPT
    }

    // --- CONFIGURATION ---
    const API_URL = "https://radio.pinoyseoul.com/api/nowplaying/live"; 
    const API_KEY = "024b59d59d6fc852:dae75d49e47f0d09b3524b331a16609e";
    const PWA_URL = "https://radio.pinoyseoul.com/public/live";
    const FALLBACK_ART = "https://cdn-profiles.tunein.com/s295854/images/logog.png"; 

    // --- DOM ELEMENTS ---
    const deck = document.getElementById('ps-radio-deck');
    const audio = document.getElementById('ps-audio-stream');
    const playBtn = document.getElementById('ps-play-btn');
    const playIcon = document.getElementById('ps-play-icon');
    const pauseIcon = document.querySelector('.ps-pause-icon');
    const volSlider = document.getElementById('ps-vol-slider');
    const unmuteBadge = document.getElementById('ps-unmute-badge');
    const artImg = document.getElementById('ps-album-art');
    const titleEl = document.getElementById('ps-song-title');
    const artistEl = document.getElementById('ps-artist-name');
    const playlistLink = document.getElementById('ps-playlist-link');
    const listenerEl = document.getElementById('ps-listeners');
    const progressFill = document.getElementById('ps-progress-fill');
    const liveBadge = document.getElementById('ps-live-indicator');
    const liveText = document.querySelector('.ps-live-text');
    const bitrateEl = document.querySelector('.ps-bitrate');

    // --- STATE ---
    let isPlaying = false;
    let isOnline = false;
    let streamUrl = "";
    let recoveryInterval = null;
    let audioUnlocked = false; 

    // --- 1. UNLOCKER (Runs Immediately) ---
    setupUnlocker();

    function setupUnlocker() {
        const unlockFn = (e) => {
            if(audioUnlocked) return;

            // IGNORE CONTROLS (Prevents double-tap issues)
            if (e.target.closest('#ps-play-btn') || 
                e.target.closest('#ps-vol-slider') || 
                e.target.closest('.ps-popout-btn')) {
                return;
            }
            
            console.log("Unlocker: Background interaction.");
            
            if(streamUrl && (!audio.src || audio.src !== streamUrl)) {
                audio.src = streamUrl;
            }
            
            audio.muted = false; 
            audio.play().then(() => {
                console.log("Unlocked (Unmuted).");
                audioUnlocked = true;
                setUIPlaying(true);
                hideUnmuteUI();
                cleanupListeners();
            }).catch(e => {
                console.log("Unlocked (Muted fallback).");
                audio.muted = true;
                audio.play().then(() => {
                    audioUnlocked = true;
                    setUIPlaying(true);
                    showUnmuteUI();
                    cleanupListeners();
                });
            });
        };

        const cleanupListeners = () => {
            ['click', 'touchend', 'keydown'].forEach(evt => 
                document.removeEventListener(evt, unlockFn, { capture: true })
            );
        };

        ['click', 'touchend', 'keydown'].forEach(evt => 
            document.addEventListener(evt, unlockFn, { capture: true })
        );
    }

    // --- 2. LOGIC ---
    function checkAutoPlay() {
        const storedState = localStorage.getItem('ps_radio_playing');
        const shouldPlay = (storedState === 'true' || storedState === null);
        if (shouldPlay) {
            console.log("Attempting Autoplay...");
            attemptPlay(true);
        }
    }

    function setPlayState(active) {
        localStorage.setItem('ps_radio_playing', active ? 'true' : 'false');
    }

    function attemptPlay(isAutoplay = false) {
        if (!streamUrl) {
            setTimeout(() => attemptPlay(isAutoplay), 500);
            return;
        }

        if (!audio.src || audio.src !== streamUrl) audio.src = streamUrl;

        audio.muted = false;
        audio.removeAttribute('muted');
        
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                setUIPlaying(true);
                audioUnlocked = true; 
                hideUnmuteUI();
            })
            .catch(error => {
                if (isAutoplay) {
                    console.log("Blocked. Retrying Muted.");
                    audio.muted = true;
                    audio.setAttribute('muted', 'true');
                    audio.play().then(() => {
                        setUIPlaying(true);
                        audioUnlocked = true;
                        showUnmuteUI();
                    });
                } else {
                    setUIPlaying(false);
                }
            });
        }
    }

    function showUnmuteUI() { unmuteBadge.style.display = "block"; }
    function hideUnmuteUI() { unmuteBadge.style.display = "none"; }

    function setUIPlaying(active) {
        isPlaying = active;
        if (active) {
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";
            // VISUALIZER: CSS Class Toggle
            deck.classList.add('playing');
            playBtn.classList.remove('buffering');
            setPlayState(true);
        } else {
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
            deck.classList.remove('playing');
            setPlayState(false);
        }
    }

    // --- OFFLINE STATE ---
    function setOfflineState(offline) {
        if (offline) {
            deck.classList.add('offline');
            deck.classList.remove('playing');
            liveBadge.classList.add('offline');
            liveText.textContent = "OFF AIR";
            playBtn.classList.add('disabled');
            artImg.src = FALLBACK_ART;
            bitrateEl.textContent = "--k";
            
            if (isPlaying) {
                audio.pause();
                setUIPlaying(false);
            }
        } else {
            deck.classList.remove('offline');
            liveBadge.classList.remove('offline');
            liveText.textContent = "ON AIR";
            playBtn.classList.remove('disabled');
        }
        isOnline = !offline;
    }

    // --- 3. RECOVERY ---
    audio.addEventListener('error', (e) => { if (isPlaying) handleStreamDrop(); });
    audio.addEventListener('stalled', () => { if(isPlaying) playBtn.classList.add('buffering'); });
    audio.addEventListener('playing', () => { playBtn.classList.remove('buffering'); });

    function handleStreamDrop() {
        setUIPlaying(false);
        if (recoveryInterval) clearInterval(recoveryInterval);
        recoveryInterval = setInterval(() => {
            audio.src = streamUrl + "?t=" + Date.now();
            audio.load();
            audio.play().then(() => {
                clearInterval(recoveryInterval);
                setUIPlaying(true);
                fetchRadioData();
            });
        }, 15000);
    }

    // --- 4. API & METADATA (WITH MEDIA SESSION) ---
    async function fetchRadioData() {
        try {
            const response = await fetch(API_URL, { headers: { 'X-API-Key': API_KEY } });
            const data = await response.json();

            const stationOnline = (data.station && data.station.is_online) || (data.is_online);
            
            if (!stationOnline) {
                if (isOnline) setOfflineState(true);
                titleEl.textContent = "Station Offline";
                if (isPlaying) handleStreamDrop();
                return;
            } else {
                if (!isOnline) setOfflineState(false);
            }

            // Update bitrate from mounts array
            if (data.station && data.station.mounts && data.station.mounts.length > 0) {
                bitrateEl.textContent = data.station.mounts[0].bitrate + "k";
            }

            if (streamUrl !== data.station.listen_url) {
                streamUrl = data.station.listen_url;
            }

            const songData = data.now_playing.song;
            if (titleEl.textContent !== songData.title) {
                titleEl.textContent = songData.title || "Unknown Title";
                artistEl.textContent = songData.artist || "Pinoy Seoul Radio";
                artImg.src = songData.art || FALLBACK_ART;
                
                // MEDIA SESSION API (Lock Screen Metadata)
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: songData.title,
                        artist: songData.artist,
                        album: "Pinoy Seoul Radio Live",
                        artwork: [{ src: songData.art || FALLBACK_ART, sizes: '512x512', type: 'image/png' }]
                    });
                    navigator.mediaSession.setActionHandler('play', () => attemptPlay(false));
                    navigator.mediaSession.setActionHandler('pause', () => { audio.pause(); setUIPlaying(false); });
                }
            }

            const plName = data.live.is_live ? "🎙️ " + data.live.streamer_name : "📋 " + (data.now_playing.playlist || "Rotation");
            playlistLink.textContent = plName;
            listenerEl.textContent = "👥 " + data.listeners.current;

            const duration = data.now_playing.duration; 
            const elapsed = data.now_playing.elapsed;   
            if(duration > 0) {
                progressFill.style.width = ((elapsed / duration) * 100) + "%";
            } else {
                progressFill.style.width = "100%";
            }

        } catch (error) { 
            console.error("API Error:", error);
            if (isOnline) setOfflineState(true);
        }
    }

    // --- 5. EVENTS ---
    playBtn.addEventListener('click', () => {
        if (!streamUrl) return; 
        if (isPlaying) {
            audio.pause();
            audio.src = ""; 
            setUIPlaying(false);
            if (recoveryInterval) clearInterval(recoveryInterval);
        } else {
            audioUnlocked = true;
            attemptPlay(false); 
            setPlayState(true);
        }
    });

    volSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
        if (audio.muted && e.target.value > 0) { audio.muted = false; hideUnmuteUI(); }
    });
    
    unmuteBadge.addEventListener('click', () => {
        audio.muted = false;
        audio.removeAttribute('muted');
        hideUnmuteUI();
        audio.volume = volSlider.value;
    });

    document.getElementById('ps-popout-trigger').onclick = function() {
        if(isPlaying) { audio.pause(); setUIPlaying(false); }
        window.open(PWA_URL + "?autoplay=true", 'PinoySeoulPop', 'width=400,height=700,menubar=no,toolbar=no');
        setTimeout(() => {
            audioUnlocked = false; 
            setupUnlocker();
        }, 1000);
    };

    // --- INIT ---
    fetchRadioData().then(() => {
        checkAutoPlay();
    });
    setInterval(fetchRadioData, 10000);

})();
</script>
