/* ===================== PIPOCAS DE FUNDO ===================== */
function gerarPipocas() {
  const container = document.getElementById('pipocas-fundo');
  const quantidade = 60; // quantidade de pipocas a serem geradas

  for (let i = 0; i < quantidade; i++) {
    const pipoca = document.createElement('span');
    pipoca.innerHTML = `<img src="data//asseets//elementos//pipoca.png" width="40" height="40" alt="">`;

    // posição aleatória em % para funcionar em qualquer tamanho de tela 
    pipoca.style.left = Math.random() * 100 + '%';
    pipoca.style.top  = Math.random() * 100 + '%';

    // rotação aleatória para parecer espalhado de verdade 
    pipoca.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(pipoca);
  }
}

gerarPipocas();

/* ===================== CARREGAMENTO DOS DADOS ===================== */
fetch('./data/data.json')
  .then(response => response.json())
  .then(dados => renderizarPainel(dados))
  .catch(erro => console.error('Erro ao carregar dados:', erro));

/* ===================== RENDERIZAÇÃO ===================== */
function renderizarPainel(dados) {
  document.getElementById('titulo').textContent = dados.titulo;

  const lista = document.getElementById('grid');

  dados.itens.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="card-imagem">
        <img
          src="${item.cartaz}"
          alt="Cartaz do filme ${item.titulo}"
          onerror="this.style.display='none'"
        >
      </div>
      <div class="card-info">
        <h2>${item.titulo}</h2>
        <p>🎬 ${item.genero}</p>
        <p>📅 ${item.ano}</p>
        <p>⭐ ${item.nota}</p>
      </div>
    `;

    lista.appendChild(card);
  });
}