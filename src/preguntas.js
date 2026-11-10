export const retos = [
  {
    nombre: 'Básico',
    preguntas: [
      {
        texto: '¿Dónde se instala el procesador en la tarjeta madre?',
        opciones: ['Ranura PCIe', 'Zócalo CPU', 'Ranura de memoria RAM', 'Conector SATA'],
        correcta: 1,
      },
      {
        texto: '¿Cuál es la función de la memoria RAM?',
        opciones: [
          'Guardar archivos de forma permanente',
          'Enfriar el procesador',
          'Guardar temporalmente los datos que se están usando',
          'Conectar el monitor',
        ],
        correcta: 2,
      },
      {
        texto: '¿Qué ranura se usa normalmente para instalar una tarjeta gráfica?',
        opciones: ['Ranura PCIe', 'Ranura de memoria RAM', 'Conector SATA', 'Puerto USB'],
        correcta: 0,
      },
      {
        texto: '¿Qué conector lleva la energía principal de la fuente de poder a la tarjeta madre?',
        opciones: ['Puerto HDMI', 'Conector de audio', 'Puerto USB', 'Conector de 24 pines'],
        correcta: 3,
      },
      {
        texto: '¿Qué hace el chipset?',
        opciones: [
          'Almacena los archivos del usuario',
          'Coordina la comunicación entre los componentes',
          'Suministra energía a la placa',
          'Enfría el procesador',
        ],
        correcta: 1,
      },
      {
        texto: '¿Qué significan las siglas CPU?',
        opciones: [
          'Unidad Central de Procesamiento',
          'Control Principal de Usuario',
          'Conector Principal Universal',
          'Unidad de Control Periférico',
        ],
        correcta: 0,
      },
      {
        texto: '¿Para qué sirven los conectores SATA?',
        opciones: [
          'Conectar el monitor',
          'Conectar discos de almacenamiento',
          'Conectar el teclado',
          'Alimentar el ventilador',
        ],
        correcta: 1,
      },
      {
        texto: '¿Qué son los puertos I/O de la tarjeta madre?',
        opciones: [
          'Ranuras para memoria',
          'Conectores de energía',
          'Puertos de entrada y salida para conectar dispositivos',
          'Sensores de temperatura',
        ],
        correcta: 2,
      },
      {
        texto: '¿Qué significan las siglas RAM?',
        opciones: [
          'Registro Automático de Módulos',
          'Red de Acceso Múltiple',
          'Memoria de Archivos Permanentes',
          'Memoria de Acceso Aleatorio',
        ],
        correcta: 3,
      },
      {
        texto: '¿Cuál de estos es un tipo de zócalo (socket) de procesador?',
        opciones: ['DDR4', 'LGA 1200', 'SATA III', 'HDMI'],
        correcta: 1,
      },
    ],
  },
  {
    nombre: 'Intermedio',
    preguntas: [
      {
        texto: '¿Qué significan las siglas DDR en la memoria DDR4?',
        opciones: ['Double Data Rate', 'Digital Data Read', 'Dynamic Disk RAM', 'Direct Drive Register'],
        correcta: 0,
      },
      {
        texto: '¿Para qué sirve el conector de energía de 8 pines cercano al zócalo del procesador?',
        opciones: [
          'Conectar la tarjeta de sonido',
          'Dar energía extra al procesador',
          'Conectar los puertos USB frontales',
          'Alimentar el disco duro',
        ],
        correcta: 1,
      },
      {
        texto: '¿Qué función cumple la pila de botón de la tarjeta madre?',
        opciones: [
          'Dar energía al procesador',
          'Alimentar la memoria RAM',
          'Enfriar el chipset',
          'Mantener la hora y la configuración de la BIOS',
        ],
        correcta: 3,
      },
      {
        texto: '¿Qué es la BIOS (o UEFI)?',
        opciones: [
          'Un antivirus de la placa',
          'El programa base que inicia el hardware al encender el computador',
          'Un tipo de memoria RAM',
          'El sistema de enfriamiento',
        ],
        correcta: 1,
      },
      {
        texto: '¿Cuál es la diferencia principal entre un SSD y un disco duro HDD?',
        opciones: [
          'El SSD usa un plato giratorio',
          'El HDD no necesita energía',
          'El SSD no tiene partes móviles y suele ser más rápido',
          'El HDD es siempre más rápido que el SSD',
        ],
        correcta: 2,
      },
      {
        texto: '¿Qué ranura permite instalar un SSD pequeño con forma de tarjeta alargada?',
        opciones: ['Ranura M.2', 'Ranura DIMM', 'Puerto VGA', 'Conector de 24 pines'],
        correcta: 0,
      },
      {
        texto: '¿Qué es el VRM de una tarjeta madre?',
        opciones: [
          'Un puerto de video',
          'Una memoria de almacenamiento',
          'Un módulo regulador de voltaje que da energía estable al procesador',
          'Un ventilador de la caja',
        ],
        correcta: 2,
      },
      {
        texto: 'En un socket tipo LGA, ¿dónde están los pines de contacto?',
        opciones: [
          'En el procesador',
          'En el zócalo de la tarjeta madre',
          'En la memoria RAM',
          'En la fuente de poder',
        ],
        correcta: 1,
      },
    ],
  },
  {
    nombre: 'Avanzado',
    preguntas: [
      {
        texto: '¿Qué significa PCIe x16?',
        opciones: [
          'Una ranura con 16 puertos USB',
          'Una ranura PCI Express con 16 carriles de datos',
          'Una ranura para 16 GB de RAM',
          'Un conector de 16 pines de energía',
        ],
        correcta: 1,
      },
      {
        texto: '¿Qué ventaja ofrece el modo Dual Channel de la memoria RAM?',
        opciones: [
          'Duplica la capacidad en GB',
          'Enfría los módulos',
          'Aumenta el ancho de banda al usar dos módulos en canales distintos',
          'Permite usar el computador sin procesador',
        ],
        correcta: 2,
      },
      {
        texto: '¿Cuál de estos formatos de tarjeta madre es el más pequeño?',
        opciones: ['ATX', 'Micro-ATX', 'Mini-ITX', 'E-ATX'],
        correcta: 2,
      },
      {
        texto: '¿Qué indica el TDP de un procesador?',
        opciones: [
          'La velocidad de transferencia de datos',
          'El calor que el sistema de enfriamiento debe disipar',
          'La capacidad de la memoria caché',
          'El número de núcleos',
        ],
        correcta: 1,
      },
      {
        texto: '¿Qué interfaz usan los SSD NVMe para comunicarse con la tarjeta madre?',
        opciones: ['PCI Express (PCIe)', 'VGA', 'PS/2', 'IDE'],
        correcta: 0,
      },
      {
        texto: '¿Por qué debe coincidir el socket de la tarjeta madre con el del procesador?',
        opciones: [
          'Solo por el color',
          'Porque cada socket tiene una disposición de contactos distinta',
          'Porque cambia el nombre del chipset',
          'No importa, todos son iguales',
        ],
        correcta: 1,
      },
      {
        texto: '¿Para qué sirve el conector del panel frontal de la tarjeta madre?',
        opciones: [
          'Conectar el botón de encendido y las luces de la caja',
          'Conectar el procesador',
          'Instalar la memoria RAM',
          'Conectar la tarjeta gráfica',
        ],
        correcta: 0,
      },
      {
        texto: '¿Qué pasa con la información de la RAM cuando se apaga el computador?',
        opciones: [
          'Se guarda para siempre',
          'Pasa automáticamente al procesador',
          'Se copia a la BIOS',
          'Se pierde, porque es memoria volátil',
        ],
        correcta: 3,
      },
    ],
  },
];