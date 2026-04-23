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

// Floating hearts animation
const heartContainer = document.querySelector('.heart-container');

function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = '❤️';
  const size = Math.random() * 16 + 16;
  heart.style.fontSize = `${size}px`;
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.top = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${Math.random() * 2 + 5}s`;
  heart.style.opacity = '0';
  heartContainer.appendChild(heart);

  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

setInterval(createHeart, 500);
createHeart();

// Flip card functionality for mobile
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});