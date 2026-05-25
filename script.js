function calcularTempo(dataInicial) {
  const agora = new Date();

  let anos = agora.getFullYear() - dataInicial.getFullYear();
  let meses = agora.getMonth() - dataInicial.getMonth();
  let dias = agora.getDate() - dataInicial.getDate();

  let horas = agora.getHours() - dataInicial.getHours();
  let minutos = agora.getMinutes() - dataInicial.getMinutes();
  let segundos = agora.getSeconds() - dataInicial.getSeconds();

  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }

  if (minutos < 0) {
    minutos += 60;
    horas--;
  }

  if (horas < 0) {
    horas += 24;
    dias--;
  }

  if (dias < 0) {
    const ultimoMes = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      0
    ).getDate();

    dias += ultimoMes;
    meses--;
  }

  if (meses < 0) {
    meses += 12;
    anos--;
  }

  const semanas = Math.floor(dias / 7);
  dias = dias % 7;

  return `
    <div class="time-item"><span>Anos:</span> <span>${anos}</span></div>
    <div class="time-item"><span>Meses:</span> <span>${meses}</span></div>
    <div class="time-item"><span>Semanas:</span> <span>${semanas}</span></div>
    <div class="time-item"><span>Dias:</span> <span>${dias}</span></div>
    <div class="time-item"><span>Horas:</span> <span>${horas}</span></div>
    <div class="time-item"><span>Minutos:</span> <span>${minutos}</span></div>
    <div class="time-item"><span>Segundos:</span> <span>${segundos}</span></div>
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

const heroTitle = document.querySelector('.hero h1');

if (heroTitle) {
  heroTitle.innerHTML = heroTitle.textContent.split('').map(char => {
    return char === ' '
      ? '<span class="titulo-letra">&nbsp;</span>'
      : `<span class="titulo-letra">${char}</span>`;
  }).join('');
}

document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

const medias = [
  { type: 'photo', src: 'images/memoria1.png' },
  { type: 'photo', src: 'images/memoria2.png' },
  { type: 'photo', src: 'images/memoria3.png' },
  { type: 'photo', src: 'images/memoria4.png' },
  { type: 'photo', src: 'images/memoria5.png' },
  { type: 'video', src: 'images/memoria6.mp4' },

  { type: 'photo', src: 'images/memoria8.png' },
  { type: 'photo', src: 'images/memoria9.png' },
  { type: 'photo', src: 'images/memoria10.png' },
  { type: 'photo', src: 'images/memoria11.png' },
  { type: 'photo', src: 'images/memoria12.png' },

  { type: 'video', src: 'images/memoria13.mp4' },
  { type: 'video', src: 'images/memoria14.mp4' },
  { type: 'video', src: 'images/memoria15.mp4' },

  { type: 'photo', src: 'images/memoria16.png' },
  { type: 'photo', src: 'images/memoria17.png' },
  { type: 'photo', src: 'images/memoria18.png' },

  { type: 'video', src: 'images/memoria19.mp4' },

  { type: 'photo', src: 'images/memoria20.png' },
  { type: 'photo', src: 'images/memoria21.png' },

  { type: 'photo', src: 'images/memoria23.png' },
  { type: 'photo', src: 'images/memoria24.png' }
];

const calls = [];

for (let i = 1; i <= 30; i++) {
  calls.push({
    type: 'photo',
    src: `images/call${i}.png`
  });
}

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

shuffled.forEach((item) => {
  const cell = document.createElement('div');
  cell.className = 'memoria-item';

  if (item.type === 'photo') {
    const img = document.createElement('img');

    img.src = item.src;
    img.loading = 'lazy';

    cell.appendChild(img);
  } else {
    const video = document.createElement('video');

    video.src = item.src;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    cell.addEventListener('mouseenter', () => video.play());

    cell.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });

    const icon = document.createElement('div');
    icon.className = 'play-icon';
    icon.innerHTML = '▶';

    cell.appendChild(video);
    cell.appendChild(icon);
  }

  cell.addEventListener('click', () => openLightbox(item));

  grid.appendChild(cell);
});

const callsGrid = document.getElementById('callsGrid');

calls.forEach((item) => {
  const cell = document.createElement('div');
  cell.className = 'memoria-item';

  const img = document.createElement('img');

  img.src = item.src;
  img.loading = 'lazy';

  cell.appendChild(img);

  cell.addEventListener('click', () => openLightbox(item));

  callsGrid.appendChild(cell);
});

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(item) {
  lightboxContent.innerHTML = '';

  if (item.type === 'photo') {
    const img = document.createElement('img');

    img.src = item.src;

    lightboxContent.appendChild(img);
  } else {
    const video = document.createElement('video');

    video.src = item.src;
    video.controls = true;
    video.autoplay = true;

    lightboxContent.appendChild(video);
  }

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxContent.innerHTML = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

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
    if (!startTime) {
      startTime = currentTime;
    }

    const progress = Math.min((currentTime - startTime) / duration, 1);
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

    smoothScrollTo(offset);
  });
});

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');

  nav.classList.toggle('scrolled', window.scrollY > 50);
});

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

const hexes = document.querySelectorAll('.hex');

hexes.forEach(hex => {
  hex.addEventListener('mouseenter', () => {
    hex.style.transform = "scale(1.15)";
    hex.style.zIndex = "10";
  });

  hex.addEventListener('mouseleave', () => {
    hex.style.transform = "scale(1)";
    hex.style.zIndex = "1";
  });
});