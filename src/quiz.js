import { preguntas } from './preguntas.js';
import { registrarPartida, nombreJugador } from './perfil.js';

const TIEMPO_POR_PREGUNTA = 20;
const VIDAS_INICIALES = 3;
const PUNTOS_ACIERTO = 100;

const quiz = document.querySelector('#quiz');
const elJuego = document.querySelector('#quiz-juego');
const elFinal = document.querySelector('#quiz-final');
const elVidas = document.querySelector('#quiz-vidas');
const elProgreso = document.querySelector('#quiz-progreso');
const elTiempo = document.querySelector('#quiz-tiempo');
const elPuntaje = document.querySelector('#quiz-puntaje');
const elPregunta = document.querySelector('#quiz-pregunta');
const elOpciones = document.querySelector('#quiz-opciones');
const elFinalTitulo = document.querySelector('#quiz-final-titulo');
const elFinalTexto = document.querySelector('#quiz-final-texto');
const btnReintentar = document.querySelector('#btn-reintentar');
const btnQuizMenu = document.querySelector('#btn-quiz-menu');
const btnQuizSalir = document.querySelector('#btn-quiz-salir');

let lista = [];
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

function actualizarMarcador() {
  elVidas.textContent = '♥'.repeat(vidas) + '♡'.repeat(VIDAS_INICIALES - vidas);
  elProgreso.textContent = `Pregunta ${indice + 1} de ${lista.length}`;
  elTiempo.textContent = `⏱ ${tiempo}s`;
  elPuntaje.textContent = `Puntaje: ${puntaje}`;
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
  elJuego.classList.add('oculto');
  elFinal.classList.remove('oculto');

  const resultado = registrarPartida(puntaje);

  elFinalTitulo.textContent = vidas > 0 ? '¡Nivel completado!' : 'Se acabaron las vidas';
  let texto = `${nombreJugador()}: ${aciertos} de ${lista.length} aciertos · Puntaje: ${puntaje} · +${resultado.xpGanado} XP`;
  if (resultado.subioNivel) texto += ` · ¡Subiste al nivel ${resultado.nivel}!`;
  elFinalTexto.textContent = texto;
}

function comenzar() {
  lista = mezclar(preguntas);
  indice = 0;
  vidas = VIDAS_INICIALES;
  puntaje = 0;
  aciertos = 0;
  elFinal.classList.add('oculto');
  elJuego.classList.remove('oculto');
  mostrarPregunta();
}

function cerrar() {
  clearInterval(reloj);
  clearTimeout(pausa);
  quiz.classList.add('oculto');
  alSalir();
}

export function abrirQuiz(funcionSalir) {
  alSalir = funcionSalir;
  quiz.classList.remove('oculto');
  comenzar();
}

btnReintentar.addEventListener('click', comenzar);
btnQuizMenu.addEventListener('click', cerrar);
btnQuizSalir.addEventListener('click', cerrar);