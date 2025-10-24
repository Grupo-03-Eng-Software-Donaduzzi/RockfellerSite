let posicao = 0;
    const carrossel = document.getElementById('carrossel');
    const totalComentarios = document.querySelectorAll('.comentario').length;
    const visiveis = 3;
    const larguraCaixa = 267; // 257 + margem

    function mover(direcao) {
      const maxPosicao = totalComentarios - visiveis;
      posicao += direcao;
      if (posicao < 0) posicao = 0;
      if (posicao > maxPosicao) posicao = maxPosicao;
      carrossel.style.transform = `translateX(${-posicao * larguraCaixa}px)`;
    }