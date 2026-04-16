function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");
    mensagem.innerText = "Eu gosto muito de você ❤️";
}

const dataInicio = new Date("2025-07-18T00:00:00");

function atualizarTempo() {
    const agora = new Date();
    const diferenca = agora - dataInicio;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);

    document.getElementById("tempo").innerText =
        dias + " dias, " +
        horas + " horas, " +
        minutos + " minutos, " +
        segundos + " segundos";
}

setInterval(atualizarTempo, 1000);