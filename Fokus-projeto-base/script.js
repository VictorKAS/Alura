const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const startpauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

let tempoDecorridoemSegundos = 15
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 900;
    alterarContexto('descanso-longo')   
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach (function(contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal uma respirada?
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`

            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superficie.
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`

        default:
            break;
    }
}

const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 
const musicaInicar = new Audio('/sons/play.wav')
const musicaPausar = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const imagemPauseOuStart = document.querySelector('.app__card-primary-button-icon')
const tempoNaTela = document.querySelector('#timer')

const contagemRegressiva = () => {
    if (tempoDecorridoemSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo esgotado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        pausar();
        return;
    }
    tempoDecorridoemSegundos -= 1;
    mostrarTempo();
}

startpauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
  
    if (intervaloId) {
        musicaPausar.play();
        pausar();
        return; 
    }
    musicaInicar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    imagemPauseOuStart.setAttribute('src', '/imagens/pause.png')
}

function pausar() {
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBt.textContent = 'Começar';
    imagemPauseOuStart.setAttribute('src', '/imagens/play_arrow.png')

}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoemSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

