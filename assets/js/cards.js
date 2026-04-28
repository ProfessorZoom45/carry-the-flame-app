async function loadCards(){
  let data;
  try{
    const res = await fetch('../data/ctf_cards_search_index.json');
    data = await res.json();
    document.getElementById('status').textContent = 'Loaded full database';
  }catch{
    data = { cards:[{name:'Sample Card',category:'Normal Catalyst',type:'Fire',atk:1000,def:1000,level:4,set:'TEST'}] };
    document.getElementById('status').textContent = 'Using sample data (upload JSON)';
  }

  window.ALL_CARDS = data.cards || data;
  renderFilters();
  renderCards(window.ALL_CARDS);
}

function renderFilters(){
  const cats = [...new Set(ALL_CARDS.map(c=>c.category))];
  const types = [...new Set(ALL_CARDS.map(c=>c.type))];
  const sets = [...new Set(ALL_CARDS.map(c=>c.set))];

  fillSelect('category', cats);
  fillSelect('type', types);
  fillSelect('set', sets);
}

function fillSelect(id, arr){
  const el = document.getElementById(id);
  el.innerHTML = '<option value="">All</option>' + arr.map(v=>`<option>${v}</option>`).join('');
}

function renderCards(cards){
  const wrap = document.getElementById('cards');
  wrap.innerHTML = cards.slice(0,100).map(c=>`
    <div class="feature-card">
      <h3>${c.name}</h3>
      <p>${c.category} | ${c.type}</p>
      <p>ATK:${c.atk||'?'} DEF:${c.def||'?'} LV:${c.level||'?'}</p>
    </div>
  `).join('');
}

function applyFilters(){
  let result = [...ALL_CARDS];

  const s = document.getElementById('search').value.toLowerCase();
  const cat = document.getElementById('category').value;
  const type = document.getElementById('type').value;
  const set = document.getElementById('set').value;

  if(s) result = result.filter(c=>c.name.toLowerCase().includes(s));
  if(cat) result = result.filter(c=>c.category===cat);
  if(type) result = result.filter(c=>c.type===type);
  if(set) result = result.filter(c=>c.set===set);

  renderCards(result);
}

['search','category','type','set'].forEach(id=>{
  document.addEventListener('input',e=>{if(e.target.id===id) applyFilters();});
});

document.getElementById('sort').addEventListener('change', e=>{
  const val = e.target.value;
  const sorted = [...ALL_CARDS].sort((a,b)=> (a[val]||0)-(b[val]||0));
  renderCards(sorted);
});

document.getElementById('reset').addEventListener('click', ()=>{
  document.querySelectorAll('input,select').forEach(el=>el.value='');
  renderCards(ALL_CARDS);
});

loadCards();
