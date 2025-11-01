document.addEventListener('DOMContentLoaded', () => {
  const carrossel = document.getElementById('carrossel');
  if (!carrossel) return;

  let posicao = 0;
  const visiveis = 3;

  function getTotalComentarios() {
    return carrossel.querySelectorAll('.comentario').length;
  }

  function getLarguraCaixa() {
    const primeiro = carrossel.querySelector('.comentario');
    if (!primeiro) return 267; // fallback
    const rect = primeiro.getBoundingClientRect();
    const style = getComputedStyle(primeiro);
    const margin = (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
    return rect.width + margin;
  }

  // função exposta globalmente para os botões onclick
  window.mover = function (direcao) {
    const totalComentarios = getTotalComentarios();
    const larguraCaixa = getLarguraCaixa();
    const maxPosicao = Math.max(0, totalComentarios - visiveis);

    posicao = posicao + direcao;
    if (posicao < 0) posicao = 0;
    if (posicao > maxPosicao) posicao = maxPosicao;

    carrossel.style.transition = 'transform 0.4s ease';
    carrossel.style.transform = `translateX(${-posicao * larguraCaixa}px)`;
  };

  // reajusta transform quando a janela muda de tamanho
  window.addEventListener('resize', () => {
    carrossel.style.transform = `translateX(${-posicao * getLarguraCaixa()}px)`;
  });

  // observa adição/remoção de .comentario (útil quando depoimentos chegam via fetch)
  const mo = new MutationObserver(() => {
    const total = getTotalComentarios();
    posicao = Math.min(posicao, Math.max(0, total - visiveis));
    carrossel.style.transform = `translateX(${-posicao * getLarguraCaixa()}px)`;
  });
  mo.observe(carrossel, { childList: true });
});