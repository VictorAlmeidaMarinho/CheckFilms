fetch('./data/data.json')
  .then(response => response.json())
  .then(dados => renderizarPainel(dados))
  .catch(erro => console.error('Erro ao carregar dados:', erro));

function renderizarPainel(dados) {
  // Atualiza o título da página
  document.getElementById('titulo').textContent = dados.titulo;

  // Pega o container de cards
  const lista = document.getElementById('lista');

  // Cria um card para cada item
  dados.itens.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${item.titulo}</h2>
      <p>🎬 ${item.genero}</p>
      <p>📅 ${item.ano}</p>
      <p>⭐ ${item.nota}</p>
    `;
    lista.appendChild(card);
  });
}