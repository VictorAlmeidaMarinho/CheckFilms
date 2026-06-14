/* --- Wallpaper de Pipocas --- */
function gerarPipocas() {
  const container = document.getElementById('pipocas-fundo');
  const quantidade = 60;

  for (let i = 0; i < quantidade; i++) {
    const pipoca = document.createElement('span');
    pipoca.innerHTML = `<img src="data//asseets//elementos//pipoca.png" width="40" height="40" alt="">`;

    pipoca.style.left = Math.random() * 100 + '%';
    pipoca.style.top  = Math.random() * 100 + '%';
    pipoca.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(pipoca);
  }
}

gerarPipocas();

/* --- localStorage no Navegador --- */
const STORAGE_KEY = 'watchlist_watched';

function carregarWatched() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function salvarWatched(titulo, valor) {
  const estado = carregarWatched();
  estado[titulo] = valor;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}

function removerWatched(titulo) {
  const estado = carregarWatched();
  delete estado[titulo];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}

/* --- Fetch de data.json --- */
fetch('./data/data.json')
  .then(response => response.json())
  .then(dados => renderizarPainel(dados))
  .catch(erro => console.error('Erro ao carregar dados:', erro));

/* --- Dashboard de data.json --- */
function renderizarPainel(dados) {
  document.getElementById('titulo').textContent = dados.titulo;

  const watchedSalvo = carregarWatched();

  // Empurra filmes assistidos para o fim da lista
  const naoAssistidos = dados.itens.filter(i => !watchedSalvo[i.titulo]);
  const assistidos    = dados.itens.filter(i =>  watchedSalvo[i.titulo]);

  [...naoAssistidos, ...assistidos].forEach(item => {
    item.watched = !!watchedSalvo[item.titulo];
    adicionarCard(item);
  });
}

function adicionarCard(item) {
  const lista = document.getElementById('grid');
  const card = document.createElement('div');
  card.className = 'card' + (item.watched ? ' card-assistido' : '');
  card.dataset.titulo = item.titulo;

  card.innerHTML = `
    <div class="card-imagem">
      <img
        src="${item.cartaz}"
        alt="Cartaz do filme ${item.titulo}"
        onerror="this.style.display='none'"
      >
      ${item.watched ? '<div class="card-watched-badge">✔ Assistido</div>' : ''}
    </div>
    <div class="card-info">
      <h2 class="card-title">${item.titulo}</h2>
      <p class="card-genre">🎬 ${item.genero}</p>
      <p>📅 ${item.ano}</p>
      <p>⭐ ${item.nota}</p>
    </div>
    <div class="card-overlay" style="display:none;">
      <div class="overlay-content">
        ${item.watched
          ? `<p class="overlay-pergunta">Desmarcar como assistido?</p>
             <div class="overlay-botoes">
               <button class="btn-sim btn-desmarcar">Sim</button>
               <button class="btn-nao">Não</button>
             </div>`
          : `<p class="overlay-pergunta">Assistiu o filme?</p>
             <div class="overlay-botoes">
               <button class="btn-sim">Sim</button>
               <button class="btn-nao">Não</button>
             </div>`
        }
      </div>
    </div>
  `;

  /* ---- Overlay de Checklist de Filme ---- */
  card.addEventListener('click', function (e) {
    if (e.target.closest('.btn-sim') || e.target.closest('.btn-nao')) return;
    const overlay = card.querySelector('.card-overlay');
    overlay.style.display = 'flex';
  });

  // Botão "Sim" (marcar como assistido)
  card.querySelector('.btn-sim').addEventListener('click', function (e) {
    e.stopPropagation();
    if (item.watched) {
      // Desfaz: remove do localStorage e re-renderiza como não assistido
      item.watched = false;
      removerWatched(item.titulo);
    } else {
      // Marca como assistido
      item.watched = true;
      salvarWatched(item.titulo, true);
    }
    card.remove();
    adicionarCard(item);
  });

  card.querySelector('.btn-nao').addEventListener('click', function (e) {
    e.stopPropagation();
    card.querySelector('.card-overlay').style.display = 'none';
  });

  lista.appendChild(card);
}