// Estado y configuración
const STORAGE_KEYS = {
  students: 'gc_students',
  exercises: 'gc_exercises',
  roundMinutes: 'gc_round_minutes',
  rotationMinutes: 'gc_rotation_minutes',
  state: 'gc_state',
};

const DEFAULTS = {
  roundMinutes: 15,
  rotationMinutes: 2,
};

// Obtiene ejercicios desde el árbol de carpetas definido en el repositorio
// Los 12 ejercicios están definidos en la raíz del workspace; los enumeramos aquí.
const EXERCISES_FIXED = [
  '01_Calculadora_Propinas',
  '02_Generador_Paletas_Colores',
  '03_Validador_Contrasena',
  '04_Generador_Tarjetas_Perfil',
  '05_Reproductor_Musica',
  '06_Filtro_Productos',
  '07_Mini_Quiz_Interactivo',
  '08_Galeria_Imagenes',
  '09_Temporizador_Pomodoro',
  '10_Acordeon_FAQ',
  '11_Lista_Drag_Drop',
  '12_Previsualizador_Markdown',
];

// Utilidades
function saveLocal(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function loadLocal(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return (v === null || v === undefined) ? fallback : v; } catch { return fallback; }
}

function parseStudents(raw) {
  if (!raw) return [];
  const parts = raw
    .split(/\n|,/g)
    .map(s => s.trim())
    .filter(Boolean);
  const seen = new Set();
  const unique = [];
  for (const p of parts) {
    const key = p.toLowerCase();
    if (!seen.has(key)) { seen.add(key); unique.push(p); }
  }
  return unique;
}

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatMMSS(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Audio simple para aviso
function beep(frequency = 880, duration = 400, type = 'sine', volume = 0.3) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = frequency;
    o.connect(g);
    g.connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(volume, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration / 1000);
    o.start(now);
    o.stop(now + duration / 1000 + 0.02);
  } catch (e) { /* silencio si falla */ }
}

function urgentAlertFlash(on) {
  document.body.classList.toggle('flash-urgent', !!on);
}

function rotationAlertFlash(on) {
  document.body.classList.toggle('flash-rotation', !!on);
}

// Modelo en memoria
let appState = {
  roundNumber: 0,
  phase: 'idle', // 'idle' | 'round' | 'rotation' | 'paused'
  roundRemainingSec: 0,
  rotationRemainingSec: 0,
  pairs: [], // [{executor, documenter, exercise}]
  history: [], // [{round, assignments: [{exercise, executor, documenter}]}]
};

// DOM refs
const el = {
  roundTimer: document.getElementById('roundTimer'),
  rotationTimer: document.getElementById('rotationTimer'),
  roundNumber: document.getElementById('roundNumber'),
  studentsInput: document.getElementById('studentsInput'),
  saveStudentsBtn: document.getElementById('saveStudentsBtn'),
  pairBtn: document.getElementById('pairBtn'),
  roundMinutes: document.getElementById('roundMinutes'),
  rotationMinutes: document.getElementById('rotationMinutes'),
  saveTimesBtn: document.getElementById('saveTimesBtn'),
  startBtn: document.getElementById('startBtn'),
  pauseBtn: document.getElementById('pauseBtn'),
  resumeBtn: document.getElementById('resumeBtn'),
  exercisesList: document.getElementById('exercisesList'),
  assignmentsContainer: document.getElementById('assignmentsContainer'),
  exportCsvBtn: document.getElementById('exportCsvBtn'),
  exportJsonBtn: document.getElementById('exportJsonBtn'),
};

// Inicialización
function init() {
  // Cargar o setear tiempos
  const roundMin = loadLocal(STORAGE_KEYS.roundMinutes, DEFAULTS.roundMinutes);
  const rotationMin = loadLocal(STORAGE_KEYS.rotationMinutes, DEFAULTS.rotationMinutes);
  el.roundMinutes.value = roundMin;
  el.rotationMinutes.value = rotationMin;

  // Cargar estudiantes
  const savedStudents = loadLocal(STORAGE_KEYS.students, []);
  el.studentsInput.value = savedStudents.join('\n');

  // Cargar ejercicios (fijos) y persistir si no existen
  const savedExercises = loadLocal(STORAGE_KEYS.exercises, null);
  const exercises = savedExercises && Array.isArray(savedExercises) && savedExercises.length > 0
    ? savedExercises
    : EXERCISES_FIXED.slice();
  saveLocal(STORAGE_KEYS.exercises, exercises);
  renderExercises(exercises);

  // Cargar estado persistido
  const savedState = loadLocal(STORAGE_KEYS.state, null);
  if (savedState) {
    appState = { ...appState, ...savedState };
    // Recalcular timers (seguir donde iba)
    updateTimersUI();
    renderAssignments();
    updateControlsUI();
  }

  // Wiring eventos
  el.saveStudentsBtn.addEventListener('click', onSaveStudents);
  el.pairBtn.addEventListener('click', onGeneratePairs);
  el.saveTimesBtn.addEventListener('click', onSaveTimes);
  el.startBtn.addEventListener('click', onStartRound);
  el.pauseBtn.addEventListener('click', onPause);
  el.resumeBtn.addEventListener('click', onResume);
  el.exportCsvBtn.addEventListener('click', onExportCsv);
  el.exportJsonBtn.addEventListener('click', onExportJson);

  // Loop de timers
  setInterval(tick, 1000);
}

function renderExercises(exercises) {
  el.exercisesList.innerHTML = '';
  exercises.forEach((ex, idx) => {
    const li = document.createElement('li');
    li.textContent = `${idx + 1}. ${ex}`;
    el.exercisesList.appendChild(li);
  });
}

function onSaveStudents() {
  const list = parseStudents(el.studentsInput.value);
  saveLocal(STORAGE_KEYS.students, list);
  alert(`Guardados ${list.length} estudiante(s).`);
}

function onSaveTimes() {
  const r = Math.max(1, parseInt(el.roundMinutes.value || DEFAULTS.roundMinutes, 10));
  const rot = Math.max(1, parseInt(el.rotationMinutes.value || DEFAULTS.rotationMinutes, 10));
  saveLocal(STORAGE_KEYS.roundMinutes, r);
  saveLocal(STORAGE_KEYS.rotationMinutes, rot);
  alert('Tiempos guardados.');
}

function onGeneratePairs() {
  const students = loadLocal(STORAGE_KEYS.students, parseStudents(el.studentsInput.value));
  saveLocal(STORAGE_KEYS.students, students);
  const exercises = loadLocal(STORAGE_KEYS.exercises, EXERCISES_FIXED);
  const shuffled = shuffle(students);

  const pairs = [];
  let sIndex = 0;
  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];
    const p1 = shuffled[sIndex++] ?? null;
    const p2 = shuffled[sIndex++] ?? null;
    if (!p1 && !p2) break; // sin más estudiantes
    if (p1 && p2) {
      pairs.push({ executor: p1, documenter: p2, exercise });
    } else {
      const solo = p1 || p2;
      pairs.push({ executor: solo, documenter: solo, exercise, solo: true });
    }
  }

  appState.pairs = pairs;
  appState.roundNumber = 0;
  appState.history = [];
  persistState();
  renderAssignments();
  updateControlsUI();
}

function renderAssignments() {
  const container = el.assignmentsContainer;
  container.innerHTML = '';
  appState.pairs.forEach((p, index) => {
    const card = document.createElement('div');
    card.className = 'assignment-card';

    const title = document.createElement('h3');
    title.textContent = `${index + 1}. ${p.exercise}`;
    card.appendChild(title);

    const row1 = document.createElement('div');
    row1.className = 'role-row';
    const r1 = document.createElement('div'); r1.className = 'role'; r1.textContent = 'Ejecutor/a';
    const v1 = document.createElement('div'); v1.className = 'person'; v1.textContent = p.executor || '-';
    row1.appendChild(r1); row1.appendChild(v1);

    const row2 = document.createElement('div');
    row2.className = 'role-row';
    const r2 = document.createElement('div'); r2.className = 'role'; r2.textContent = 'Documentador/a';
    const v2 = document.createElement('div'); v2.className = 'person'; v2.textContent = p.documenter || '-';
    if (p.solo) { v1.classList.add('solo'); v2.classList.add('solo'); }
    row2.appendChild(r2); row2.appendChild(v2);

    card.appendChild(row1);
    card.appendChild(row2);
    container.appendChild(card);
  });

  el.roundNumber.textContent = String(appState.roundNumber || '-');
}

function persistState() { saveLocal(STORAGE_KEYS.state, appState); }

function updateTimersUI() {
  el.roundTimer.textContent = formatMMSS(Math.max(0, appState.roundRemainingSec));
  el.rotationTimer.textContent = appState.phase === 'rotation' || appState.rotationRemainingSec > 0
    ? formatMMSS(Math.max(0, appState.rotationRemainingSec))
    : '--:--';

  const isWarn = appState.phase === 'round' && appState.roundRemainingSec <= 60 && appState.roundRemainingSec > 0;
  el.roundTimer.classList.toggle('warning', isWarn);
  urgentAlertFlash(isWarn);
  const isRotationWarn = appState.phase === 'rotation' && appState.rotationRemainingSec <= 60 && appState.rotationRemainingSec > 0;
  rotationAlertFlash(isRotationWarn);
}

function updateControlsUI() {
  const isIdle = appState.phase === 'idle';
  const isRound = appState.phase === 'round';
  const isRotation = appState.phase === 'rotation';
  const isPaused = appState.phase === 'paused';

  el.startBtn.disabled = !isIdle;
  el.pauseBtn.disabled = !(isRound || isRotation);
  el.resumeBtn.style.display = isPaused ? '' : 'none';
  el.pauseBtn.style.display = isPaused ? 'none' : '';
}

function onStartRound() {
  if (appState.pairs.length === 0) {
    alert('Primero genera las parejas.');
    return;
  }
  const minutes = loadLocal(STORAGE_KEYS.roundMinutes, DEFAULTS.roundMinutes);
  appState.roundNumber = (appState.roundNumber || 0) + 1;
  appState.phase = 'round';
  appState.roundRemainingSec = minutes * 60;
  appState.rotationRemainingSec = 0;
  persistCurrentRoundSnapshot();
  persistState();
  updateTimersUI();
  updateControlsUI();
}

function persistCurrentRoundSnapshot() {
  const assignments = appState.pairs.map(p => ({ exercise: p.exercise, executor: p.executor, documenter: p.documenter }));
  appState.history.push({ round: appState.roundNumber, assignments });
}

function onPause() {
  if (appState.phase === 'round' || appState.phase === 'rotation') {
    appState.phase = 'paused';
    persistState();
    updateControlsUI();
  }
}

function onResume() {
  // Reanuda hacia el modo apropiado: si había tiempo de ronda >0, vuelve a ronda; si no, a rotación si hay.
  if (appState.roundRemainingSec > 0) {
    appState.phase = 'round';
  } else if (appState.rotationRemainingSec > 0) {
    appState.phase = 'rotation';
  } else {
    appState.phase = 'idle';
  }
  persistState();
  updateControlsUI();
}

function startRotationPhase() {
  const minutes = loadLocal(STORAGE_KEYS.rotationMinutes, DEFAULTS.rotationMinutes);
  appState.phase = 'rotation';
  appState.rotationRemainingSec = minutes * 60;
  persistState();
  updateTimersUI();
  updateControlsUI();
}

function performDeterministicRotation() {
  // Regla: el documentador de cada pareja se queda en su estación y ahora será ejecutor.
  // El ejecutor actual va a la siguiente estación como documentador. La última pasa a la primera.
  if (appState.pairs.length === 0) return;
  const nextPairs = [];
  const len = appState.pairs.length;
  for (let i = 0; i < len; i++) {
    const current = appState.pairs[i];
    const nextIndex = (i + 1) % len;
    const next = appState.pairs[nextIndex];
    const newExecutor = current.documenter;
    const newDocumenter = next.executor;
    const exercise = current.exercise; // se queda en la estación
    const solo = current.solo && next.solo && current.executor === current.documenter ? true : false;
    nextPairs.push({ executor: newExecutor, documenter: newDocumenter, exercise, solo });
  }
  // Ajuste: si había una pareja de 1 persona, se mantiene como tal en su estación (ambos roles)
  for (let i = 0; i < len; i++) {
    if (appState.pairs[i].solo) {
      const exercise = appState.pairs[i].exercise;
      const person = appState.pairs[i].executor; // mismo nombre en ambos roles
      nextPairs[i] = { executor: person, documenter: person, exercise, solo: true };
    }
  }
  appState.pairs = nextPairs;
  renderAssignments();
  persistState();
}

function tick() {
  if (appState.phase === 'paused') return;
  if (appState.phase === 'round') {
    if (appState.roundRemainingSec > 0) {
      appState.roundRemainingSec -= 1;
      // Aviso urgente a 60s restantes: triple beep
      if (appState.roundRemainingSec === 60) {
        beep(880, 200, 'square', 0.4);
      }
      if (appState.roundRemainingSec === 30) {
        beep(880, 200, 'square', 0.4);
        setTimeout(() => beep(880, 200, 'square', 0.4), 220);
      }
      if (appState.roundRemainingSec < 10) {
        beep(880, 200, 'square', 0.4);
      }
      if (appState.roundRemainingSec === 0) {
        // Termina ronda -> comienza rotación automáticamente
        startRotationPhase();
      }
    }
  } else if (appState.phase === 'rotation') {
    if (appState.rotationRemainingSec > 0) {
      appState.rotationRemainingSec -= 1;
      // Aviso suave a 30s de rotación
      if (appState.rotationRemainingSec === 30) {
        beep(640, 200, 'sine', 0.25);
        setTimeout(() => beep(640, 200, 'sine', 0.25), 240);
      }
      if (appState.rotationRemainingSec === 0) {
        // Aplicar rotación y comenzar nueva ronda automáticamente
        performDeterministicRotation();
        const minutes = loadLocal(STORAGE_KEYS.roundMinutes, DEFAULTS.roundMinutes);
        appState.roundNumber += 1;
        appState.phase = 'round';
        appState.roundRemainingSec = minutes * 60;
        appState.rotationRemainingSec = 0;
        persistCurrentRoundSnapshot();
      }
    }
  }
  persistState();
  updateTimersUI();
}

function onExportJson() {
  const data = {
    generatedAt: new Date().toISOString(),
    roundNumber: appState.roundNumber,
    currentAssignments: appState.pairs,
    history: appState.history,
    settings: {
      roundMinutes: loadLocal(STORAGE_KEYS.roundMinutes, DEFAULTS.roundMinutes),
      rotationMinutes: loadLocal(STORAGE_KEYS.rotationMinutes, DEFAULTS.rotationMinutes),
      exercises: loadLocal(STORAGE_KEYS.exercises, EXERCISES_FIXED),
      students: loadLocal(STORAGE_KEYS.students, []),
    },
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reporte_gincana_ronda_${appState.roundNumber || 0}.json`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

function onExportCsv() {
  // CSV con cabecera: ronda, ejercicio, ejecutor, documentador
  const rows = [['ronda', 'ejercicio', 'ejecutor', 'documentador']];
  // historial por rondas
  for (const h of appState.history) {
    for (const a of h.assignments) {
      rows.push([h.round, a.exercise, a.executor, a.documenter]);
    }
  }
  // agregar estado actual como última fila por ejercicio
  if (appState.pairs.length > 0) {
    for (const p of appState.pairs) {
      rows.push([appState.roundNumber || 0, p.exercise, p.executor, p.documenter]);
    }
  }
  const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reporte_gincana_ronda_${appState.roundNumber || 0}.csv`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

// Autostart
document.addEventListener('DOMContentLoaded', init);

