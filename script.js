// hedef ve bir bardak hacmi
const GOAL_LITERS = 2;
const CUP_ML = 250;

// elemanlar
const glass = document.getElementById('glass');
const liquid = document.getElementById('liquid');
const percentEl = document.getElementById('percent');
const remainedEl = document.getElementById('remained');
const litersEl = document.getElementById('liters');
const resetBtn = document.getElementById('reset');
const cupBtns = [...document.querySelectorAll('.cup-small')];

// state
let full = +localStorage.getItem('fullCups') || 0;

// events
cupBtns.forEach((b,i)=> b.addEventListener('click', ()=> toggle(i)));
resetBtn.addEventListener('click', ()=> { full=0; save(); sync(); });
window.addEventListener('resize', updateBig); // responsive yükseklik

// init
sync();

// toggle logic (aynı bardağa tekrar basınca geri al)
function toggle(idx){
  if (idx === full - 1) full--;
  else full = idx + 1;
  save(); sync();
}

function save(){ localStorage.setItem('fullCups', String(full)); }

function sync(){
  cupBtns.forEach((b,i)=> b.setAttribute('aria-pressed', i < full ? 'true':'false'));
  updateBig();
}

function updateBig(){
  const total = cupBtns.length;
  const ratio = full / total;              // 0..1
  const drankML = full * CUP_ML;
  const remainedL = Math.max(0, GOAL_LITERS - drankML/1000);

  // Bardağın GERÇEK iç yüksekliğini al (border vs. fark etmez)
  const H = glass.clientHeight;            // örn. 330px
  const target = Math.round(ratio * H);    // %100 -> tam yükseklik

  // sıvı yüksekliği (tam dolum garanti)
  liquid.style.height = `${target}px`;

  // yüzde
  percentEl.textContent = `${Math.round(ratio*100)}%`;

  // kalan kartı
  litersEl.textContent = `${remainedL.toFixed(1)}L`;
  remainedEl.style.opacity = (full === total) ? '0' : '1';
}
