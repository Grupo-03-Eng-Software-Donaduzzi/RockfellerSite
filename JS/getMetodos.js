const URL = "https://auxnrhf1.api.sanity.io/v2025-10-25/data/query/production?query=*%0A%5B%0A++_type+%3D%3D+%22metodos%22%0A%5D%0A%7B%0A++%27icone%27%3A+icone.asset-%3Eurl%2C%0A++titulo%2C%0A++descricao%0A%7D%0A&perspective=drafts";

async function carregarMetodos() {
    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        const result = json.result;
        if (!Array.isArray(result)) throw new Error('Resposta inesperada da API');

        const main = document.querySelector("div#metodos");
        if (!main) throw new Error('Elemento #metodos não encontrado no DOM');


        for (let i = 0; i < result.length; i++) {
            const item = result[i] || {};

            const img = document.createElement('img');
            img.src = item.icone || '';
            img.alt = item.titulo || '';

            const titulo = document.createElement('h3');
            titulo.innerText = item.titulo || '';

            const divTitulo = document.createElement('div');
            divTitulo.classList.add(`titulo-metodo-${i+1}`);
            divTitulo.appendChild(titulo); // antes o título não era inserido

            const texto = document.createElement('p');
            texto.innerText = item.descricao || '';

            const divTexto = document.createElement('div');
            divTexto.classList.add('texto-metodo');
            divTexto.appendChild(texto);

            const divMetodo = document.createElement('div');
            divMetodo.classList.add(`metodo-${i+1}`);
            divMetodo.append(img, divTitulo, divTexto);

            main.appendChild(divMetodo);
        }
    } catch (err) {
        console.error('Erro ao carregar métodos:', err);
    }
}

// garante que o DOM esteja pronto
document.addEventListener('DOMContentLoaded', carregarMetodos);