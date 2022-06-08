const inicia = document.querySelector("#btnInicia").addEventListener("click", iniciaJogo);
let nome = document.getElementById('name').value;
const btnVerifica = document.getElementById('btnVerifica');
const status = document.getElementById('status');
const tentativa = document.getElementById('tentativa');
const chute = document.getElementById('chute');
document.querySelector("#dificuldade").addEventListener("click", selecionaDificuldade);

const reinicia = document.querySelector("#btnInicia").addEventListener("click", reiniciar);

function getName() {
  status.innerHTML = '<span style="color:#00C853">Bem vindo ao jogo, ' + nome + '!','</span>';
  return nome;
}

function iniciaJogo(){
  getName();
  
  const jogoFacil = {
  semente: 5,
  tentativa : 0,
  numeroSorteado : function geraValorAleatorio() {
    return Math.round(Math.random() * this.semente);
  }
  }

  const jogoMedio = {
    semente: 10,
    tentativa : 0,
    numeroSorteado : function geraValorAleatorio() {
      return Math.round(Math.random() * this.semente);
    }
  }
  const jogoDificil = {
    semente: 100,
    tentativa : 0,
    numeroSorteado : function geraValorAleatorio() {
      return Math.round(Math.random() * this.semente);
    }
  }

  let dificuldadeJogo = selecionaDificuldade();

  

  function selecionaDificuldade(dificuldadeJogo){
    const dificuldade = document.getElementById('dificuldade');
      if (dificuldade.value === "facil"){
        dificuldadeJogo = jogoFacil;
        dicaChute.innerHTML = '<span style="color:#00C853">Chute um número entre 0 e 5</span>';
      }
      else if (dificuldade.value === "medio"){
        dificuldadeJogo = jogoMedio;
        dicaChute.innerHTML = '<span style="color:#00C853">Chute um número entre 0 e 10</span>';
      }
      else {
        dificuldadeJogo = jogoDificil;
        dicaChute.innerHTML = '<span style="color:#00C853">Chute um número entre 0 e 100</span>';
      }
    return dificuldadeJogo;
  }

    let jogoAdivinha = dificuldadeJogo;
    let numeroSorteado = jogoAdivinha.numeroSorteado();
    console.log(jogoAdivinha);

    function atualizarTentativa(tentativa, valor) {
      if (valor > 1) {
        tentativa.innerHTML = 'Tentativas : <span style="color: blue">' +
          valor + '</span>';
      } else {
        tentativa.innerHTML = 'Tentativa : <span style="color: blue">' +
          valor + '</span>';
      }
    }

  
  function reiniciar() {
    btnVerifica.innerText = 'Verificar';
    tentativa.innerHTML = 'Tentativa :  0';
    chute.disabled = false;
    chute.value = '';
    jogoAdivinha.tentativa = 0
    numeroSorteado = jogoAdivinha.numeroSorteado();
    btnVerifica.removeEventListener('click', reiniciar);
  }

  const formAdivinha = document.getElementById('form');

  formAdivinha.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!!chute.value == false) {
      status.innerHTML =  '<span style="color:#FF3D00">Digite algum valor, </span>' + nome;
      return;
    }

    atualizarTentativa(tentativa, ++jogoAdivinha.tentativa);

    if (numeroSorteado == chute.value) {
      status.innerHTML = '<span style="color:#00C853">Parabéns, você acertou!!</span>';
      chute.disabled = true
      btnVerifica.innerText = "Tentar novamente?";
      btnVerifica.addEventListener('click', reiniciar);

    } else if (numeroSorteado > chute.value) {
      status.innerText =  'O número sorteado é maior';
    } else if (numeroSorteado < chute.value) {
      status.innerText =  'O número sorteado é menor';
    }
  });
}
  