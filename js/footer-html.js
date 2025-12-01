


// Courses to insert
const cursos = [
    { label: "Inglês kids", link: "kids.html" },
    { label: "Inglês teens", link: "teens.html" },
    { label: "Inglês adults", link: "adults.html" },
    { label: "Todos os cursos", link: "cursos.html" }
];

// Select the UL where items will be inserted
const ulFooterLinks = document.querySelector(".footer-links");

// --- Add title "Cursos" ---
const divTitulo = document.createElement("div");
divTitulo.classList.add("titulo-links");

const liTitulo = document.createElement("li");
liTitulo.textContent = "Cursos";

divTitulo.appendChild(liTitulo);
ulFooterLinks.appendChild(divTitulo);

// --- Add each dynamic course ---
cursos.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = item.link;
    a.textContent = item.label;

    li.appendChild(a);
    ulFooterLinks.appendChild(li);
});







// ----------------------
// FETCH DATA FROM API
// ----------------------
async function carregarDadosEmpresa() {
    const URL = "https://auxnrhf1.api.sanity.io/v2025-10-25/data/query/production?query=*%0A%5B%0A++_type+%3D%3D+%22dados_empresa%22%0A%5D%0A%7B%0A++rua%2C%0A++numero%2C%0A++bairro%2C%0A++cidade%2C%0A++estado%2C%0A++telefone%2C%0A++instagram%2C%0A++youtube%2C%0A++whatsapp%2C%0A++spotify%0A%7D";

    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        const result = json.result;
        if (!Array.isArray(result) || result.length === 0) throw new Error('Resposta inesperada da API');

        const dados = result[0];
        
        // Build the contact data from API
        const contatoData = {
            endereco: `${dados.cidade}-${dados.estado} - ${dados.bairro} - ${dados.rua} - ${dados.numero}`,
            contatoTitulo: "Entre em contato",
            telefone: dados.telefone,
            redes: [
                {
                    link: dados.whatsapp,
                    img: "../MEDIA/whats.png",
                    alt: "whatsapp"
                },
                {
                    link: dados.instagram,
                    img: "../MEDIA/instagram.png",
                    alt: "instagram"
                },
                {
                    link: dados.youtube,
                    img: "../MEDIA/youtube.png",
                    alt: "youtube"
                },
                {
                    link: dados.spotify,
                    img: "../MEDIA/spotify.png",
                    alt: "spotify"
                }
            ]
        };

        createContatoSection(contatoData);

    } catch (error) {
        console.error('Erro ao carregar dados da empresa:', error);
        // Fallback to default data if API fails
        createContatoSection(getDefaultContatoData());
    }
}

// ----------------------
// DEFAULT DATA (fallback)
// ----------------------
function getDefaultContatoData() {
    return {
        endereco: "Toledo-PR - Bairro - Rua D. Pedro II - 1581",
        contatoTitulo: "Entre em contato",
        telefone: "Comercial: (45) 9 8407-0294",
        redes: [
            {
                link: "https://api.whatsapp.com/send/?phone=5545984070294",
                img: "../MEDIA/whats.png",
                alt: "whatsapp"
            },
            {
                link: "https://www.instagram.com/rockfeller_toledo/",
                img: "../MEDIA/instagram.png",
                alt: "instagram"
            },
            {
                link: "https://www.youtube.com/c/CanaldaRock",
                img: "../MEDIA/youtube.png",
                alt: "youtube"
            },
            {
                link: "https://open.spotify.com/user/5cm4tudwti6oiqlcakdb2cc9w",
                img: "../MEDIA/spotify.png",
                alt: "spotify"
            }
        ]
    };
}

// ----------------------
// JS FUNCTION TO BUILD THE SECTION
// ----------------------
function createContatoSection(contatoData) {
    const contato = document.createElement("div");
    contato.classList.add("contato");

    // Endereço
    const endereco = document.createElement("div");
    endereco.classList.add("endereço");
    endereco.textContent = contatoData.endereco;
    contato.appendChild(endereco);

    // Título
    const contatoTitulo = document.createElement("div");
    contatoTitulo.classList.add("entre-em-contato");
    contatoTitulo.textContent = contatoData.contatoTitulo;
    contato.appendChild(contatoTitulo);

    // Telefone
    const telDiv = document.createElement("div");
    telDiv.classList.add("telefone");
    telDiv.textContent = contatoData.telefone;
    contato.appendChild(telDiv);

    // Redes sociais
    const ulRedes = document.createElement("ul");
    ulRedes.classList.add("redes-sociais");

    contatoData.redes.forEach(rede => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = rede.link;
        a.target = "_blank";

        const img = document.createElement("img");
        img.src = rede.img;
        img.alt = rede.alt;

        a.appendChild(img);
        li.appendChild(a);
        ulRedes.appendChild(li);
    });

    contato.appendChild(ulRedes);

    // Insert into page
    const footer = document.querySelector(".footer");
    if (footer) {
        footer.appendChild(contato);
    }
}

// ----------------------
// RUN ON PAGE LOAD
// ----------------------
document.addEventListener("DOMContentLoaded", carregarDadosEmpresa);