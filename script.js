const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iconStartPause = document.querySelector('.app__card-primary-butto-icon')

const tempoNaTela = document.querySelector('#timer')
let tempoDecorridoEmSegundos = 1500
let intervaloId = null

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioAlarme = new Audio('/sons/beep.mp3')
musica.loop = true

const mensagemFoco = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>'
const mensagemDescansoCurto = 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>'
const mensagemDescansoLongo = 'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa!</strong>'

musicaFocoInput.addEventListener('change', () => {
  if(musica.paused) {
    musica.play()
  } else {
    musica.pause()
  }
})

focoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 1500
  alterarContexto('foco')
  focoBt.classList.add('active')
  zerar()
})
curtoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 300     
  alterarContexto('descanso-curto')
  curtoBt.classList.add('active')
  zerar()
})
longoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 900  
  alterarContexto('descanso-longo')
  longoBt.classList.add('active')
  zerar()
})

function alterarContexto (contexto) {
  mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove('active')
  })
  html.setAttribute('data-contexto', contexto)
  banner.setAttribute('src', `/imagens/${contexto}.png`)
  switch (contexto) {
    case "foco":
      titulo.innerHTML = mensagemFoco
      break;
    case "descanso-curto":
      titulo.innerHTML = mensagemDescansoCurto
      break;
    case "descanso-longo":
      titulo.innerHTML = mensagemDescansoLongo
      break;
    default:
      break;
  }
}

function contagemRegressiva() {
  if(tempoDecorridoEmSegundos <= 0) {
    audioAlarme.play()
    zerar()
    return
  }
  tempoDecorridoEmSegundos -= 1
  mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
  if(intervaloId) {
    zerar()
    audioPause.play()
    return
  }
  intervaloId = setInterval(contagemRegressiva, 1000)
  audioPlay.play()
  iniciarOuPausarBt.textContent = 'Pausar'
  iconStartPause.setAttribute('src', '/imagens/pause.png')
}
function zerar() {
  clearInterval(intervaloId)
  iniciarOuPausarBt.textContent = 'Começar'
  iconStartPause.setAttribute('src', '/imagens/play_arrow.png')
  intervaloId = null
}
function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()