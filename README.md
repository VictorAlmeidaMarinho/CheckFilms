# 🍿 CheckFilms

Este é um Painel visual de checklist de filmes. Marque o que você já assistiu e desmarque quando quiser. Tudo fica e permanece salvo direto no navegador.

---

## Funcionalidades

- Grade de cards de filmes carregada a partir de um arquivo `data.json`, que pode ser atualizado dinamicamente por meio do 'volumes' em `docker-compose.yaml`
- Clique em qualquer card para marcar um filme como assistido
- Cards assistidos ficam em escala de cinza e vão para o fim da lista
- Clique novamente no card assistido para desmarcá-lo
- O estado do card persiste via `localStorage` — sobrevive a recarregamentos da página


## Estrutura do projeto

```
checkfilms/
├── index.html
├── style.css
├── app.js
├── data/
│   └── data.json        # lista de filmes
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── .gitignore
```

## Formato do data.json

```json
{
  "titulo": "CheckFilms",
  "itens": [
    {
      "titulo": "Nome do Filme",
      "genero": "Ação",
      "ano": 2024,
      "nota": 8.5,
      "cartaz": "https://link-para-imagem.jpg"
    }
  ]
}
```

## Como rodar

### Com Docker (recomendado)

Requer [Docker](https://www.docker.com/) instalado.

```bash
git clone https://github.com/seu-usuario/checkfilms.git
cd checkfilms
docker compose up --build -d
```

Acesse em: [http://localhost:8000](http://localhost:8000)

Para parar o container:

```bash
docker stop app
```
```bash
docker stop 64ec7c4fa302
```
Observação: 'app' é o nome do container, e "64ec7c4fa302" é o seu ID.

## Autores

Victor Marinho e Victor Costa
