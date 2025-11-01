const URL = "https://auxnrhf1.api.sanity.io/v2025-10-25/data/query/production?query=*%5B_type%20%3D%3D%20%22teste_nivelamento%22%5D%7Btitulo%2C%20perguntas%7B%20enunciado%2C%20alternativas%2C%20resposta_correta%20%7D%7D&perspective=published";

async function carregarTeste() {
    try {
        const resposta = await fetch(URL);
        const dados = await resposta.json();
        const teste = dados.result[0];

        const main = document.querySelector("main") || document.body;


        const titulo = document.createElement("h1");
        titulo.className = "titulo";
        titulo.textContent = teste.titulo || "Teste de Nivelamento";
        main.appendChild(titulo);


        teste.perguntas.forEach((p, i) => {
            const div = document.createElement("div");
            div.className = "pergunta";


            const enunciado = document.createElement("p");
            enunciado.textContent = `${i + 1}. ${p.enunciado}`;
            div.appendChild(enunciado);


            p.alternativas.forEach(alt => {
                const label = document.createElement("label");
                label.innerHTML = `<input type="radio" name="pergunta_${i}" value="${alt}"> ${alt}`;
                div.appendChild(label);
            });

            main.appendChild(div);
        });


        const botao = document.createElement("button");
        botao.textContent = "Enviar Respostas";
        botao.onclick = () => mostrarResultado(teste);
        main.appendChild(botao);
    } catch (erro) {
        console.error("Erro ao carregar teste:", erro);
    }
}


function mostrarResultado(teste) {
    const perguntas = document.querySelectorAll(".pergunta");
    let acertos = 0;

    perguntas.forEach((div, i) => {
        const marcada = div.querySelector("input:checked");
        if (marcada && marcada.value === teste.perguntas[i].resposta_correta) {
            acertos++;
        }
    });

    const resultado = document.createElement("div");
    resultado.id = "resultado-final";
    resultado.innerHTML = `<h2>Resultado</h2><p>Você acertou ${acertos} de ${teste.perguntas.length} questões.</p>`;

    document.body.innerHTML = "";
    document.body.appendChild(resultado);


    const voltar = document.createElement("button");
    voltar.className = "botao-voltar";
    voltar.textContent = "Voltar";
    voltar.onclick = () => location.reload();
    document.body.appendChild(voltar);
}

document.addEventListener("DOMContentLoaded", carregarTeste);
