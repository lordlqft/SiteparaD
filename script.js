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

const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  heroTitle.innerHTML = heroTitle.textContent.split('').map(char => {
    return char === ' '
      ? '<span class="titulo-letra">&nbsp;</span>'
      : `<span class="titulo-letra">${char}</span>`;
  }).join('');
}

// Flip card functionality for mobile
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});