/* ═══════════════════════════════════════════════════════
   GCSE Biology Revision — app.js
   ═══════════════════════════════════════════════════════ */

/* ─── NAV PILL SCROLL ──────────────────────────── */
function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
}

/* Highlight active pill on scroll */
const sections = ['cells', 'microscopes', 'division', 'stem', 'transport'];

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 130) current = id;
  });
  document.querySelectorAll('.pill').forEach((pill, i) => {
    pill.classList.toggle('active', sections[i] === current);
  });
});


/* ─── MAGNIFICATION CALCULATOR ─────────────────── */
function calcMag() {
  const imgMM = parseInt(document.getElementById('img-s').value);
  const realRaw = parseInt(document.getElementById('real-s').value);
  const realMM = realRaw / 1000;

  document.getElementById('img-lbl').textContent = imgMM + ' mm';
  document.getElementById('real-lbl').textContent = realMM.toFixed(3) + ' mm';

  const mag = Math.round(imgMM / realMM);
  document.getElementById('mag-out').textContent = '×' + mag.toLocaleString();

  const exp = Math.floor(Math.log10(mag));
  const coeff = (mag / Math.pow(10, exp)).toFixed(2);
  document.getElementById('std-form').textContent =
    'In standard form: ' + coeff + ' × 10' + toSuperscript(exp);
}

function toSuperscript(n) {
  const map = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹' };
  return String(n).split('').map(c => map[c] || c).join('');
}

/* ─── SA:V CALCULATOR ──────────────────────────── */
function calcSAV() {
  const s = parseInt(document.getElementById('side').value);
  document.getElementById('side-lbl').textContent = s + ' cm';

  const sa = 6 * s * s;
  const v  = s * s * s;
  const ratio = (sa / v).toFixed(2);

  document.getElementById('sa-out').textContent    = sa + ' cm²';
  document.getElementById('v-out').textContent     = v  + ' cm³';
  document.getElementById('ratio-out').textContent = ratio + ' : 1';
}


/* ─── CELL CYCLE STEPPER ────────────────────────── */
const stages = [
  {
    name: 'Stage 1 — G1 (first growth)',
    sub: 'Interphase · before DNA replication',
    color: '#1D9E75',
    facts: [
      'Cell grows larger and produces more proteins and organelles.',
      'Normal cell functions continue — the cell is alive and active.',
      'This is the longest phase of the cell cycle.',
      'The cell checks whether conditions are right to divide.'
    ]
  },
  {
    name: 'Stage 2 — S phase (DNA replication)',
    sub: 'Interphase · synthesis',
    color: '#639922',
    facts: [
      'The entire DNA is copied — each chromosome is duplicated.',
      'Result: two identical copies of every chromosome (chromatids joined at centromere).',
      'No visible change yet — the nucleus looks normal under a microscope.',
      'Errors here can cause mutations that may lead to cancer.'
    ]
  },
  {
    name: 'Stage 3 — G2 (second growth)',
    sub: 'Interphase · preparation for division',
    color: '#BA7517',
    facts: [
      'Cell continues to grow and prepares for mitosis.',
      'More proteins are made (e.g. tubulin for spindle fibres).',
      'Another quality check — damaged DNA is repaired if possible.',
      'Cell only enters mitosis if conditions are met (checkpoints).'
    ]
  },
  {
    name: 'Stage 4 — Mitosis (nuclear division)',
    sub: 'M phase · the nucleus divides',
    color: '#534AB7',
    facts: [
      'Chromosomes condense and become visible under a microscope.',
      'Spindle fibres form and attach to each chromosome at the centromere.',
      'Chromosomes are pulled apart to opposite poles of the cell.',
      'Two new nuclei form, each with a complete identical set of chromosomes.',
      'Occurs for: growth, repair of tissues, and asexual reproduction.'
    ]
  },
  {
    name: 'Stage 5 — Cytokinesis (cell splitting)',
    sub: 'Final stage · the cell physically divides',
    color: '#D85A30',
    facts: [
      'The cytoplasm divides — the cell splits in two.',
      'Result: two genetically identical daughter cells.',
      'Each daughter has the same number of chromosomes as the parent (diploid).',
      'In plant cells: a new cell wall forms between the two cells.',
      'The cycle now begins again from G1.'
    ]
  }
];

let stepperCur = 0;

function renderStepper() {
  const s = stages[stepperCur];

  // dots
  document.getElementById('stepper-dots').innerHTML = stages.map((_, i) =>
    `<button class="stepper-dot ${i === stepperCur ? 'active' : ''}" onclick="stepperJump(${i})" aria-label="Stage ${i+1}"></button>`
  ).join('');

  // body
  document.getElementById('stepper-body').innerHTML = `
    <div class="step-name">${s.name}</div>
    <div class="step-sub">${s.sub}</div>
    <div class="step-facts">
      ${s.facts.map(f => `
        <div class="step-fact">
          <div class="step-bullet" style="background:${s.color}"></div>
          <span>${f}</span>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('stepper-count').textContent =
    (stepperCur + 1) + ' / ' + stages.length;
}

function stepperGo(dir) {
  stepperCur = (stepperCur + dir + stages.length) % stages.length;
  renderStepper();
}

function stepperJump(i) {
  stepperCur = i;
  renderStepper();
}


/* ─── INIT ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  calcMag();
  calcSAV();
  renderStepper();
});
