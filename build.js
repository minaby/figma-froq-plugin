// build.js - Generates ui.html with pre-embedded animation frames and assets
const fs = require('fs');
const path = require('path');

// Read frames.json from the FroQ widget (in the sibling directory)
const framesPath = path.join(__dirname, '..', 'figma-froggy', 'FroQ', 'widget-src', 'frames.json');
const frames = JSON.parse(fs.readFileSync(framesPath, 'utf-8'));

// Only extract the required animation frames to keep the ui.html bundle size optimal
const needed = [
  'typing-01.PNG', 'typing-02.PNG',
  'drinking-01.PNG', 'drinking-02.PNG', 'drinking-03.PNG', 'drinking-04.PNG', 'drinking-05.PNG',
  'streching-01.PNG', 'streching-02.PNG', 'streching-03.PNG', 'streching-04.PNG',
  'streching-05.PNG', 'streching-06.PNG', 'streching-07.PNG', 'streching-08.PNG',
  'streching-09.PNG', 'streching-10.PNG', 'streching-11.PNG', 'streching-12.PNG',
  'streching-13.PNG', 'streching-14.PNG', 'streching-15.PNG', 'streching-16.PNG',
];

const subset = {};
for (const key of needed) {
  if (frames[key]) subset[key] = frames[key];
}

// Read bg.PNG and convert it to a base64 Data URL
const bgPath = path.join(__dirname, '..', 'figma-froggy', 'bg.PNG');
const bgBase64 = `data:image/png;base64,${fs.readFileSync(bgPath).toString('base64')}`;

// Read patrick_hand_sc.txt containing the base64 encoded font file
const fontBase64 = fs.readFileSync(path.join(__dirname, 'patrick_hand_sc.txt'), 'utf-8').trim();

const btnPath = path.join(__dirname, 'btn.png');
const btnBase64 = `data:image/png;base64,${fs.readFileSync(btnPath).toString('base64')}`;

const minusPath = path.join(__dirname, 'minus.png');
const minusBase64 = `data:image/png;base64,${fs.readFileSync(minusPath).toString('base64')}`;

const plusPath = path.join(__dirname, 'plus.png');
const plusBase64 = `data:image/png;base64,${fs.readFileSync(plusPath).toString('base64')}`;

const trackPath = path.join(__dirname, 'track.png');
const trackBase64 = `data:image/png;base64,${fs.readFileSync(trackPath).toString('base64')}`;

const thumbPath = path.join(__dirname, 'thumb.png');
const thumbBase64 = `data:image/png;base64,${fs.readFileSync(thumbPath).toString('base64')}`;

const ask1Path = path.join(__dirname, 'ask-01.png');
const ask1Base64 = `data:image/png;base64,${fs.readFileSync(ask1Path).toString('base64')}`;

const ask2Path = path.join(__dirname, 'ask-02.png');
const ask2Base64 = `data:image/png;base64,${fs.readFileSync(ask2Path).toString('base64')}`;

// Tạo ui.html với dữ liệu nhúng sẵn
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FroG</title>
  <style>
    @font-face {
      font-family: 'Patrick Hand SC';
      font-style: normal;
      font-weight: 400;
      src: url(data:font/ttf;base64,${fontBase64}) format('truetype');
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      position: relative;
      background: var(--figma-color-bg);
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--figma-color-text);
      user-select: none;
      width: 320px;
      height: 360px;
      overflow: hidden;
    }

    /* ── Frog area ─────────────────────────── */
    #frog-btn {
      margin-top: -24px;
      width: 320px;
      height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.1s;
      background-image: url('${bgBase64}');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
      border: none;
      padding: 0;
      position: relative;
      overflow: hidden;
    }
    #frog-btn:active {
      transform: scale(0.97);
    }

    #frog-img {
      width: 320px;
      height: 320px;
      display: block;
      position: relative;
      z-index: 1;
    }

    /* ── Bottom Bar ────────────────────────── */
    /* ── Action Button ─────────────────────── */
    #action-btn {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      width: 112px;
      height: 43px;
      cursor: pointer;
      transition: transform 0.1s;
      z-index: 10;
      background-image: url('${btnBase64}');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
    }
    #action-btn:active {
      transform: translateX(-50%) scale(0.95);
    }
    #action-btn-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 112px;
      height: 43px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      font-family: 'Patrick Hand SC', cursive;
      font-size: 28px;
      color: #000001 !important;
      user-select: none;
      pointer-events: none;
    }

    /* ── Slider wrapper ────────────────────── */
    #slider-wrapper {
      position: absolute;
      bottom: 78px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      z-index: 10;
    }
    #slider-label {
      font-family: 'Patrick Hand SC', cursive;
      font-size: 22px;
      color: var(--figma-color-text);
      user-select: none;
      line-height: 1;
    }
    #slider-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .slider-btn {
      width: 24px;
      height: 24px;
      border: none;
      background-color: transparent;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      cursor: pointer;
      transition: transform 0.1s;
    }
    .slider-btn:active {
      transform: scale(0.85);
    }
    #slider-minus {
      background-image: url('${minusBase64}');
    }
    #slider-plus {
      background-image: url('${plusBase64}');
    }
    #slider-track-container {
      position: relative;
      width: 150px;
      height: 24px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    #slider-track-line {
      width: 100%;
      height: 8px;
      background-image: url('${trackBase64}');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
    #slider-thumb {
      position: absolute;
      top: 50%;
      left: 0%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background-image: url('${thumbBase64}');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      cursor: grab;
      z-index: 2;
    }
    #slider-thumb:active {
      cursor: grabbing;
    }

    /* ── Dialogue/Onboarding Overlays ────── */
    .ask-overlay {
      position: absolute;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      pointer-events: none;
      z-index: 5;
      display: none;
    }
    #ask-01-overlay {
      background-image: url('${ask1Base64}');
      width: 190px;
      height: 110px;
      top: 20px;
      left: 24px;
    }
    #ask-02-overlay {
      background-image: url('${ask2Base64}');
      width: 270px;
      height: 129px;
      top: 4px;
      left: 12px;
    }
  </style>
</head>
<body>

  <button id="frog-btn" title="Click to start/stop FroG">
    <img id="frog-img" src="" alt="FroG" />
    <div id="ask-01-overlay" class="ask-overlay"></div>
    <div id="ask-02-overlay" class="ask-overlay"></div>
  </button>

  <div id="slider-wrapper">
    <div id="slider-label">25 min</div>
    <div id="slider-controls">
      <button id="slider-minus" class="slider-btn" title="Decrease time"></button>
      <div id="slider-track-container">
        <div id="slider-track-line"></div>
        <div id="slider-thumb"></div>
      </div>
      <button id="slider-plus" class="slider-btn" title="Increase time"></button>
    </div>
  </div>

  <div id="action-btn" role="button" title="Click to start/stop FroG">
    <span id="action-btn-text">START</span>
  </div>

  <script>
    // ── Embedded frames ───────────────────────────────────────────────
    const FRAMES = ${JSON.stringify(subset)};

    // ── Animation definitions ─────────────────────────────────────────
    const ANIMS = {
      typing: {
        frames: ['typing-01.PNG', 'typing-02.PNG'],
        ms:     [200, 200],
        loop:   true,
      },
      drinking: {
        frames: [
          'drinking-01.PNG',
          'drinking-02.PNG', 'drinking-03.PNG', 'drinking-04.PNG', 'drinking-05.PNG',
          'drinking-04.PNG', 'drinking-03.PNG', 'drinking-02.PNG',
        ],
        ms: [300, 280, 260, 240, 700, 240, 260, 280],
        loop: false,
      },
      stretching: {
        frames: [
          'streching-01.PNG','streching-02.PNG','streching-03.PNG','streching-04.PNG',
          'streching-05.PNG','streching-06.PNG','streching-07.PNG','streching-08.PNG',
          'streching-09.PNG','streching-10.PNG','streching-11.PNG','streching-12.PNG',
          'streching-13.PNG','streching-14.PNG','streching-15.PNG','streching-16.PNG',
        ],
        ms: [360, 270, 190, 190, 240, 260, 240, 190, 290, 480, 630, 320, 230, 170, 200, 300],
        loop: false,
      },
    };

    // ── Runtime state & State Machine ──────────────────────────────────
    let pluginState = 'loading'; // loading, onboarding1, onboarding2, running, paused, drinking, stretching, stretch-paused, stretch-finishing
    let frameIdx  = 0;
    let timerValue = 25 * 60; // remaining seconds during countdown
    let lastSetDuration = 25 * 60; // remember the last set duration
    let pausedRemaining = 25 * 60; // exact remaining seconds captured when pausing
    let sliderUserChanged = false; // user touched slider while paused → resume uses slider value

    // ── DOM refs ──────────────────────────────────────────────────────
    const frogBtn    = document.getElementById('frog-btn');
    const frogImg    = document.getElementById('frog-img');
    const actionBtn  = document.getElementById('action-btn');
    const actionText = document.getElementById('action-btn-text');

    const sliderMinus = document.getElementById('slider-minus');
    const sliderPlus  = document.getElementById('slider-plus');
    const sliderTrackContainer = document.getElementById('slider-track-container');
    const sliderThumb = document.getElementById('slider-thumb');
    const sliderLabel = document.getElementById('slider-label');

    const ask01Overlay = document.getElementById('ask-01-overlay');
    const ask02Overlay = document.getElementById('ask-02-overlay');
    const sliderWrapper = document.getElementById('slider-wrapper');

    // ── Format time (mm:ss) ───────────────────────────────────────────
    function formatTime(totalSeconds) {
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      const mm = mins < 10 ? '0' + mins : mins;
      const ss = secs < 10 ? '0' + secs : secs;
      return mm + ':' + ss;
    }

    // ── Update UI state ───────────────────────────────────────────────
    function updateUI() {
      // Hide all overlays and slider elements by default
      ask01Overlay.style.display = 'none';
      ask02Overlay.style.display = 'none';
      sliderWrapper.style.display = 'none';
      actionBtn.style.display = 'none';

      frogBtn.title = 'Click to interact';

      if (pluginState === 'loading') {
        // Chờ trạng thái onboarding từ backend — chỉ hiện ếch, không hiện bong bóng
        frogImg.src = FRAMES['typing-01.PNG'] || '';
      }
      else if (pluginState === 'onboarding1') {
        ask01Overlay.style.display = 'block';
        frogImg.src = FRAMES['typing-01.PNG'] || '';
      } 
      else if (pluginState === 'onboarding2') {
        ask02Overlay.style.display = 'block';
        sliderWrapper.style.display = 'flex';
        actionBtn.style.display = 'block';
        actionText.textContent = 'SET';
        frogImg.src = FRAMES['typing-02.PNG'] || '';
      } 
      else if (pluginState === 'running') {
        actionBtn.style.display = 'block';
        actionText.textContent = formatTime(timerValue);
      } 
      else if (pluginState === 'drinking') {
        actionBtn.style.display = 'block';
        actionText.textContent = 'DRINK';
      } 
      else if (pluginState === 'stretching') {
        actionBtn.style.display = 'block';
        actionText.textContent = 'STRETCH';
      } 
      else if (pluginState === 'stretch-paused') {
        actionBtn.style.display = 'block';
        actionText.textContent = 'DONE';
      }
      else if (pluginState === 'stretch-finishing') {
        // Giữ nút hiển thị xuyên suốt animation kết thúc để tránh giật
        actionBtn.style.display = 'block';
        actionText.textContent = 'DONE';
      }
      else if (pluginState === 'paused') {
        // Tạm dừng đếm giờ: cho chỉnh slider + resume, KHÔNG hiện bong bóng onboarding
        sliderWrapper.style.display = 'flex';
        actionBtn.style.display = 'block';
        actionText.textContent = 'SET';
        frogImg.src = FRAMES['typing-02.PNG'] || '';
      }
    }

    // ── Animation Loop ────────────────────────────────────────────────
    let animationTimer = null;

    function playAnimationStep() {
      if (animationTimer) clearTimeout(animationTimer);

      let animName = '';
      let loop = false;

      if (pluginState === 'running') {
        animName = 'typing';
        loop = true;
      } else if (pluginState === 'drinking') {
        animName = 'drinking';
        loop = false;
      } else if (pluginState === 'stretching') {
        animName = 'stretching';
        loop = false;
      } else if (pluginState === 'stretch-finishing') {
        animName = 'stretching';
        loop = false;
      } else {
        return;
      }

      const anim = ANIMS[animName];
      const delay = anim.ms[frameIdx] ?? 200;

      animationTimer = setTimeout(() => {
        frameIdx++;

        if (pluginState === 'stretching' && frameIdx === 11) {
          // Pause at frame index 10 (streching-11.PNG)
          pluginState = 'stretch-paused';
          updateUI();
          return;
        }

        if (frameIdx >= anim.frames.length) {
          if (loop) {
            frameIdx = 0;
          } else {
            if (pluginState === 'drinking') {
              pluginState = 'stretching';
              frameIdx = 0;
            } else if (pluginState === 'stretch-finishing') {
              pluginState = 'running';
              frameIdx = 0;
              timerValue = lastSetDuration;
              updateUI();
              playAnimationStep();
              startTimer();
              return; // Avoid falling through to the block below which would trigger double timers
            }
          }
        }

        if (pluginState === 'running' || pluginState === 'drinking' || pluginState === 'stretching' || pluginState === 'stretch-finishing') {
          const key = anim.frames[frameIdx];
          frogImg.src = FRAMES[key] || '';
          updateUI();
          playAnimationStep();
        }
      }, delay);
    }

    // ── Countdown Timer Logic ─────────────────────────────────────────
    let countdownInterval = null;

    function startTimer() {
      if (countdownInterval) clearInterval(countdownInterval);
      countdownInterval = setInterval(() => {
        if (timerValue > 0) {
          timerValue--;
          updateUI();
        } else {
          clearInterval(countdownInterval);
          countdownInterval = null;
          
          pluginState = 'drinking';
          frameIdx = 0;
          updateUI();
          playAnimationStep();
        }
      }, 1000);
    }

    function pauseTimer() {
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }

    // ── Click listeners ───────────────────────────────────────────────
    frogBtn.addEventListener('click', () => {
      if (pluginState === 'onboarding1') {
        pluginState = 'onboarding2';
        parent.postMessage({ pluginMessage: { type: 'set-onboarding-completed' } }, '*');
        updateUI();
      }
    });

    actionBtn.addEventListener('click', () => {
      if (pluginState === 'onboarding2' || pluginState === 'paused') {
        const resumeExact = (pluginState === 'paused' && !sliderUserChanged);
        pluginState = 'running';
        if (resumeExact) {
          // Resume with the exact remaining seconds; preserve the original cycle duration for the next cycle
          timerValue = pausedRemaining;
        } else {
          lastSetDuration = sliderValue * 60;
          timerValue = sliderValue * 60;
        }
        updateUI();
        playAnimationStep();
        startTimer();
      }
      else if (pluginState === 'running') {
        pauseTimer();
        if (animationTimer) clearTimeout(animationTimer); // Stop the typing animation completely
        pluginState = 'paused';
        pausedRemaining = timerValue;   // Store the exact remaining seconds
        sliderUserChanged = false;      // Slider has not been modified since pause
        updateSlider(Math.ceil(timerValue / 60));       // Display (snap to slider grid)
        updateUI();
      }
      else if (pluginState === 'stretch-paused') {
        pluginState = 'stretch-finishing';
        updateUI();
        playAnimationStep();
      }
    });

    // ── Slider Logic ──────────────────────────────────────────────────
    let sliderValue = 25; // default 25 minutes
    const MIN = 10;
    const MAX = 60;
    const STEP = 5;

    function updateSlider(value) {
      const snapped = Math.round(value / STEP) * STEP;
      sliderValue = Math.max(MIN, Math.min(MAX, snapped));
      const pct = (sliderValue - MIN) / (MAX - MIN);
      sliderThumb.style.left = (pct * 100) + '%';
      sliderLabel.textContent = sliderValue + ' min';
    }

    // Initialize slider
    updateSlider(25);

    let isDragging = false;

    function handleMove(clientX) {
      sliderUserChanged = true;
      const rect = sliderTrackContainer.getBoundingClientRect();
      let pct = (clientX - rect.left) / rect.width;
      pct = Math.max(0, Math.min(1, pct));
      const rawVal = MIN + pct * (MAX - MIN);
      const snappedVal = Math.round(rawVal / STEP) * STEP;
      updateSlider(snappedVal);
    }

    sliderTrackContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleMove(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for Figma devices
    sliderTrackContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      handleMove(e.touches[0].clientX);
    });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });

    sliderMinus.addEventListener('click', () => {
      sliderUserChanged = true;
      updateSlider(sliderValue - STEP);
    });

    sliderPlus.addEventListener('click', () => {
      sliderUserChanged = true;
      updateSlider(sliderValue + STEP);
    });

    // ── Figma message handling ────────────────────────────────────────
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      if (msg && msg.type === 'onboarding-status') {
        if (msg.completed) {
          pluginState = 'onboarding2';
        } else {
          pluginState = 'onboarding1';
        }
        updateUI();
      }
    };

    // Ask backend for onboarding status
    parent.postMessage({ pluginMessage: { type: 'get-onboarding-status' } }, '*');

    // ── Init ──────────────────────────────────────────────────────────
    updateUI();
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'ui.html'), html, 'utf-8');
console.log('✅ ui.html generated successfully');
