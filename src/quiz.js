import { retos } from './preguntas.js';
import { registrarPartida, nombreJugador, estrellasDe, retoDesbloqueado } from './perfil.js';

const TIEMPO_POR_PREGUNTA = 20;
const VIDAS_INICIALES = 3;
const PUNTOS_ACIERTO = 100;

const quiz = document.querySelector('#quiz');
const elRetos = document.querySelector('#quiz-retos');
const elListaRetos = document.querySelector('#quiz-lista-retos');
const elJuego = document.querySelector('#quiz-juego');
const elFinal = document.querySelector('#quiz-final');
const elVidas = document.querySelector('#quiz-vidas');
const elProgreso = document.querySelector('#quiz-progreso');
const elTiempo = document.querySelector('#quiz-tiempo');
const elPuntaje = document.querySelector('#quiz-puntaje');
const elPregunta = document.querySelector('#quiz-pregunta');
const elOpciones = document.querySelector('#quiz-opciones');
const elFinalEstrellas = document.querySelector('#quiz-final-estrellas');
const elFinalTitulo = document.querySelector('#quiz-final-titulo');
const elFinalTexto = document.querySelector('#quiz-final-texto');
const btnRetosMenu = document.querySelector('#btn-retos-menu');
const btnQuizRetos = document.querySelector('#btn-quiz-retos');
const btnReintentar = document.querySelector('#btn-reintentar');
const btnFinalRetos = document.querySelector('#btn-final-retos');
const btnFinalMenu = document.querySelector('#btn-final-menu');

let lista = [];
let retoActual = 0;
let indice = 0;
let vidas = 0;
let puntaje = 0;
let aciertos = 0;
let tiempo = 0;
let reloj = null;
let pausa = null;
let bloqueado = false;
let alSalir = () => {};

function mezclar(arreglo) {
  return [...arreglo].sort(() => Math.random() - 0.5);
}

function mostrarSeccion(seccion) {
  [elRetos, elJuego, elFinal].forEach((s) => s.classList.add('oculto'));
  seccion.classList.remove('oculto');
}

function detener() {
  clearInterval(reloj);
  clearTimeout(pausa);
}

function actualizarMarcador() {
  elVidas.textContent = '♥'.repeat(vidas) + '♡'.repeat(VIDAS_INICIALES - vidas);
  elProgreso.textContent = `Pregunta ${indice + 1} de ${lista.length}`;
  elTiempo.textContent = `⏱ ${tiempo}s`;
  elPuntaje.textContent = `Puntaje: ${puntaje}`;
}

function mostrarRetos() {
  detener();
  elListaRetos.innerHTML = '';

  retos.forEach((reto, i) => {
    const abierto = retoDesbloqueado(i);
    const estrellas = estrellasDe(i);

    const boton = document.createElement('button');
    boton.className = 'reto';
    boton.disabled = !abierto;
    boton.innerHTML = `
      <span class="reto-nombre">${reto.nombre}</span>
      <span class="reto-estrellas">${'★'.repeat(estrellas)}${'☆'.repeat(3 - estrellas)}</span>
      <span class="reto-info">${abierto ? reto.preguntas.length + ' preguntas' : 'Bloqueado'}</span>
    `;
    boton.addEventListener('click', () => comenzar(i));
    elListaRetos.appendChild(boton);
  });

  mostrarSeccion(elRetos);
}

function mostrarPregunta() {
  bloqueado = false;
  tiempo = TIEMPO_POR_PREGUNTA;
  const p = lista[indice];

  elPregunta.textContent = p.texto;
  elOpciones.innerHTML = '';

  p.opciones.forEach((texto, i) => {
    const boton = document.createElement('button');
    boton.className = 'opcion';
    boton.textContent = texto;
    boton.addEventListener('click', () => responder(i, boton));
    elOpciones.appendChild(boton);
  });

  actualizarMarcador();

  clearInterval(reloj);
  reloj = setInterval(() => {
    tiempo -= 1;
    elTiempo.textContent = `⏱ ${tiempo}s`;
    if (tiempo <= 0) responder(-1, null);
  }, 1000);
}

function responder(i, boton) {
  if (bloqueado) return;
  bloqueado = true;
  clearInterval(reloj);

  const p = lista[indice];
  const botones = elOpciones.querySelectorAll('.opcion');
  botones[p.correcta].classList.add('correcta');

  if (i === p.correcta) {
    aciertos += 1;
    puntaje += PUNTOS_ACIERTO + tiempo * 5;
  } else {
    vidas -= 1;
    if (boton) boton.classList.add('incorrecta');
  }

  actualizarMarcador();
  pausa = setTimeout(siguiente, 1500);
}

function siguiente() {
  indice += 1;
  if (vidas <= 0 || indice >= lista.length) {
    terminar();
  } else {
    mostrarPregunta();
  }
}

function terminar() {
  clearInterval(reloj);
  mostrarSeccion(elFinal);

  const estrellas = vidas > 0 ? vidas : 0;
  const resultado = registrarPartida(puntaje, retoActual, estrellas);

  elFinalEstrellas.textContent = '★'.repeat(estrellas) + '☆'.repeat(3 - estrellas);
  elFinalTitulo.textContent = vidas > 0 ? '¡Reto completado!' : 'Se acabaron las vidas';

  let texto = `${nombreJugador()}: ${aciertos} de ${lista.length} aciertos · Puntaje: ${puntaje} · +${resultado.xpGanado} XP`;
  if (resultado.subioNivel) texto += ` · ¡Subiste al nivel ${resultado.nivel}!`;
  if (resultado.desbloqueo) texto += ` · ¡Desbloqueaste el reto ${retos[retoActual + 1].nombre}!`;
  elFinalTexto.textContent = texto;
}

function comenzar(indiceReto) {
  retoActual = indiceReto;
  lista = mezclar(retos[retoActual].preguntas);
  indice = 0;
  vidas = VIDAS_INICIALES;
  puntaje = 0;
  aciertos = 0;
  mostrarSeccion(elJuego);
  mostrarPregunta();
}

function cerrar() {
  detener();
  quiz.classList.add('oculto');
  alSalir();
}

export function abrirQuiz(funcionSalir) {
  alSalir = funcionSalir;
  quiz.classList.remove('oculto');
  mostrarRetos();
}

btnRetosMenu.addEventListener('click', cerrar);
btnQuizRetos.addEventListener('click', mostrarRetos);
btnReintentar.addEventListener('click', () => comenzar(retoActual));
btnFinalRetos.addEventListener('click', mostrarRetos);
btnFinalMenu.addEventListener('click', cerrar);