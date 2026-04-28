// ─── Contador de tempo ───────────────────────────────────────────────────────

function calcularTempo(dataInicial) {
  const agora = new Date();

  let anos = agora.getFullYear() - dataInicial.getFullYear();
  let meses = agora.getMonth() - dataInicial.getMonth();
  let dias = agora.getDate() - dataInicial.getDate();

  if (dias < 0) {
    meses--;
    dias += new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
  }

  if (meses < 0) {
    anos--;
    meses += 12;
  }

  return `
    <div class="time-item"><span>Anos:</span> <span>${anos}</span></div>
    <div class="time-item"><span>Meses:</span> <span>${meses}</span></div>
    <div class="time-item"><span>Dias:</span> <span>${dias}</span></div>
  `;
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


// ─── Fade-in no scroll ───────────────────────────────────────────────────────

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('fade-in');
  observer.observe(sec);
});
