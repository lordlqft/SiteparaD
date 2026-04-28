// ─── Contador de tempo ───────────────────────────────────────────────────────

function calcularTempo(dataInicial) {
  const agora = new Date();
  let diff = agora - dataInicial;

  const totalSegundos = Math.floor(diff / 1000);

  const meses = Math.floor(totalSegundos / (60 * 60 * 24 * 30));
  const semanas = Math.floor((totalSegundos % (60 * 60 * 24 * 30)) / (60 * 60 * 24 * 7));
  const dias = Math.floor((totalSegundos % (60 * 60 * 24 * 7)) / (60 * 60 * 24));
  const horas = Math.floor((totalSegundos % (60 * 60 * 24)) / (60 * 60));
  const minutos = Math.floor((totalSegundos % (60 * 60)) / 60);
  const segundos = totalSegundos % 60;

  return `<div class="time-item"><span>Meses:</span> <span>${meses}</span></div>` +
    `<div class="time-item"><span>Semanas:</span> <span>${semanas}</span></div>` +
    `<div class="time-item"><span>Dias:</span> <span>${dias}</span></div>` +
    `<div class="time-item"><span>Horas:</span> <span>${horas}</span></div>` +
    `<div class="time-item"><span>Minutos:</span> <span>${minutos}</span></div>` +
    `<div class="time-item"><span>Segundos:</span> <span>${segundos}</span></div>`;
}

const primeiraVista = new Date("2024-08-14T00:00:00");
const namoro = new Date("2025-06-18T00:00:00");

function atualizar() {
  document.getElementById("data1").innerHTML = calcularTempo(primeiraVista);
  document.getElementById("data2").innerHTML = calcularTempo(namoro);
}

setInterval(atualizar, 1000);
atualizar();

// ─── Hero title wobble ────────────────────────────────────────────────────────

const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  heroTitle.innerHTML = heroTitle.textContent.split('').map(char => {
    return char === ' '
      ? '<span class="titulo-letra">&nbsp;</span>'
      : `<span class="titulo-letra">${char}</span>`;
  }).join('');
}

// ─── Flip card (mobile) ───────────────────────────────────────────────────────

document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// ─── Galeria de Memórias ──────────────────────────────────────────────────────

// Lista de mídias: coloque aqui os arquivos quando tiver.
// type: 'photo' ou 'video'
const medias = [
  { type: 'photo', src: 'images/mem_photo1.jpg' },
  { type: 'photo', src: 'images/mem_photo2.jpg' },
  { type: 'photo', src: 'images/mem_photo3.jpg' },
  { type: 'photo', src: 'images/mem_photo4.jpg' },
  { type: 'photo', src: 'images/mem_photo5.jpg' },
  { type: 'photo', src: 'images/mem_photo6.jpg' },
  { type: 'photo', src: 'images/mem_photo7.jpg' },
  { type: 'photo', src: 'images/mem_photo8.jpg' },
  { type: 'photo', src: 'images/mem_photo9.jpg' },
  { type: 'photo', src: 'images/mem_photo10.jpg' },
  { type: 'video', src: 'videos/mem_video1.mp4' },
  { type: 'video', src: 'videos/mem_video2.mp4' },
  { type: 'video', src: 'videos/mem_video3.mp4' },
  { type: 'video', src: 'videos/mem_video4.mp4' },
  { type: 'video', src: 'videos/mem_video5.mp4' },
  { type: 'video', src: 'videos/mem_video6.mp4' },
  { type: 'video', src: 'videos/mem_video7.mp4' },
  { type: 'video', src: 'videos/mem_video8.mp4' },
  { type: 'video', src: 'videos/mem_video9.mp4' },
  { type: 'video', src: 'videos/mem_video10.mp4' },
];

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const grid = document.getElementById('memoriasGrid');
const shuffled = shuffle(medias);

shuffled.forEach((item, index) => {
  const cell = document.createElement('div');
  cell.className = 'memoria-item';
  cell.dataset.index = index;

  if (item.type === 'photo') {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = 'Memória';
    img.loading = 'lazy';
    cell.appendChild(img);
  } else {
    const video = document.createElement('video');
    video.src = item.src;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';

    // play on hover (desktop)
    cell.addEventListener('mouseenter', () => video.play());
    cell.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });

    // ícone de play
    const playIcon = document.createElement('div');
    playIcon.className = 'play-icon';
    playIcon.innerHTML = '▶';

    cell.appendChild(video);
    cell.appendChild(playIcon);
  }

  // Armazena referência para lightbox
  cell.addEventListener('click', () => openLightbox(item));
  grid.appendChild(cell);
});

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(item) {
  lightboxContent.innerHTML = '';

  if (item.type === 'photo') {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = 'Memória';
    lightboxContent.appendChild(img);
  } else {
    const video = document.createElement('video');
    video.src = item.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    lightboxContent.appendChild(video);
  }

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  // Para o vídeo ao fechar
  const video = lightboxContent.querySelector('video');
  if (video) video.pause();
  setTimeout(() => { lightboxContent.innerHTML = ''; }, 300);
}

lightboxClose.addEventListener('click', closeLightbox);

// Fecha clicando fora do conteúdo
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Fecha com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ─── Smooth scroll com tween real ─────────────────────
// ─── Smooth scroll com animação real ─────────────────────

function smoothScrollTo(targetY, duration = 1000) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function ease(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;

    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const eased = ease(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const offset = target.offsetTop - 70;

    smoothScrollTo(offset, 1000);
  });
});
// ─── Navbar efeito ao scroll ─────────────────────

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});


// ─── Fade-in ao aparecer ─────────────────────

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('fade-in');
  observer.observe(sec);
});

const parallax = document.querySelector('.parallax-bg');

window.addEventListener('scroll', () => {
  if (parallax) {
    parallax.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }
});