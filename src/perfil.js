const CLAVE = 'smartboard3d-perfil';
const XP_POR_NIVEL = 700;

const inputNombre = document.querySelector('#perfil-nombre');
const elNivel = document.querySelector('#perfil-nivel');
const elMejor = document.querySelector('#perfil-mejor');
const elXp = document.querySelector('#perfil-xp');
const elProgreso = document.querySelector('#perfil-progreso');

function nuevoPerfil() {
  return { nombre: '', xp: 0, mejorPuntaje: 0, estrellas: [0, 0, 0] };
}

function cargar() {
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (guardado) {
      return { ...nuevoPerfil(), ...JSON.parse(guardado) };
    }
  } catch (error) {
    console.warn('No se pudo leer el perfil', error);
  }
  return nuevoPerfil();
}

let perfil = cargar();

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(perfil));
  } catch (error) {
    console.warn('No se pudo guardar el perfil', error);
  }
}

function mostrar() {
  const nivel = Math.floor(perfil.xp / XP_POR_NIVEL) + 1;
  const xpEnNivel = perfil.xp % XP_POR_NIVEL;
  elNivel.textContent = `Nivel ${nivel}`;
  elMejor.textContent = `Mejor puntaje: ${perfil.mejorPuntaje}`;
  elXp.textContent = `${xpEnNivel} / ${XP_POR_NIVEL} XP`;
  elProgreso.style.width = `${(xpEnNivel / XP_POR_NIVEL) * 100}%`;
}

export function nombreJugador() {
  return perfil.nombre.trim() || 'Estudiante';
}

export function estrellasDe(indiceReto) {
  return perfil.estrellas[indiceReto] || 0;
}

export function retoDesbloqueado(indiceReto) {
  return indiceReto === 0 || estrellasDe(indiceReto - 1) >= 1;
}

export function registrarPartida(puntaje, indiceReto, estrellas) {
  const nivelAntes = Math.floor(perfil.xp / XP_POR_NIVEL) + 1;
  const estabaAbierto = retoDesbloqueado(indiceReto + 1);

  perfil.xp += puntaje;
  if (puntaje > perfil.mejorPuntaje) perfil.mejorPuntaje = puntaje;
  if (estrellas > estrellasDe(indiceReto)) perfil.estrellas[indiceReto] = estrellas;
  guardar();
  mostrar();

  const nivelDespues = Math.floor(perfil.xp / XP_POR_NIVEL) + 1;
  const existeSiguiente = indiceReto + 1 < perfil.estrellas.length;

  return {
    xpGanado: puntaje,
    subioNivel: nivelDespues > nivelAntes,
    nivel: nivelDespues,
    desbloqueo: existeSiguiente && !estabaAbierto && retoDesbloqueado(indiceReto + 1),
  };
}

inputNombre.value = perfil.nombre;
inputNombre.addEventListener('input', () => {
  perfil.nombre = inputNombre.value;
  guardar();
});

mostrar();