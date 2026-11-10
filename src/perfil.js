const CLAVE = 'smartboard3d-perfil';
const XP_POR_NIVEL = 700;

const inputNombre = document.querySelector('#perfil-nombre');
const elNivel = document.querySelector('#perfil-nivel');
const elMejor = document.querySelector('#perfil-mejor');
const elXp = document.querySelector('#perfil-xp');
const elProgreso = document.querySelector('#perfil-progreso');

let perfil = cargar();

function cargar() {
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (guardado) {
      return { nombre: '', xp: 0, mejorPuntaje: 0, ...JSON.parse(guardado) };
    }
  } catch (error) {
    console.warn('No se pudo leer el perfil', error);
  }
  return { nombre: '', xp: 0, mejorPuntaje: 0 };
}

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

export function registrarPartida(puntaje) {
  const nivelAntes = Math.floor(perfil.xp / XP_POR_NIVEL) + 1;

  perfil.xp += puntaje;
  if (puntaje > perfil.mejorPuntaje) perfil.mejorPuntaje = puntaje;
  guardar();
  mostrar();

  const nivelDespues = Math.floor(perfil.xp / XP_POR_NIVEL) + 1;
  return {
    xpGanado: puntaje,
    subioNivel: nivelDespues > nivelAntes,
    nivel: nivelDespues,
  };
}

inputNombre.value = perfil.nombre;
inputNombre.addEventListener('input', () => {
  perfil.nombre = inputNombre.value;
  guardar();
});

mostrar();