const URL = "https://auxnrhf1.api.sanity.io/v2025-11-06/data/query/production?query=*%5B_type+%3D%3D+%22teste_nivelamento%22%5D%7B%0A++titulo%2C%0A++perguntas%5B%5D%7B%0A++++enunciado%2C%0A++++alternativas%2C%0A++++resposta_correta%0A++%7D%0A%7D%0A&perspective=drafts";

async function carregarTeste() {

    try {
        const resposta = await fetch(URL);
        const dados = await resposta.json();

        const main = document.getElementById("main");

        const teste = dados.result && dados.result[0];

        if (!teste) {
            console.warn("Nenhum teste encontrado no Sanity.");
            const main = document.getElementById("main");
            const msg = document.createElement("p");
            msg.style.color = "white";
            msg.textContent = "Nenhum teste disponível no momento.";
            main.appendChild(msg);
            return; // sai da função para não quebrar
        }

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
        botao.onclick = () => 
        mostrarResultado(teste);
        main.appendChild(botao);

    } catch (erro) {
        console.error("Erro ao carregar teste:", erro);
        const main = document.getElementById("main");
        const msg = document.createElement("p");
        msg.style.color = "white";
        msg.textContent = "Erro ao carregar o teste. Tente novamente mais tarde.";
        main.appendChild(msg);
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

    const total = teste.perguntas.length;
    window.location.href = `resultado.html?acertos=${acertos}&total=${total}`;

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
