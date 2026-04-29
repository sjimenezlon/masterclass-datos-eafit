// Glosario de gestión y gobernanza de datos · 60 términos · actualizado mayo 2026

export type GlossaryEntry = {
  term: string;
  category:
    | 'Gobernanza'
    | 'Roles'
    | 'Calidad'
    | 'Arquitectura'
    | 'Almacenamiento'
    | 'Procesos'
    | 'Privacidad'
    | 'Analítica'
    | 'IA'
    | 'Regulación';
  short: string;
  long: string;
  example?: string;
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'Cultura del dato',
    category: 'Gobernanza',
    short: 'Hábito organizacional de tomar decisiones basadas en evidencia.',
    long: 'Conjunto de prácticas, valores y comportamientos que ponen al dato en el centro de la toma de decisiones. No es una herramienta, es un cambio de mentalidad sostenido por liderazgo, formación y rituales.',
    example: 'Antes de aprobar un nuevo programa, se revisan datos de demanda, deserción esperada y resultados Saber Pro de programas similares.',
  },
  {
    term: 'Gobernanza de datos',
    category: 'Gobernanza',
    short: 'Marco de roles, políticas y procesos para gestionar datos como activo.',
    long: 'Disciplina formal que define quién puede tomar qué decisiones sobre los datos, bajo qué reglas y con qué responsabilidades. Apoyada por estándares como DAMA-DMBOK2 e ISO/IEC 38505.',
  },
  {
    term: 'Data Owner',
    category: 'Roles',
    short: 'Responsable último del dato en una unidad de negocio.',
    long: 'Persona con autoridad para autorizar accesos, definir reglas de calidad y firmar la clasificación del dato. Suele ser director(a) de área (académica, financiera, etc.). No necesariamente sabe SQL.',
    example: 'El Director de Desarrollo Académico es Data Owner del dominio "Resultados de aprendizaje".',
  },
  {
    term: 'Data Steward',
    category: 'Roles',
    short: 'Custodio operativo: ejecuta las reglas del Data Owner.',
    long: 'Profesional que documenta, monitorea y mejora la calidad del dato día a día. Puente entre negocio y TI. Usa diccionarios, perfilado y tableros de calidad.',
  },
  {
    term: 'Data Custodian',
    category: 'Roles',
    short: 'TI que opera el almacenamiento, backup y seguridad.',
    long: 'Equipo técnico responsable de la infraestructura: bases de datos, accesos, cifrado, copias de seguridad. Implementa lo que el Data Owner decide.',
  },
  {
    term: 'Data Citizen',
    category: 'Roles',
    short: 'Cualquier persona que consume datos para su trabajo.',
    long: 'Empleado no especialista que necesita interpretar tableros, descargar reportes o pedir extracciones. La masa crítica de la cultura del dato vive aquí.',
  },
  {
    term: 'Chief Data Officer (CDO)',
    category: 'Roles',
    short: 'Cargo ejecutivo que lidera la estrategia de datos.',
    long: 'Reporta a presidencia o vicerrectoría. Responsable de monetizar el dato, garantizar cumplimiento y desarrollar talento analítico. En 2026 muchas universidades migran este rol a Chief Data & AI Officer.',
  },
  {
    term: 'Calidad de datos',
    category: 'Calidad',
    short: 'Aptitud del dato para el uso al que se destina.',
    long: 'Se mide en seis dimensiones DAMA: completitud, exactitud, consistencia, validez, unicidad y oportunidad. Sin calidad, los modelos de IA amplifican el error.',
  },
  {
    term: 'Completitud',
    category: 'Calidad',
    short: 'Porcentaje de campos no nulos sobre el total esperado.',
    long: 'Se calcula por columna o por registro. Un correo de estudiante en blanco para un estudiante activo es un fallo de completitud.',
  },
  {
    term: 'Exactitud',
    category: 'Calidad',
    short: 'Cercanía del dato a la realidad que representa.',
    long: 'Un estudiante registrado en estrato 6 cuando en realidad es estrato 3 es un fallo de exactitud, no de completitud. Se valida cruzando con fuentes maestras.',
  },
  {
    term: 'Consistencia',
    category: 'Calidad',
    short: 'Mismo valor en todos los sistemas que lo replican.',
    long: 'Si Banner dice 4.2 y el data warehouse dice 4.3 para el mismo promedio, hay inconsistencia. Suele resolverse con una fuente única de la verdad (Single Source of Truth).',
  },
  {
    term: 'Validez',
    category: 'Calidad',
    short: 'El dato cumple las reglas del negocio.',
    long: 'Una calificación de 6.0 es invalida en escala 0-5. Se controla con dominios, expresiones regulares y restricciones de columna.',
  },
  {
    term: 'Unicidad',
    category: 'Calidad',
    short: 'Cada entidad existe una sola vez en el sistema.',
    long: 'Detectar y resolver duplicados. Un estudiante con dos IDs distintos rompe la unicidad y todas las métricas que dependen de contar personas.',
  },
  {
    term: 'Oportunidad',
    category: 'Calidad',
    short: 'El dato está disponible cuando se necesita.',
    long: 'Un reporte de deserción que llega en julio cuando la decisión se tomó en mayo es inoportuno. SLA de actualización es la métrica clave.',
  },
  {
    term: 'Linaje de datos (Data Lineage)',
    category: 'Arquitectura',
    short: 'Trazabilidad del recorrido de un dato desde origen a uso.',
    long: 'Mapa visual que muestra cómo un campo de una hoja Excel termina en un KPI de junta directiva, pasando por ETLs, joins y agregaciones. Crítico para auditoría e impacto al cambio.',
  },
  {
    term: 'Catálogo de datos',
    category: 'Arquitectura',
    short: 'Inventario buscable de todos los datasets de la organización.',
    long: 'Un Google de datos internos. Incluye descripción, dueño, frecuencia, calidad y ejemplo. Herramientas: Atlan, Alation, Collibra, OpenMetadata.',
  },
  {
    term: 'Diccionario de datos',
    category: 'Arquitectura',
    short: 'Definición canónica de cada campo, sus reglas y dominio.',
    long: 'Documento vivo que responde "¿qué significa exactamente promedio_acumulado?". Sin diccionario, dos áreas calculan el mismo indicador con definiciones distintas.',
  },
  {
    term: 'Master Data Management (MDM)',
    category: 'Arquitectura',
    short: 'Gestión centralizada de las entidades clave del negocio.',
    long: 'Estudiante, profesor, programa, asignatura: cada uno con un golden record único. Evita que TI, Académico y Financiera tengan tres versiones del mismo profesor.',
  },
  {
    term: 'ETL',
    category: 'Procesos',
    short: 'Extract, Transform, Load.',
    long: 'Patrón clásico: extraer del origen, transformar en un servidor intermedio, cargar al destino. Útil cuando la transformación es pesada y el destino es costoso.',
  },
  {
    term: 'ELT',
    category: 'Procesos',
    short: 'Extract, Load, Transform.',
    long: 'Patrón moderno: cargar todo al data warehouse y transformar dentro. Habilitado por motores SQL escalables (Snowflake, BigQuery). Es el estándar de facto en 2026.',
  },
  {
    term: 'Data Pipeline',
    category: 'Procesos',
    short: 'Flujo automatizado que mueve datos entre sistemas.',
    long: 'Secuencia de pasos versionada en código. Herramientas en 2026: dbt, Airflow, Dagster, Prefect. Idealmente declarativo, idempotente y observable.',
  },
  {
    term: 'Data Warehouse',
    category: 'Almacenamiento',
    short: 'Base de datos optimizada para análisis y reportería.',
    long: 'Estructurada, modelada (estrella o copo de nieve), histórica. Snowflake, BigQuery, Redshift, Databricks SQL Warehouse son los líderes en 2026.',
  },
  {
    term: 'Data Lake',
    category: 'Almacenamiento',
    short: 'Repositorio de datos crudos en su formato original.',
    long: 'Acepta CSV, JSON, imágenes, audio, video, PDF. Sobre object storage como S3, ADLS o GCS. Útil para data science y ML, peligroso sin gobernanza (se vuelve "data swamp").',
  },
  {
    term: 'Lakehouse',
    category: 'Almacenamiento',
    short: 'Híbrido: data lake con capacidades ACID de warehouse.',
    long: 'Arquitectura ganadora 2024-2026 (Databricks, Iceberg, Delta Lake). Permite ML y BI sobre el mismo storage sin duplicar datos. Costo más bajo que warehouse puro.',
  },
  {
    term: 'Data Mesh',
    category: 'Arquitectura',
    short: 'Datos como productos descentralizados por dominio.',
    long: 'Filosofía 2019-2026: cada dominio (académico, financiero, gestión humana) publica sus propios "data products" con SLAs, en vez de depender de un equipo central. Federa la gobernanza.',
  },
  {
    term: 'Data Fabric',
    category: 'Arquitectura',
    short: 'Capa unificada que conecta datos sin moverlos.',
    long: 'Tejido virtual con metadatos activos que enrutan consultas a los sistemas correctos. Complementa al Data Mesh; la diferencia es organizacional vs tecnológica.',
  },
  {
    term: 'Big Data',
    category: 'Analítica',
    short: 'Datos cuyo volumen, velocidad o variedad rebasan herramientas tradicionales.',
    long: 'Las 5V: Volumen, Velocidad, Variedad, Veracidad, Valor. En 2026 muchos casos "big data" se resuelven con DuckDB en un portátil; el término sobrevive como concepto.',
  },
  {
    term: 'Streaming de datos',
    category: 'Procesos',
    short: 'Procesamiento de datos en tiempo real.',
    long: 'Eventos que se procesan en milisegundos: Kafka, Kinesis, Pub/Sub, Flink. Ideal para detección de fraude, monitoreo de plataformas educativas, analítica del comportamiento online.',
  },
  {
    term: 'OLAP',
    category: 'Analítica',
    short: 'Online Analytical Processing.',
    long: 'Consultas que recorren millones de filas para responder preguntas agregadas. Complementario a OLTP (transaccional). Cubos OLAP o motores columnares modernos.',
  },
  {
    term: 'KPI',
    category: 'Analítica',
    short: 'Key Performance Indicator: métrica accionable de éxito.',
    long: 'Debe cumplir SMART: Específico, Medible, Alcanzable, Relevante, Temporal. Tasa de retención semestre 1-2 es un KPI; "número de estudiantes" es solo una métrica.',
  },
  {
    term: 'OKR',
    category: 'Analítica',
    short: 'Objectives and Key Results.',
    long: 'Objetivo cualitativo + 3-5 resultados clave cuantitativos. Originario de Intel/Google. Útil para alinear iniciativas analíticas con resultados de negocio trimestralmente.',
  },
  {
    term: 'Tablero (Dashboard)',
    category: 'Analítica',
    short: 'Vista visual de KPIs con filtros y desagregaciones.',
    long: 'Power BI, Tableau, Looker, Metabase, Streamlit. Un buen tablero responde 3 preguntas en 5 segundos. Si requiere capacitación, falló el diseño.',
  },
  {
    term: 'Dato accionable',
    category: 'Analítica',
    short: 'El que cambia una decisión.',
    long: 'Si después de ver el dato nadie hace nada distinto, no es accionable: es decoración. Test rápido: "¿qué decisión cambia este número?".',
  },
  {
    term: 'Vanity metric',
    category: 'Analítica',
    short: 'Métrica que infla el ego sin mover el negocio.',
    long: 'Ejemplo: "número total de visitas a la web". Se ve bien en una junta pero no informa decisiones. Reemplazar por tasa de conversión o tiempo en contenido.',
  },
  {
    term: 'PII (Información Personal Identificable)',
    category: 'Privacidad',
    short: 'Cualquier dato que identifica a una persona.',
    long: 'Documento, correo, teléfono, foto, biometría. Requiere cifrado en tránsito y reposo, control de acceso y registro de auditoría. En Colombia: regulado por Ley 1581/2012.',
  },
  {
    term: 'Datos sensibles',
    category: 'Privacidad',
    short: 'Subconjunto de PII con protección reforzada.',
    long: 'Salud, orientación sexual, datos biométricos, opinión política, religión, origen étnico. La Ley 1581 prohíbe su tratamiento salvo excepciones. Riesgo alto = sanciones de hasta 2.000 SMLMV.',
  },
  {
    term: 'Habeas Data',
    category: 'Regulación',
    short: 'Derecho fundamental a conocer, actualizar y rectificar datos personales.',
    long: 'En Colombia consagrado en Ley 1581 de 2012 y Decreto 1377 de 2013. Toda persona puede pedir copia y borrado de sus datos a cualquier organización que los trate.',
  },
  {
    term: 'GDPR',
    category: 'Regulación',
    short: 'Regulación europea de protección de datos.',
    long: 'Aplica a EAFIT cuando trata datos de ciudadanos UE (estudiantes de intercambio, alumni). Multas hasta 4% de ingresos globales o 20M EUR. Estándar de referencia mundial.',
  },
  {
    term: 'Ley 1581 de 2012',
    category: 'Regulación',
    short: 'Régimen general de protección de datos personales en Colombia.',
    long: 'Define principios (finalidad, libertad, veracidad, seguridad), derechos del titular y deberes del responsable. Vigilada por la SIC. Reglamentada por Decreto 1377/2013.',
  },
  {
    term: 'Anonimización',
    category: 'Privacidad',
    short: 'Romper el vínculo entre dato y persona de forma irreversible.',
    long: 'A diferencia de la pseudonimización, no se puede revertir. Técnicas: k-anonymity, l-diversity, differential privacy. En analítica académica permite compartir datasets sin riesgo.',
  },
  {
    term: 'Pseudonimización',
    category: 'Privacidad',
    short: 'Reemplazar identificadores por seudónimos reversibles.',
    long: 'Por ejemplo, sustituir documento por hash con sal. Permite re-identificación si se accede a la tabla de equivalencias. No exime de la regulación de datos personales.',
  },
  {
    term: 'Differential Privacy',
    category: 'Privacidad',
    short: 'Inyectar ruido matemático para impedir re-identificación.',
    long: 'Garantía formal: el resultado de una consulta no cambia perceptiblemente con o sin un individuo. Adoptada por US Census 2020 y herramientas como TensorFlow Privacy.',
  },
  {
    term: 'Cifrado en reposo',
    category: 'Privacidad',
    short: 'Datos cifrados mientras están almacenados.',
    long: 'AES-256 es el estándar. Las nubes (AWS, Azure, GCP) lo aplican por defecto desde 2022. Combinar con cifrado en tránsito (TLS 1.3) y a nivel de campo para datos sensibles.',
  },
  {
    term: 'Data Loss Prevention (DLP)',
    category: 'Privacidad',
    short: 'Tecnología que detecta y bloquea fuga de datos sensibles.',
    long: 'Inspecciona correos, archivos compartidos y descargas. Alerta si alguien adjunta una hoja con cédulas sin cifrar. Microsoft Purview y Google Workspace DLP en 2026.',
  },
  {
    term: 'Privacy by Design',
    category: 'Privacidad',
    short: 'Privacidad como requisito desde la concepción del sistema.',
    long: 'Siete principios de Ann Cavoukian. La privacidad no se "agrega" al final; se diseña desde la arquitectura, las pantallas y los flujos. Exigida por GDPR.',
  },
  {
    term: 'Machine Learning (ML)',
    category: 'IA',
    short: 'Algoritmos que aprenden patrones desde datos sin reglas explícitas.',
    long: 'Predicción de deserción, clasificación de homologaciones, recomendación de cursos. Se entrena con datos históricos y se evalúa con métricas (accuracy, F1, AUC).',
  },
  {
    term: 'Deep Learning',
    category: 'IA',
    short: 'ML basado en redes neuronales profundas.',
    long: 'Capas múltiples que aprenden representaciones jerárquicas. Base de modelos modernos de visión, NLP y multimodales. Requiere mucho dato y cómputo (GPU/TPU).',
  },
  {
    term: 'LLM (Large Language Model)',
    category: 'IA',
    short: 'Modelo masivo de lenguaje natural pre-entrenado.',
    long: 'Claude Opus 4.7, GPT-5, Gemini 2.5 Ultra, Llama 4. En 2026 procesan texto, imagen, video, audio y código. Se especializan vía RAG, fine-tuning o prompting.',
  },
  {
    term: 'RAG (Retrieval Augmented Generation)',
    category: 'IA',
    short: 'LLM que consulta una base de conocimiento antes de responder.',
    long: 'Embebe documentos institucionales en un vector store y los inyecta en el contexto. Reduce alucinaciones y permite respuestas con citación. Patrón estándar 2024-2026.',
  },
  {
    term: 'Embedding',
    category: 'IA',
    short: 'Vector numérico que representa significado semántico.',
    long: 'Texto similar produce vectores cercanos. Permite búsqueda semántica, clustering de comentarios de evaluación docente, detección de duplicados conceptuales.',
  },
  {
    term: 'Vector store',
    category: 'IA',
    short: 'Base de datos especializada en búsqueda por similitud.',
    long: 'Pinecone, Weaviate, Qdrant, pgvector. Indexa embeddings y devuelve los k más cercanos. Núcleo técnico del RAG y de la búsqueda en lenguaje natural.',
  },
  {
    term: 'Sesgo algorítmico (Bias)',
    category: 'IA',
    short: 'Desigualdad sistemática inducida por los datos de entrenamiento.',
    long: 'Si históricamente las becas se otorgaron desproporcionadamente a un género, el modelo lo reproducirá. Mitigación: auditorías de fairness, reweighing, datasets balanceados.',
  },
  {
    term: 'IA explicable (XAI)',
    category: 'IA',
    short: 'Capacidad de justificar la decisión de un modelo.',
    long: 'SHAP, LIME, atribución de atención. En contextos académicos y financieros, una decisión que afecta a una persona no puede ser una caja negra. Exigido por la Ley de IA UE 2024.',
  },
  {
    term: 'NIST AI RMF',
    category: 'Regulación',
    short: 'Marco voluntario de gestión de riesgos de IA del NIST (EE.UU.).',
    long: 'Cuatro funciones: Govern, Map, Measure, Manage. Referencia internacional 2023+. Combinable con ISO/IEC 42001 (sistema de gestión de IA) certificable desde 2024.',
  },
  {
    term: 'ISO/IEC 42001',
    category: 'Regulación',
    short: 'Estándar internacional de sistemas de gestión de IA.',
    long: 'Publicado dic 2023. Análogo a ISO 27001 pero para IA. Exige política, evaluación de impacto, controles de ciclo de vida. Primera certificación universitaria en LatAm: 2025.',
  },
  {
    term: 'Ley de IA Unión Europea',
    category: 'Regulación',
    short: 'AI Act: regulación basada en riesgos publicada en 2024.',
    long: 'Clasifica sistemas en prohibidos, alto riesgo, riesgo limitado y mínimo. IA en educación (selección, evaluación) es ALTO RIESGO. Aplica extraterritorialmente desde 2026.',
  },
  {
    term: 'Data product',
    category: 'Arquitectura',
    short: 'Conjunto de datos tratado como producto: tiene dueño, SLA y consumidores.',
    long: 'Concepto del Data Mesh. Por ejemplo "Riesgo de deserción semestral" es un producto con calidad declarada, frecuencia, responsable y contrato de uso. No es solo una tabla.',
  },
  {
    term: 'Data contract',
    category: 'Procesos',
    short: 'Acuerdo formal de schema y SLA entre productor y consumidor.',
    long: 'Versionado en código. Si el productor cambia un campo, debe coordinar con consumidores. Reduce roturas inesperadas en pipelines y dashboards. Tendencia 2024-2026.',
  },
  {
    term: 'Observabilidad de datos',
    category: 'Calidad',
    short: 'Monitoreo proactivo de salud de datasets en producción.',
    long: 'Detecta automáticamente caídas de volumen, drifts de distribución, llegadas tardías, schema changes. Monte Carlo, Soda, Bigeye, Elementary. Equivalente a APM para datos.',
  },
  {
    term: 'FAIR Data',
    category: 'Gobernanza',
    short: 'Findable, Accessible, Interoperable, Reusable.',
    long: 'Principios para datos científicos publicados en 2016. Estándar para repositorios de investigación, datos abiertos universitarios y sistemas de información de CTI.',
  },
  {
    term: 'Dato abierto',
    category: 'Gobernanza',
    short: 'Dato público que cualquier persona puede usar, modificar y redistribuir.',
    long: 'Licencia abierta + formato no propietario + URL estable. En Colombia: datos.gov.co. EAFIT puede publicar indicadores agregados manteniendo PII protegida.',
  },
  {
    term: 'Servidor maestro / Single Source of Truth',
    category: 'Arquitectura',
    short: 'Sistema designado como autoridad para una entidad o métrica.',
    long: 'Si Banner es la SSoT del estudiante, ningún otro sistema puede contradecirlo. Reduce conflictos entre áreas y simplifica auditoría. Necesita gobernanza para sostenerse.',
  },
];
