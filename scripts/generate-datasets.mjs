// Generador de datasets ficticios para la masterclass EAFIT
// Ejecutar: node scripts/generate-datasets.mjs

import * as XLSX from 'xlsx';
import { mkdirSync } from 'fs';
import { join } from 'path';

const OUT = join(process.cwd(), 'public', 'datos');
mkdirSync(OUT, { recursive: true });

// PRNG seedeado para reproducibilidad
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260429);
const rint = (a, b) => Math.floor(rand() * (b - a + 1)) + a;
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const rnorm = (mean, sd) => {
  const u = 1 - rand();
  const v = rand();
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

const PROGRAMAS = [
  { codigo: 'ADM', nombre: 'Administración de Negocios', escuela: 'Administración' },
  { codigo: 'ECO', nombre: 'Economía', escuela: 'Economía y Finanzas' },
  { codigo: 'FIN', nombre: 'Finanzas', escuela: 'Economía y Finanzas' },
  { codigo: 'CON', nombre: 'Contaduría Pública', escuela: 'Administración' },
  { codigo: 'DER', nombre: 'Derecho', escuela: 'Derecho' },
  { codigo: 'CPO', nombre: 'Ciencias Políticas', escuela: 'Humanidades' },
  { codigo: 'PSI', nombre: 'Psicología', escuela: 'Humanidades' },
  { codigo: 'COM', nombre: 'Comunicación Social', escuela: 'Humanidades' },
  { codigo: 'ISI', nombre: 'Ingeniería de Sistemas', escuela: 'Ingeniería' },
  { codigo: 'IME', nombre: 'Ingeniería Mecánica', escuela: 'Ingeniería' },
  { codigo: 'ICI', nombre: 'Ingeniería Civil', escuela: 'Ingeniería' },
  { codigo: 'IPR', nombre: 'Ingeniería de Producción', escuela: 'Ingeniería' },
  { codigo: 'IDS', nombre: 'Ingeniería de Diseño', escuela: 'Ingeniería' },
  { codigo: 'BIO', nombre: 'Biología', escuela: 'Ciencias Aplicadas' },
  { codigo: 'GEO', nombre: 'Geología', escuela: 'Ciencias Aplicadas' },
  { codigo: 'MUS', nombre: 'Música', escuela: 'Artes' },
];

const ESTRATOS = [1, 2, 3, 4, 5, 6];
const ESTRATO_W = [0.05, 0.12, 0.28, 0.30, 0.18, 0.07];
const GENEROS = ['F', 'M', 'NB'];
const MUNICIPIOS = ['Medellín', 'Envigado', 'Sabaneta', 'Itagüí', 'Bello', 'Rionegro', 'La Estrella', 'Caldas', 'Copacabana', 'Girardota', 'Bogotá D.C.', 'Cali', 'Barranquilla', 'Cartagena', 'Pereira', 'Manizales'];
const ESTADOS_ESTUDIANTE = ['Activo', 'Activo', 'Activo', 'Activo', 'En riesgo', 'Aplazado', 'Retirado', 'Graduado'];

function pickWeighted(values, weights) {
  const r = rand();
  let acc = 0;
  for (let i = 0; i < values.length; i++) {
    acc += weights[i];
    if (r <= acc) return values[i];
  }
  return values[values.length - 1];
}

// =============== 1. ESTUDIANTES ===============
function genEstudiantes() {
  const rows = [];
  const NOMBRES_F = ['María','Sofía','Valentina','Camila','Isabella','Manuela','Laura','Daniela','Mariana','Antonia','Sara','Juliana','Salomé','Emilia','Luciana','Catalina','Andrea','Paulina','Natalia','Gabriela'];
  const NOMBRES_M = ['Santiago','Mateo','Sebastián','Samuel','Daniel','Nicolás','Juan','Tomás','Andrés','Felipe','Emiliano','Martín','David','Alejandro','Simón','Diego','Camilo','Esteban','Pablo','Gabriel'];
  const APELLIDOS = ['Jiménez','Restrepo','Ortiz','Gómez','Rodríguez','García','Martínez','López','Hernández','Pérez','Sánchez','Ramírez','Torres','Flores','Rivera','Mejía','Arango','Botero','Echeverri','Gaviria','Vélez','Cardona','Ospina','Henao','Toro','Salazar','Uribe','Quintero','Zuluaga','Ríos'];

  for (let i = 1; i <= 5000; i++) {
    const programa = pick(PROGRAMAS);
    const semestre = rint(1, 10);
    const estrato = pickWeighted(ESTRATOS, ESTRATO_W);
    const genero = pickWeighted(GENEROS, [0.52, 0.46, 0.02]);
    const nombres = genero === 'F' ? pick(NOMBRES_F) : genero === 'M' ? pick(NOMBRES_M) : pick([...NOMBRES_F, ...NOMBRES_M]);
    const ap1 = pick(APELLIDOS);
    const ap2 = pick(APELLIDOS);
    const edad = clamp(Math.floor(rnorm(20 + semestre * 0.3, 2)), 16, 35);
    // promedio influido por estrato (proxy débil) y semestre
    const promBase = rnorm(3.7 + (estrato - 3) * 0.05, 0.45);
    const promedio = clamp(round(promBase, 2), 1.5, 5.0);
    // beca correlacionada con estrato bajo y promedio alto
    const becaProb = (estrato <= 3 ? 0.35 : 0.10) + (promedio > 4.0 ? 0.20 : 0);
    const beca = rand() < becaProb ? pick(['Quiero Estudiar','Generación E','Excelencia EAFIT','Talento Antioqueño','Sapiencia']) : 'Sin beca';
    const creditos_aprobados = rint(Math.max(0, semestre * 14 - 8), semestre * 16);
    const creditos_perdidos = rint(0, Math.max(0, semestre * 2 - Math.floor(promedio * 1.5)));
    // riesgo deserción: bajo promedio + bajos créditos + estrato bajo
    const riesgoScore = (5 - promedio) * 25 + creditos_perdidos * 4 + (estrato <= 2 ? 10 : 0) + rint(0, 15);
    const riesgo_desercion = riesgoScore > 55 ? 'Alto' : riesgoScore > 35 ? 'Medio' : 'Bajo';
    const estado = riesgo_desercion === 'Alto' && rand() < 0.25 ? pick(['Retirado','Aplazado']) : pickWeighted(ESTADOS_ESTUDIANTE, [0.20, 0.20, 0.20, 0.20, 0.08, 0.05, 0.04, 0.03]);
    rows.push({
      id_estudiante: `EAF-${String(i).padStart(5, '0')}`,
      nombres,
      apellido_1: ap1,
      apellido_2: ap2,
      documento: `1${rint(10000000, 99999999)}`,
      correo: `${nombres.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}.${ap1.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}@eafit.edu.co`,
      genero,
      edad,
      estrato,
      municipio_residencia: pick(MUNICIPIOS),
      programa_codigo: programa.codigo,
      programa_nombre: programa.nombre,
      escuela: programa.escuela,
      semestre_actual: semestre,
      promedio_acumulado: promedio,
      creditos_aprobados,
      creditos_perdidos,
      tipo_beca: beca,
      riesgo_desercion,
      estado_matricula: estado,
      fecha_ingreso: `20${String(26 - Math.ceil(semestre / 2) - rint(0, 1)).padStart(2,'0')}-${pick(['01','07'])}-15`,
    });
  }
  return rows;
}

// =============== 2. EVALUACIÓN DOCENTE ===============
function genEvalDocente() {
  const rows = [];
  const NOMBRES = ['Carlos','Ana','Luis','María','Jorge','Patricia','Andrés','Beatriz','Fernando','Claudia','Ricardo','Mónica','Rodrigo','Laura','Pablo','Cristina','Gustavo','Marcela','Alberto','Olga'];
  const APELLIDOS = ['Mejía','Arango','Botero','Echeverri','Restrepo','Vélez','Cardona','Ospina','Henao','Toro','Salazar','Uribe','Quintero','Zuluaga','Ríos','Jaramillo','Posada','Villegas','Yepes','Gallego'];
  const TIPO_VINCULACION = ['Tiempo Completo','Tiempo Completo','Medio Tiempo','Cátedra','Cátedra','Cátedra'];
  const SEMESTRES = ['2023-1','2023-2','2024-1','2024-2','2025-1','2025-2'];
  for (let p = 1; p <= 500; p++) {
    const programa = pick(PROGRAMAS);
    const profesor = `${pick(NOMBRES)} ${pick(APELLIDOS)} ${pick(APELLIDOS)}`;
    const tipo = pick(TIPO_VINCULACION);
    const baseQuality = clamp(rnorm(4.2, 0.4), 2.5, 5.0);
    for (const sem of SEMESTRES) {
      const drift = rnorm(0, 0.15);
      const dominio = clamp(round(baseQuality + drift + rnorm(0, 0.2), 2), 1, 5);
      const claridad = clamp(round(baseQuality + drift + rnorm(0, 0.25), 2), 1, 5);
      const metodologia = clamp(round(baseQuality + drift + rnorm(0, 0.3), 2), 1, 5);
      const evaluacion = clamp(round(baseQuality + drift + rnorm(0, 0.25), 2), 1, 5);
      const respeto = clamp(round(baseQuality + drift + rnorm(0, 0.18), 2), 1, 5);
      const puntualidad = clamp(round(baseQuality + drift + rnorm(0, 0.22), 2), 1, 5);
      const motivacion = clamp(round(baseQuality + drift + rnorm(0, 0.28), 2), 1, 5);
      const retroalimentacion = clamp(round(baseQuality + drift + rnorm(0, 0.3), 2), 1, 5);
      const promedio = round((dominio + claridad + metodologia + evaluacion + respeto + puntualidad + motivacion + retroalimentacion) / 8, 2);
      rows.push({
        id_profesor: `PROF-${String(p).padStart(4, '0')}`,
        nombre_profesor: profesor,
        tipo_vinculacion: tipo,
        programa_codigo: programa.codigo,
        programa_nombre: programa.nombre,
        semestre: sem,
        n_estudiantes_evaluadores: rint(8, 45),
        dim_dominio_disciplinar: dominio,
        dim_claridad_explicacion: claridad,
        dim_metodologia: metodologia,
        dim_evaluacion_aprendizaje: evaluacion,
        dim_respeto_estudiantes: respeto,
        dim_puntualidad: puntualidad,
        dim_motivacion: motivacion,
        dim_retroalimentacion: retroalimentacion,
        promedio_evaluacion: promedio,
        categoria: promedio >= 4.5 ? 'Sobresaliente' : promedio >= 4.0 ? 'Satisfactorio' : promedio >= 3.5 ? 'Aceptable' : 'Requiere mejora',
      });
    }
  }
  return rows;
}

// =============== 3. SABER PRO ===============
function genSaberPro() {
  const rows = [];
  const COMPETENCIAS = ['Lectura crítica', 'Razonamiento cuantitativo', 'Comunicación escrita', 'Inglés', 'Competencias ciudadanas'];
  const ANIOS = [2021, 2022, 2023, 2024, 2025];
  for (const programa of PROGRAMAS) {
    for (const anio of ANIOS) {
      // competencias específicas según escuela (simulado)
      const baseProg = programa.escuela === 'Ingeniería' ? 165 : programa.escuela === 'Ciencias Aplicadas' ? 168 : 158;
      const drift = rnorm(0, 4) + (anio - 2023) * 1.5;
      for (const comp of COMPETENCIAS) {
        const ajuste = comp === 'Razonamiento cuantitativo' && programa.escuela === 'Ingeniería' ? 8 : comp === 'Lectura crítica' && programa.escuela === 'Humanidades' ? 6 : 0;
        const puntaje_eafit = round(rnorm(baseProg + ajuste + drift, 5), 1);
        const puntaje_nacional = round(rnorm(150, 3), 1);
        const puntaje_grupo_referencia = round(rnorm(155 + ajuste * 0.4, 4), 1);
        rows.push({
          anio,
          programa_codigo: programa.codigo,
          programa_nombre: programa.nombre,
          escuela: programa.escuela,
          competencia: comp,
          n_evaluados: rint(35, 220),
          puntaje_promedio_eafit: puntaje_eafit,
          puntaje_promedio_nacional: puntaje_nacional,
          puntaje_promedio_grupo_referencia: puntaje_grupo_referencia,
          desviacion_estandar: round(rnorm(15, 2), 2),
          percentil_nacional: clamp(Math.round(50 + (puntaje_eafit - puntaje_nacional) * 1.8), 1, 99),
          quintil: clamp(Math.ceil((50 + (puntaje_eafit - puntaje_nacional) * 1.8) / 20), 1, 5),
        });
      }
    }
  }
  return rows;
}

// =============== 4. HOMOLOGACIONES ===============
function genHomologaciones() {
  const rows = [];
  const ORIGENES = ['Universidad de Antioquia','Universidad Nacional','Universidad Javeriana','Universidad de los Andes','Universidad del Norte','Universidad ICESI','Universidad Pontificia Bolivariana','Universidad de La Sabana','Tecnológico de Antioquia','Universidad CES','Politécnico Jaime Isaza Cadavid','Universidad Externado','Universidad del Rosario','Universidad EAN','MIT','Stanford University','Universidad de Salamanca','Tec de Monterrey','Universidad Católica de Chile','Sciences Po'];
  const TIPOS = ['Transferencia interna','Transferencia externa','Movilidad académica','Reingreso','Doble titulación'];
  const ESTADOS = ['Aprobada','Aprobada','Aprobada','Aprobada','Rechazada','En revisión','Aprobada parcial'];
  const MATERIAS = ['Cálculo Diferencial','Cálculo Integral','Álgebra Lineal','Microeconomía','Macroeconomía','Contabilidad Financiera','Derecho Constitucional','Programación I','Estructuras de Datos','Estadística Descriptiva','Investigación de Operaciones','Mercadeo Estratégico','Finanzas Corporativas','Comportamiento Organizacional','Ética','Comunicación Oral','Inglés Intermedio','Física I','Química General','Termodinámica','Mecánica de Fluidos','Diseño Industrial','Psicología General','Métodos Cuantitativos','Análisis de Datos','Big Data','Aprendizaje Automático','Liderazgo','Innovación','Gestión de Proyectos'];
  for (let i = 1; i <= 1200; i++) {
    const fecha_solicitud = new Date(2024, rint(0, 11), rint(1, 28));
    const tipo = pick(TIPOS);
    const estado = pickWeighted(ESTADOS, [0.32, 0.18, 0.10, 0.08, 0.10, 0.12, 0.10]);
    const dias_resolucion = estado === 'En revisión' ? null : rint(3, 90);
    const programa = pick(PROGRAMAS);
    const n_materias = rint(1, 8);
    const aprobadas = estado === 'Aprobada' ? n_materias : estado === 'Aprobada parcial' ? rint(1, n_materias - 1) : 0;
    rows.push({
      id_solicitud: `HOM-2024-${String(i).padStart(5, '0')}`,
      id_estudiante: `EAF-${String(rint(1, 5000)).padStart(5, '0')}`,
      tipo_solicitud: tipo,
      institucion_origen: pick(ORIGENES),
      programa_destino_codigo: programa.codigo,
      programa_destino_nombre: programa.nombre,
      n_materias_solicitadas: n_materias,
      n_materias_aprobadas: aprobadas,
      materia_ejemplo: pick(MATERIAS),
      estado: estado,
      fecha_solicitud: fecha_solicitud.toISOString().slice(0, 10),
      dias_resolucion,
      cumple_sla_30dias: dias_resolucion !== null ? (dias_resolucion <= 30 ? 'Sí' : 'No') : 'Pendiente',
      revisor_codigo: `REV-${String(rint(1, 18)).padStart(3, '0')}`,
      observaciones: estado === 'Rechazada' ? pick(['Contenido no equivalente','Faltan soportes','Calificación insuficiente','Materia obsoleta','Programa no acreditado']) : '',
    });
  }
  return rows;
}

// =============== 5. TRABAJOS DE GRADO ===============
function genTrabajosGrado() {
  const rows = [];
  const LINEAS = {
    Ingeniería: ['Inteligencia Artificial','Energías sostenibles','Industria 4.0','Smart cities','Ciberseguridad','Robótica','Bioingeniería'],
    Administración: ['Estrategia y competitividad','Innovación','Emprendimiento','Mercadeo digital','Gestión humana','Cadena de suministro'],
    'Economía y Finanzas': ['Macroeconomía aplicada','Finanzas corporativas','Mercados de capitales','Economía del comportamiento','Política monetaria'],
    Humanidades: ['Estudios culturales','Comunicación política','Psicología organizacional','Salud mental','Educación'],
    Derecho: ['Derecho constitucional','Derecho de las TIC','Derecho penal económico','Derechos humanos','Derecho ambiental'],
    'Ciencias Aplicadas': ['Biotecnología','Geociencias aplicadas','Medio ambiente','Conservación','Ciencias del clima'],
    Artes: ['Composición contemporánea','Estudios musicales','Producción sonora'],
  };
  const MODALIDADES = ['Investigación','Proyecto aplicado','Pasantía','Doble titulación','Práctica profesional'];
  const ESTADOS = ['Aprobado','Aprobado','Aprobado con honores','En curso','Reprobado','Aplazado'];
  for (let i = 1; i <= 800; i++) {
    const programa = pick(PROGRAMAS);
    const lineas = LINEAS[programa.escuela] || ['General'];
    const linea = pick(lineas);
    const meses = rint(2, 14);
    const calif = clamp(round(rnorm(4.1, 0.5), 2), 2.0, 5.0);
    const estado = calif >= 4.7 ? 'Aprobado con honores' : calif >= 3.0 ? pickWeighted(ESTADOS, [0.30, 0.30, 0.05, 0.20, 0.05, 0.10]) : 'Reprobado';
    rows.push({
      id_trabajo: `TG-2025-${String(i).padStart(5, '0')}`,
      id_estudiante: `EAF-${String(rint(1, 5000)).padStart(5, '0')}`,
      programa_codigo: programa.codigo,
      programa_nombre: programa.nombre,
      linea_investigacion: linea,
      modalidad: pick(MODALIDADES),
      asesor: `${pick(['Dr.','Dra.','Mg.','Ph.D.'])} ${pick(['Carlos','Ana','Luis','María','Jorge','Patricia'])} ${pick(['Mejía','Arango','Botero','Echeverri','Restrepo','Vélez'])}`,
      titulo: pick(['Análisis de','Modelo predictivo de','Estudio comparativo en','Diseño de','Evaluación de impacto en','Marco metodológico para','Caracterización de']) + ' ' + linea.toLowerCase() + ' aplicado a ' + pick(['el sector empresarial colombiano','política pública','tecnologías emergentes','contexto educativo','sector salud','PYMES antioqueñas']),
      duracion_meses: meses,
      calificacion: estado === 'En curso' || estado === 'Aplazado' ? null : calif,
      estado,
      fecha_inicio: `2025-${String(rint(1, 8)).padStart(2,'0')}-${String(rint(1, 28)).padStart(2,'0')}`,
      publicacion_derivada: estado === 'Aprobado con honores' && rand() < 0.4 ? 'Sí' : 'No',
    });
  }
  return rows;
}

// =============== 6. SERVICIOS TRANSVERSALES ===============
function genServiciosTransversales() {
  const rows = [];
  const SERVICIOS = [
    { tipo: 'Homologación', sla: 30 },
    { tipo: 'Reingreso', sla: 20 },
    { tipo: 'Cambio de programa', sla: 25 },
    { tipo: 'Doble programa', sla: 35 },
    { tipo: 'Reserva de cupo', sla: 10 },
    { tipo: 'Constancia académica', sla: 5 },
    { tipo: 'Certificado de notas', sla: 7 },
    { tipo: 'Validación por suficiencia', sla: 25 },
    { tipo: 'Movilidad internacional', sla: 45 },
    { tipo: 'Asesoría académica', sla: 3 },
    { tipo: 'Plan de mejoramiento', sla: 15 },
    { tipo: 'Apelación de calificación', sla: 20 },
  ];
  const CANALES = ['Portal estudiantil','Correo','Presencial','Chatbot','Aplicación móvil'];
  for (let i = 1; i <= 2400; i++) {
    const servicio = pick(SERVICIOS);
    const canal = pickWeighted(CANALES, [0.55, 0.18, 0.10, 0.12, 0.05]);
    const tiempo_real = Math.max(1, Math.round(rnorm(servicio.sla * 0.8, servicio.sla * 0.4)));
    const cumple = tiempo_real <= servicio.sla;
    const satisfaccion = clamp(round(cumple ? rnorm(4.3, 0.5) : rnorm(3.2, 0.7), 1), 1, 5);
    rows.push({
      id_solicitud: `SVC-2025-${String(i).padStart(6, '0')}`,
      tipo_servicio: servicio.tipo,
      sla_dias: servicio.sla,
      canal_atencion: canal,
      id_estudiante: `EAF-${String(rint(1, 5000)).padStart(5, '0')}`,
      programa_codigo: pick(PROGRAMAS).codigo,
      tiempo_resolucion_dias: tiempo_real,
      cumple_sla: cumple ? 'Sí' : 'No',
      estado: rand() < 0.92 ? 'Cerrada' : pick(['En proceso','Escalada']),
      satisfaccion_1a5: satisfaccion,
      reabierta: rand() < 0.07 ? 'Sí' : 'No',
      fecha_apertura: `2025-${String(rint(1, 12)).padStart(2,'0')}-${String(rint(1, 28)).padStart(2,'0')}`,
    });
  }
  return rows;
}

// =============== 7. MATRÍCULA FINANCIERA ===============
function genMatriculaFinanciera() {
  const rows = [];
  const COHORTES = ['2024-1','2024-2','2025-1','2025-2','2026-1'];
  const TIPO_DESC = ['Sin descuento','Beca académica','Beca socioeconómica','Convenio empresa','Hijo egresado','Hermanos','Crédito ICETEX','Crédito SUFI','Crédito Pichincha','Pago anticipado'];
  for (let i = 1; i <= 4500; i++) {
    const programa = pick(PROGRAMAS);
    const cohorte = pick(COHORTES);
    const valor_base = round(rnorm(programa.escuela === 'Ingeniería' ? 13800000 : programa.escuela === 'Derecho' ? 13200000 : 12400000, 600000), 0);
    const tipo_desc = pickWeighted(TIPO_DESC, [0.35, 0.10, 0.08, 0.05, 0.04, 0.02, 0.18, 0.08, 0.05, 0.05]);
    const pct_desc = tipo_desc === 'Sin descuento' ? 0 : tipo_desc.includes('Beca') ? rint(20, 100) : tipo_desc.includes('Crédito') ? 0 : rint(5, 30);
    const valor_pagado = Math.round(valor_base * (1 - pct_desc / 100));
    const dias_mora = rand() < 0.18 ? rint(1, 90) : 0;
    const desercion_por_costo = pct_desc === 0 && dias_mora > 30 && rand() < 0.30 ? 'Sí' : 'No';
    rows.push({
      id_matricula: `MAT-${cohorte}-${String(i).padStart(6, '0')}`,
      id_estudiante: `EAF-${String(rint(1, 5000)).padStart(5, '0')}`,
      cohorte,
      programa_codigo: programa.codigo,
      programa_nombre: programa.nombre,
      valor_matricula_base_cop: valor_base,
      tipo_descuento: tipo_desc,
      porcentaje_descuento: pct_desc,
      valor_pagado_cop: valor_pagado,
      dias_mora: dias_mora,
      estado_pago: dias_mora === 0 ? 'Al día' : dias_mora <= 30 ? 'Mora corta' : 'Mora prolongada',
      desercion_atribuida_costo: desercion_por_costo,
      financiacion_externa: tipo_desc.includes('Crédito') ? 'Sí' : 'No',
    });
  }
  return rows;
}

function saveXlsx(filename, rows, sheetName = 'Datos') {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  // Diccionario simple
  const dict = Object.keys(rows[0]).map((k) => ({
    campo: k,
    tipo: typeof rows[0][k] === 'number' ? 'Numérico' : 'Texto/Fecha',
    descripcion: 'Datos simulados para fines pedagógicos · Masterclass EAFIT 2026',
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(dict), 'Diccionario');
  // Nota de privacidad
  const nota = [{ aviso: 'DATOS 100% SIMULADOS · Generados por Masterclass EAFIT abril 2026 · Cualquier coincidencia con personas reales es casual.' }];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(nota), 'Aviso');
  XLSX.writeFile(wb, join(OUT, filename));
  console.log(`✓ ${filename} (${rows.length} filas)`);
}

// Selecciona muestra estratificada/aleatoria con tope de filas
function sample(rows, n) {
  if (rows.length <= n) return rows;
  const step = rows.length / n;
  const out = [];
  for (let i = 0; i < n; i++) out.push(rows[Math.floor(i * step)]);
  return out;
}

console.log('Generando datasets en', OUT);

// Versiones completas
const estudiantes = genEstudiantes();
const evalDocente = genEvalDocente();
const saberPro = genSaberPro();
const homologaciones = genHomologaciones();
const trabajosGrado = genTrabajosGrado();
const serviciosTransv = genServiciosTransversales();
const matriculaFin = genMatriculaFinanciera();

saveXlsx('estudiantes.xlsx', estudiantes, 'Estudiantes');
saveXlsx('evaluacion_docente.xlsx', evalDocente, 'Evaluación');
saveXlsx('saber_pro.xlsx', saberPro, 'Saber Pro');
saveXlsx('homologaciones.xlsx', homologaciones, 'Homologaciones');
saveXlsx('trabajos_grado.xlsx', trabajosGrado, 'Trabajos de Grado');
saveXlsx('servicios_transversales.xlsx', serviciosTransv, 'Servicios');
saveXlsx('matricula_financiera.xlsx', matriculaFin, 'Matrícula');

// Versiones rápidas (≤ 300 filas) para ejercicios en clase
console.log('\nGenerando versiones rápidas...');
const liteEstudiantes = sample(estudiantes, 300);
const liteEvalDocente = sample(evalDocente, 250);
const liteSaberPro = sample(saberPro, 100);
const liteHomologaciones = sample(homologaciones, 200);
const liteTrabajosGrado = sample(trabajosGrado, 150);
const liteServiciosTransv = sample(serviciosTransv, 250);
const liteMatriculaFin = sample(matriculaFin, 300);

saveXlsx('estudiantes_rapido.xlsx', liteEstudiantes, 'Estudiantes');
saveXlsx('evaluacion_docente_rapido.xlsx', liteEvalDocente, 'Evaluación');
saveXlsx('saber_pro_rapido.xlsx', liteSaberPro, 'Saber Pro');
saveXlsx('homologaciones_rapido.xlsx', liteHomologaciones, 'Homologaciones');
saveXlsx('trabajos_grado_rapido.xlsx', liteTrabajosGrado, 'Trabajos de Grado');
saveXlsx('servicios_transversales_rapido.xlsx', liteServiciosTransv, 'Servicios');
saveXlsx('matricula_financiera_rapido.xlsx', liteMatriculaFin, 'Matrícula');

// Bundles
const all = XLSX.utils.book_new();
const map = {
  estudiantes,
  evaluacion_docente: evalDocente,
  saber_pro: saberPro,
  homologaciones,
  trabajos_grado: trabajosGrado,
  servicios: serviciosTransv,
  matricula: matriculaFin,
};
for (const [name, rows] of Object.entries(map)) {
  XLSX.utils.book_append_sheet(all, XLSX.utils.json_to_sheet(rows), name.slice(0, 31));
}
XLSX.writeFile(all, join(OUT, 'masterclass-eafit-todos-los-datasets.xlsx'));
console.log('✓ masterclass-eafit-todos-los-datasets.xlsx (bundle completo)');

const allLite = XLSX.utils.book_new();
const liteMap = {
  estudiantes: liteEstudiantes,
  evaluacion_docente: liteEvalDocente,
  saber_pro: liteSaberPro,
  homologaciones: liteHomologaciones,
  trabajos_grado: liteTrabajosGrado,
  servicios: liteServiciosTransv,
  matricula: liteMatriculaFin,
};
for (const [name, rows] of Object.entries(liteMap)) {
  XLSX.utils.book_append_sheet(allLite, XLSX.utils.json_to_sheet(rows), name.slice(0, 31));
}
XLSX.writeFile(allLite, join(OUT, 'masterclass-eafit-rapido-todos.xlsx'));
console.log('✓ masterclass-eafit-rapido-todos.xlsx (bundle rápido)');

console.log('\nListo.');
