export type Achievement = {
  id: string;
  label: string;
  desc: string;
  icon: string;
  module: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    label: 'Primer paso',
    desc: 'Llegaste a la masterclass. Acaba de empezar lo bueno.',
    icon: '◉',
    module: '00',
  },
  {
    id: 'explorador',
    label: 'Explorador del ecosistema',
    desc: 'Recorriste 5 dominios del mapa académico.',
    icon: '✦',
    module: '01',
  },
  {
    id: 'viajero',
    label: 'Viajero del dato',
    desc: 'Acompañaste un dato en su viaje completo de 7 fases.',
    icon: '✈',
    module: '02',
  },
  {
    id: 'detective-privacidad',
    label: 'Detective de privacidad',
    desc: 'Clasificaste 15 campos por su sensibilidad.',
    icon: '⌖',
    module: '03',
  },
  {
    id: 'asignador',
    label: 'Asignador maestro',
    desc: 'Resolviste correctamente las 6 situaciones de roles.',
    icon: '⚖',
    module: '04',
  },
  {
    id: 'higienista',
    label: 'Higienista de datos',
    desc: 'Cazaste los 8 errores en la hoja sucia.',
    icon: '✧',
    module: '05',
  },
  {
    id: 'disenador',
    label: 'Diseñador visual',
    desc: 'Construiste tu primer gráfico con drag & drop.',
    icon: '◈',
    module: '06',
  },
  {
    id: 'calculista',
    label: 'Calculista de KPIs',
    desc: 'Moviste tres indicadores y leíste su impacto.',
    icon: '∑',
    module: '07',
  },
  {
    id: 'curador-cloud',
    label: 'Curador de la nube',
    desc: 'Subiste tu propio Excel y obtuviste su radiografía.',
    icon: '☁',
    module: '08',
  },
  {
    id: 'maestro-ia',
    label: 'Maestro de la IA',
    desc: 'Activaste los 4 demos de IA aplicada.',
    icon: '✸',
    module: '09',
  },
];
