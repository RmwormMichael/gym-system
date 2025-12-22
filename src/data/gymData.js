// src/components/data/gymData.js
export const serviciosData = [
  {
    icon: '💪',
    title: 'Entrenamiento Personalizado',
    description: 'Programas diseñados específicamente para tus objetivos con seguimiento individualizado.',
    features: ['Evaluación inicial', 'Plan mensual', 'Ajustes semanales', 'Medición de progreso']
  },
  {
    icon: '👥',
    title: 'Clases Grupales',
    description: 'Más de 50 clases semanales incluyendo HIIT, Yoga, Spinning, Zumba y Cross Training.',
    features: ['Horarios flexibles', 'Instructores certificados', 'Equipo profesional', 'Comunidad activa']
  },
  {
    icon: '🏋️',
    title: 'Zona de Pesas Premium',
    description: 'Más de 100 máquinas de última generación y zona libre con equipo olímpico certificado.',
    features: ['Máquinas Hammer Strength', 'Pesas olímpicas', 'Área funcional', 'Asistencia técnica']
  }
];

export const planesData = [
  {
    tag: 'PARA PRINCIPIANTES',
    title: 'Plan Básico',
    price: '$1,499',
    period: '/mes',
    subtitle: 'Acceso limitado',
    features: [
      { text: 'Acceso zona de cardio', included: true },
      { text: 'Pesas libres básicas', included: true },
      { text: '3 clases grupales/semana', included: true },
      { text: 'Horario restringido', included: false },
      { text: 'Sin entrenador personal', included: false },
      { text: 'Sin área VIP', included: false }
    ],
    buttonText: 'Comenzar Ahora',
    isPopular: false
  },
  {
    tag: 'RECOMENDADO',
    title: 'Plan Premium',
    price: '$2,499',
    period: '/mes',
    subtitle: 'Acceso ilimitado',
    features: [
      { text: 'Acceso completo 24/7', included: true },
      { text: 'Todas las áreas del gimnasio', included: true },
      { text: 'Clases grupales ilimitadas', included: true },
      { text: '2 sesiones con entrenador', included: true },
      { text: 'Registro de progreso', included: true },
      { text: 'Acceso área VIP', included: true },
      { text: '1 invitado/mes', included: true },
      { text: 'Lockers premium', included: true }
    ],
    buttonText: '¡Quiero este Plan!',
    isPopular: true
  },
  {
    tag: 'PARA FAMILIAS',
    title: 'Plan Familiar',
    price: '$3,999',
    period: '/mes',
    subtitle: 'Hasta 4 personas',
    features: [
      { text: '4 membresías completas', included: true },
      { text: 'Acceso total 24/7', included: true },
      { text: 'Clases ilimitadas para todos', included: true },
      { text: '4 sesiones entrenador/mes', included: true },
      { text: 'Kids Club incluido', included: true },
      { text: 'Parking familiar', included: true },
      { text: 'Área social premium', included: true },
      { text: 'Descuento en suplementos', included: true }
    ],
    buttonText: 'Plan Familiar',
    isPopular: false
  }
];

export const horariosData = {
  regular: [
    { dia: 'Lunes - Viernes', hora: '5:00 AM - 11:00 PM', highlight: true },
    { dia: 'Sábados', hora: '6:00 AM - 10:00 PM' },
    { dia: 'Domingos', hora: '7:00 AM - 9:00 PM' },
    { dia: 'Festivos', hora: '8:00 AM - 6:00 PM' }
  ],
  clases: [
    { clase: 'HIIT', hora: '7:00 AM y 6:00 PM', nivel: 'Avanzado' },
    { clase: 'Yoga', hora: '8:00 AM y 7:00 PM', nivel: 'Todos los niveles' },
    { clase: 'Spinning', hora: '9:00 AM y 8:00 PM', nivel: 'Intermedio' },
    { clase: 'Cross Training', hora: '10:00 AM y 7:30 PM', nivel: 'Avanzado' },
    { clase: 'Zumba', hora: '6:00 PM', nivel: 'Principiante' }
  ]
};

export const contactoData = [
  { 
    icon: '📍', 
    title: 'Dirección', 
    content: 'Av. Fitness #789, Col. Deportiva<br />Ciudad Deportiva, CDMX, C.P. 07890', 
    sub: 'Entre Av. Olimpo y Calzada Zeus' 
  },
  { 
    icon: '📞', 
    title: 'Contacto', 
    content: 'Tel: (55) 1234-5678<br />WhatsApp: (55) 8765-4321<br />Email: info@irongym.mx', 
    sub: null 
  },
  { 
    icon: '🅿️', 
    title: 'Estacionamiento', 
    content: 'Contamos con estacionamiento gratuito para miembros', 
    sub: 'Capacidad para 200 autos' 
  }
];

export const statsData = [
  { number: '1500+', label: 'Miembros Activos' },
  { number: '25+', label: 'Entrenadores' },
  { number: '50+', label: 'Clases Semanales' },
  { number: '5', label: 'Estrellas Rating' }
];

export const footerData = {
  company: {
    name: 'IRON GYM',
    description: 'Transformando vidas a través del fitness desde 2010',
    social: ['facebook', 'instagram', 'twitter', 'youtube']
  },
  links: [
    {
      title: 'Enlaces Rápidos',
      links: ['Inicio', 'Servicios', 'Planes', 'Horarios', 'Ubicación']
    },
    {
      title: 'Servicios',
      links: ['Entrenamiento', 'Clases', 'Nutrición', 'Fisioterapia', 'Kids Club']
    },
    {
      title: 'Legal',
      links: ['Términos', 'Privacidad', 'Cookies', 'FAQ', 'Contacto']
    }
  ]
};

export const heroData = {
  title: 'TRANSFORMA TU',
  highlight: 'CUERPO',
  subtitle: 'Únete a la comunidad fitness más grande de la ciudad. <br />Equipo de primer nivel, entrenadores certificados y resultados garantizados.',
  buttons: [
    { text: '¡PRUEBA GRATIS 7 DÍAS!', primary: true },
    { text: 'VER PLANES', primary: false }
  ]
};