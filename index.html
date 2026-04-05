<div id="radio-card" style="display: none; width: 100%; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    
    <a href="https://www.pinoyseoul.com/p/schedule.html" target="_blank" style="text-decoration: none; display: block; cursor: pointer;">
        <div id="info-panel" style="padding: 4px 0; background-color: #ffffff; line-height: 1.2;">
            <span id="onair-badge" style="display: inline-block; background: #dc2626; color: #ffffff; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 3px; margin-right: 5px; vertical-align: middle; letter-spacing: 0.5px;">ON AIR</span>
            <span id="meta-playlist" style="font-size: 13px; color: #212529; font-weight: 600; vertical-align: middle;">Loading...</span>
        </div>
    </a>

    <div id="player-wrapper" style="width: 100%; background: #ffffff;">
        </div>

</div>

<script>
    var radioLoaded = false;
    var streamWasDown = false;
    var watchdogInterval;

    var apiUrl = "https://radio.pinoyseoul.com/api/nowplaying/live";

    function startRadio() {
        if (radioLoaded) return; 

        var ua = navigator.userAgent || navigator.vendor || window.opera;
        if (ua.indexOf("wv") > -1) { return; }

        radioLoaded = true;

        document.getElementById('radio-card').style.display = "block";

        loadPlayer();

        updateMetadata();
        watchdogInterval = setInterval(updateMetadata, 30000); 

        ['click', 'keydown'].forEach(function(e) {
            document.removeEventListener(e, startRadio);
        });
    }

    function loadPlayer(isOnline) {
        var container = document.getElementById('player-wrapper');
        container.innerHTML = ""; 

        if (!isOnline) {
            var offlineDiv = document.createElement('div');
            offlineDiv.style.cssText = "width: 100%; height: 100px; display: flex; align-items: center; justify-content: center; background: #f3f4f6; border-radius: 8px;";
            
            var img = document.createElement('img');
            img.src = "https://cdn-profiles.tunein.com/s295854/images/logog.png";
            img.style.cssText = "max-width: 200px; max-height: 80px; opacity: 0.6;";
            img.alt = "Station Offline";
            
            offlineDiv.appendChild(img);
            container.appendChild(offlineDiv);
            return;
        }

        var iframe = document.createElement('iframe');
        iframe.src = "https://radio.pinoyseoul.com/public/live/embed?theme=light&autoplay=true&t=" + Date.now();
        iframe.frameBorder = "0";
        iframe.allowTransparency = "true";
        iframe.allow = "autoplay"; 
        iframe.setAttribute("scrolling", "no");
        
        iframe.style.display = "block"; 
        iframe.style.width = "100%";
        iframe.style.height = "100px"; 
        iframe.style.border = "0";
        iframe.style.background = "#ffffff"; 
        
        container.appendChild(iframe);
    }

    function updateMetadata() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                var isOnline = (data.station && data.station.is_online) || data.is_online;
                var badge = document.getElementById('onair-badge');
                var playlistEl = document.getElementById('meta-playlist');
                
                if (isOnline) {
                    badge.style.background = "#dc2626";
                    badge.innerText = "ON AIR";
                    playlistEl.style.color = "#212529";
                    
                    if (streamWasDown) { 
                        loadPlayer(true); 
                        streamWasDown = false; 
                    }
                } else {
                    badge.style.background = "#9ca3af";
                    badge.innerText = "OFF AIR";
                    playlistEl.style.color = "#9ca3af";
                    
                    if (!streamWasDown) { 
                        loadPlayer(false); 
                        streamWasDown = true; 
                    }
                }

                if (data.live && data.live.is_live) {
                    playlistEl.innerText = data.live.streamer_name;
                } else {
                    playlistEl.innerText = (data.now_playing && data.now_playing.playlist) ? data.now_playing.playlist : "Pinoy Seoul Radio";
                }
            })
            .catch(err => {
                var badge = document.getElementById('onair-badge');
                var playlistEl = document.getElementById('meta-playlist');
                badge.style.background = "#9ca3af";
                badge.innerText = "OFF AIR";
                playlistEl.style.color = "#9ca3af";
                loadPlayer(false);
                streamWasDown = true;
            });
    }

    ['click', 'keydown'].forEach(function(e) {
        document.addEventListener(e, startRadio, { passive: true, once: true });
    });
</script>
