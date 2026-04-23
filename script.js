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
const namoro = new Date("2025-07-18T00:00:00");

function atualizar() {
  document.getElementById("data1").innerHTML = calcularTempo(primeiraVista);
  document.getElementById("data2").innerHTML = calcularTempo(namoro);
}

setInterval(atualizar, 1000);
atualizar();

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);

// Initialize
showSlide(currentSlide);