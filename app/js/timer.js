// timer.js
const {ipcRenderer} = require('electron');
const moment = require('moment');
let segundos = 0;
let timer;
let tempo;

module.exports = {
    iniciar(el) {
        tempo = moment.duration(el.textContent);
        segundos = tempo.asSeconds();
        // removendo o setInterval anterior
        clearInterval(timer);
        timer = setInterval(() => {
            segundos++;
            el.textContent = this.segundosParaTempo(segundos);
        }, 1000);
    }, parar(curso) {
        clearInterval(timer);
        let tempoEstudado = this.segundosParaTempo(segundos);
        ipcRenderer.send('curso-parado', curso, tempoEstudado);
        

    }, segundosParaTempo(segundos) {
        return moment().startOf('year').seconds(segundos).format("HH:mm:ss");
    }
}