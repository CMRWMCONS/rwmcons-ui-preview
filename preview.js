const screens = [...document.querySelectorAll('.screen')];
const steps = [...document.querySelectorAll('.step')];
function go(index) {
  screens.forEach((screen, i) => { screen.hidden = i !== index; });
  steps.forEach((step, i) => {
    if (i === index) step.setAttribute('aria-current', 'step');
    else step.removeAttribute('aria-current');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
steps.forEach((step, index) => step.addEventListener('click', () => go(index)));
let toastTimer;
function toast(message) {
  const box = document.getElementById('toast');
  box.textContent = message;
  box.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove('show'), 2800);
}
function confirmSet() {
  const button = document.getElementById('confirm-set');
  button.textContent = '✓ Set demonstrativ confirmat';
  button.classList.add('confirmed');
  document.getElementById('confirm-title').textContent = 'Set demonstrativ confirmat';
  document.getElementById('confirm-subtitle').textContent = 'Acțiune simulată · fără modificări în proiecte reale';
  toast('Confirmare simulată. Niciun proiect sau document real nu a fost modificat.');
}
function trace(kind) {
  const entries = {
    'fațadă': ['Suprafață brută fațadă · declarată', 'IFC · model R04 · Qto_WallBaseQuantities', 'Valoare preluată din cantitatea declarată', '486,20 m²', 'Declarată · date demonstrative'],
    'ferestre': ['Goluri ferestre · calculate', 'IFC · model R04 · 32 elemente IfcWindow', 'Sumă suprafețe deschideri clasificate', '62,60 m²', 'Calculată · date demonstrative'],
    'net': ['Suprafață netă fațadă · de confirmat', 'IFC · model R04 · pereți și goluri', 'Suprafață brută minus goluri mapate', '486,20 − 62,60 = 423,60 m²', 'De confirmat · date demonstrative'],
    'grosime': ['Grosime termoizolație · declarată', 'Caiet de sarcini · revizia 03 · pagina 18', 'Preluare valoare specificată', '12 cm', 'Declarată · date demonstrative'],
    'consum': ['Consum adeziv · fără sursă', 'Nicio fișă tehnică asociată', 'Nu se calculează fără consum documentat', '—', 'Nespecificat · nu se presupune']
  }[kind];
  if (!entries) return;
  ['trace-title', 'trace-source', 'trace-method', 'trace-formula', 'trace-status'].forEach((id, i) => {
    const node = document.getElementById(id);
    if (node) node.textContent = entries[i];
  });
}
