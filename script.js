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

  return meses + " meses\n" +
         semanas + " semanas\n" +
         dias + " dias\n" +
         horas + " horas\n" +
         minutos + " minutos\n" +
         segundos + " segundos";
}

const primeiraVista = new Date("2024-08-14T00:00:00");
const namoro = new Date("2025-07-18T00:00:00");

function atualizar() {
  document.getElementById("data1").innerText = calcularTempo(primeiraVista);
  document.getElementById("data2").innerText = calcularTempo(namoro);
}

setInterval(atualizar, 1000);
atualizar();