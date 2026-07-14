let currentSlide = 1;
const totalSlides = 6;

function createDots() {
    const container = document.createElement('div');
    container.className = 'progress-dots';
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 1 ? ' active' : '');
        dot.dataset.slide = i;
        container.appendChild(dot);
    }
    document.body.appendChild(container);
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.classList.toggle('active', parseInt(dot.dataset.slide) === currentSlide);
    });
    const container = document.querySelector('.progress-dots');
    if (currentSlide > 1) {
        container.classList.add('show');
    } else {
        container.classList.remove('show');
    }
}

function triggerFadeUp(slideEl) {
    const items = slideEl.querySelectorAll('.fade-up');
    items.forEach((el, i) => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 150 + i * 200);
    });
}

function pauseAllMedia() {
    document.querySelectorAll('video').forEach(v => {
        v.pause();
        v.currentTime = 0;
    });
    document.querySelectorAll('.next-btn').forEach(btn => {
        if (btn.dataset.alwaysVisible) return;
        btn.classList.remove('visible');
        btn.classList.add('hidden');
    });
}

function showNextButton(slideNum) {
    const slide = document.getElementById('slide-' + slideNum);
    const btn = slide.querySelector('.next-btn');
    if (btn) {
        btn.classList.remove('hidden');
        btn.classList.add('visible');
    }
}

function getVideoId(slideNum) {
    const map = { 2: 'video-1', 4: 'video-2', 5: 'video-3' };
    return map[slideNum] || null;
}

function playVideo(slideNum) {
    const videoId = getVideoId(slideNum);
    if (!videoId) return;
    const video = document.getElementById(videoId);
    if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
    }
}

function nextSlide() {
    if (currentSlide >= totalSlides) return;

    const current = document.getElementById('slide-' + currentSlide);
    const next = document.getElementById('slide-' + (currentSlide + 1));

    pauseAllMedia();
    current.classList.remove('active');

    currentSlide++;
    next.classList.add('active');
    updateDots();

    if (currentSlide >= 2 && currentSlide <= 5) {
        playVideo(currentSlide);
    }

    if (currentSlide === 6) {
        const finalItems = next.querySelectorAll('.fade-up');
        finalItems.forEach((el, i) => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 300 + i * 250);
        });
        setTimeout(() => {
            const replayBtn = next.querySelector('.replay-btn');
            if (replayBtn) {
                replayBtn.classList.remove('hidden');
                replayBtn.classList.add('visible');
            }
        }, 3000);
    }
}

function replay() {
    const replayBtn = document.querySelector('.replay-btn');
    if (replayBtn) {
        replayBtn.classList.remove('visible');
        replayBtn.classList.add('hidden');
    }
    pauseAllMedia();
    document.getElementById('slide-' + currentSlide).classList.remove('active');
    currentSlide = 1;
    document.getElementById('slide-1').classList.add('active');
    updateDots();
    const items = document.getElementById('slide-1').querySelectorAll('.fade-up');
    items.forEach((el, i) => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 400 + i * 250);
    });
}

function createSparkles() {
    const container = document.getElementById('sparkle-container');
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 4 + 's';
        sparkle.style.animationDuration = (3 + Math.random() * 3) + 's';

        const size = 3 + Math.random() * 6;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';

        const colors = ['#FFB6C1', '#C8A2E8', '#D4BBFF', '#FFD6E0'];
        sparkle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;

        container.appendChild(sparkle);
    }
}

function setupVideoEndListeners() {
    [2, 4, 5].forEach(slideNum => {
        const videoId = getVideoId(slideNum);
        const video = document.getElementById(videoId);
        if (video) {
            video.addEventListener('ended', () => {
                showNextButton(slideNum);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createDots();
    createSparkles();
    setupVideoEndListeners();

    const firstSlide = document.getElementById('slide-1');
    const items = firstSlide.querySelectorAll('.fade-up');
    items.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 400 + i * 250);
    });
});
