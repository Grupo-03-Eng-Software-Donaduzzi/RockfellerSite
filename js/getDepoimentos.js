const URL = "https://auxnrhf1.api.sanity.io/v2025-10-25/data/query/production?query=*%0A%5B%0A++_type+%3D%3D+%22depoimentos%22%0A%5D%0A%7B%0A++nome%2C%0A++mensagem%2C%0A++nota%0A%7D&perspective=drafts";

function renderStars(n) {
    const num = Math.max(0, Math.min(5, Math.round(Number(n) || 0)));
    const filled = '★'.repeat(num);
    const empty = '☆'.repeat(5 - num);
    return `<span class="estrela">${filled}${empty}</span>`;
}

async function carregarDepoimentos() {
    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        const result = Array.isArray(json.result) ? json.result : [];

        const main = document.querySelector(".comentarios");
        if (!main) throw new Error('Elemento .comentarios não encontrado no DOM');

        for (let i = 0; i < result.length; i++) {
            const item = result[i] || {};

            const pAutor = document.createElement('p');
            pAutor.classList.add("autor");
            pAutor.innerText = item.nome || 'Anônimo';

            const pTexto = document.createElement("p");
            pTexto.classList.add("texto");
            pTexto.innerText = item.mensagem || '';

            const divNota = document.createElement('div');
            divNota.classList.add('avaliacao-estrelas');
            divNota.innerHTML = renderStars(item.nota);

            const divP = document.createElement('div');
            divP.classList.add('comentario');
            divP.append(pTexto, pAutor, divNota);

            main.appendChild(divP);
        }
    } catch (err) {
        console.error('Erro ao carregar depoimentos:', err);
    }
}

document.addEventListener('DOMContentLoaded', carregarDepoimentos);
