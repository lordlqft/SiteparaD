function calcularTempo(dataInicial) {
  const agora = new Date();
  let diff = agora - dataInicial;

  const diasTotais = Math.floor(diff / (1000 * 60 * 60 * 24));
  const meses = Math.floor(diasTotais / 30);
  const semanas = Math.floor((diasTotais % 30) / 7);
  const dias = (diasTotais % 30) % 7;

  return meses + " meses, " + semanas + " semanas e " + dias + " dias";
}

const primeiraVista = new Date("2024-08-14");
const namoro = new Date("2025-07-18");

document.getElementById("data1").innerText =
  "Desde a primeira vez: " + calcularTempo(primeiraVista);

document.getElementById("data2").innerText =
  "Desde o namoro: " + calcularTempo(namoro);