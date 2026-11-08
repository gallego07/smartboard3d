import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const app = document.querySelector('#app');
const panel = document.querySelector('#panel');
const panelTitulo = document.querySelector('#panel-titulo');
const panelTexto = document.querySelector('#panel-texto');

const escena = new THREE.Scene();
escena.background = new THREE.Color(0x0b1730);

const camara = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camara.position.set(0, 6, 7);

const renderizador = new THREE.WebGLRenderer({ antialias: true });
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.appendChild(renderizador.domElement);

const controles = new OrbitControls(camara, renderizador.domElement);
controles.enableDamping = true;

const luz = new THREE.DirectionalLight(0xffffff, 2);
luz.position.set(3, 6, 5);
escena.add(luz);
escena.add(new THREE.AmbientLight(0xffffff, 0.6));

// ----- La placa base -----
const placa = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.2, 6),
  new THREE.MeshStandardMaterial({ color: 0x1b2a41 })
);
escena.add(placa);

// ----- Los componentes -----
const componentes = [
  {
    nombre: 'Zócalo CPU',
    descripcion: 'Es el lugar donde se instala el procesador. Permite la comunicación entre la CPU y la tarjeta madre.',
    color: 0xc9a227, tamano: [1.6, 0.3, 1.6], posicion: [-0.5, -0.8],
  },
  {
    nombre: 'Ranuras RAM',
    descripcion: 'Aquí se instalan los módulos de memoria RAM, que guardan temporalmente los datos y programas que el computador está usando.',
    color: 0x2e8b57, tamano: [0.5, 0.3, 2.4], posicion: [1.5, -0.8],
  },
  {
    nombre: 'Chipset',
    descripcion: 'Coordina la comunicación entre el procesador, la memoria y los demás componentes de la tarjeta madre.',
    color: 0x9aa4b2, tamano: [0.9, 0.2, 0.9], posicion: [0.2, 1.4],
  },
  {
    nombre: 'Ranura PCIe',
    descripcion: 'Permite conectar tarjetas de expansión, como la tarjeta gráfica, la de red o la de sonido.',
    color: 0xb04a8f, tamano: [3.2, 0.2, 0.3], posicion: [-0.8, 2.4],
  },
  {
    nombre: 'Conector 24 pines',
    descripcion: 'Recibe la energía de la fuente de poder y la reparte a toda la tarjeta madre.',
    color: 0xe8e8e8, tamano: [0.4, 0.4, 1.4], posicion: [2.5, -0.8],
  },
  {
    nombre: 'Puertos I/O',
    descripcion: 'Puertos de entrada y salida, como USB, video, red y audio, para conectar dispositivos externos.',
    color: 0xd9534f, tamano: [0.5, 0.8, 1.8], posicion: [-2.7, -0.5],
  },
];

const mallas = [];

componentes.forEach((c) => {
  const malla = new THREE.Mesh(
    new THREE.BoxGeometry(...c.tamano),
    new THREE.MeshStandardMaterial({ color: c.color })
  );
  malla.position.set(c.posicion[0], 0.1 + c.tamano[1] / 2, c.posicion[1]);
  malla.userData = c;
  escena.add(malla);
  mallas.push(malla);
});

// ----- Selección de componentes -----
const raycaster = new THREE.Raycaster();
const puntero = new THREE.Vector2();
let inicioX = 0;
let inicioY = 0;

function seleccionar(malla) {
  mallas.forEach((m) => m.material.emissive.set(0x000000));
  malla.material.emissive.set(0x555555);
  panelTitulo.textContent = malla.userData.nombre;
  panelTexto.textContent = malla.userData.descripcion;
  panel.classList.remove('oculto');
}

function deseleccionar() {
  mallas.forEach((m) => m.material.emissive.set(0x000000));
  panel.classList.add('oculto');
}

renderizador.domElement.addEventListener('pointerdown', (e) => {
  inicioX = e.clientX;
  inicioY = e.clientY;
});

renderizador.domElement.addEventListener('pointerup', (e) => {
  const movimiento = Math.hypot(e.clientX - inicioX, e.clientY - inicioY);
  if (movimiento > 6) return;

  puntero.x = (e.clientX / window.innerWidth) * 2 - 1;
  puntero.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(puntero, camara);
  const impactos = raycaster.intersectObjects(mallas);

  if (impactos.length > 0) {
    seleccionar(impactos[0].object);
  } else {
    deseleccionar();
  }
});

function animar() {
  controles.update();
  renderizador.render(escena, camara);
  requestAnimationFrame(animar);
}
animar();

window.addEventListener('resize', () => {
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();
  renderizador.setSize(window.innerWidth, window.innerHeight);
});