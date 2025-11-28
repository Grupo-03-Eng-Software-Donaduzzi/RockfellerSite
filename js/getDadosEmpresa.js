
async function carregarDadosEmpresa(){
    const URL = "https://auxnrhf1.api.sanity.io/v2025-10-25/data/query/production?query=*%0A%5B%0A++_type+%3D%3D+%22dados_empresa%22%0A%5D%0A%7B%0A++rua%2C%0A++numero%2C%0A++bairro%2C%0A++cidade%2C%0A++estado%2C%0A++cep%2C%0A++telefone%2C%0A++email%2C%0A++instagram%2C%0A++youtube%2C%0A++whatsapp%2C%0A++facebook%2C%0A++tiktok%0A%7D&perspective=drafts";

    try{
        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        const result = json.result;
        if (!Array.isArray(result)) throw new Error('Resposta inesperada da API');

        const main = document.querySelector("div.contato");
        if (!main) throw new Error('Elemento .contato não encontrado no DOM');


        const dados = result[0];
        console.log(dados);

        let strEndereco = `${dados.cidade}-${dados.estado} - ${dados.bairro} - ${dados.rua} - ${dados.numero}`;
        let divEndereco = document.createElement('div');
        divEndereco.innerText = strEndereco;
        console.log(strEndereco);

        let divEntreContato = document.createElement('div');
        divEntreContato.classList.add('entre=em-contato');
        divEntreContato.innerText = "Entre em contato";


        let divTelefone = document.createElement('div');
        divTelefone.innerText = dados.telefone;

        let liSpotify = document.createElement('li');
        let aSpotify = document.createElement('a');
        aSpotify.href = dados.spotify;
        aSpotify.target = '_blank';
        let imgSpotify = document.createElement('img');
        imgSpotify.src = "../MEDIA/spotify.png";
        imgSpotify.alt = "Spotify";
        aSpotify.appendChild(imgSpotify);
        liSpotify.appendChild(aSpotify);

        let liYouTube = document.createElement('li');
        let aYouTube = document.createElement('a');
        aYouTube.href = dados.youtube;
        aYouTube.target =  "_blank";
        let imgYouTube = document.createElement('img');
        imgYouTube.src = "../MEDIA/youtube.png";
        imgYouTube.alt = "Youtube";
        aYouTube.appendChild(imgYouTube);
        liYouTube.appendChild(aYouTube);

        let liInsta = document.createElement('li');
        let aInsta = document.createElement('a');
        aInsta.href = dados.instagram;
        aInsta.target = '_blank';
        let imgInsta = document.createElement('img');
        imgInsta.src = "../MEDIA/instagram.png" 
        imgInsta.alt = 'Instagram';
        aInsta.appendChild(imgInsta);
        liInsta.appendChild(aInsta);



            let liWhatsapp = document.createElement('li');
            let aWhats = document.createElement('a');
            aWhats.href = dados.whatsapp;
            aWhats.target='_blank';
            let imgWhats = document.createElement('img');
            imgWhats.src = "../MEDIA/whats.png"
            imgWhats.alt = 'WhatsApp'
            aWhats.appendChild(imgWhats);
            liWhatsapp.append(aWhats);


            let ulRedes = document.createElement('ul');
            ulRedes.classList.add('redes-sociais');
            ulRedes.append(liWhatsapp, liInsta, liYouTube, liSpotify);


            main.append(divEndereco, divEntreContato, divTelefone, ulRedes);

        }catch{
        console.error('Erro ao carregar redes', error);
    }
}

document.addEventListener('DOMContentLoaded', carregarDadosEmpresa());