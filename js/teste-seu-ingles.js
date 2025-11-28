let acertos = 0;

function pedirCadastro() {
    const inputs = document.querySelectorAll('input[type=radio]:checked');

    if (inputs.length < 10) {
        alert('Responda todas as perguntas antes de continuar.');
        return;
    }

    acertos = 0;
    inputs.forEach(input => {
        acertos += parseInt(input.value);
    });

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('cadastro').style.display = 'block';
}

function mostrarResultado() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  if (nome === '') {
    alert('Digite seu nome para continuar.');
    return;
  }
  if (email === '') {
    alert('Digite seu email para continuar.');
    return;
  }
  if (telefone === '') {
    alert('Digite seu telefone para continuar.');
    return;
  }

  const respostasCorretas = {
    q1: 'am',
    q2: 'book',
    q3: 'thirteen',
    q4: 'He is hungry.',
    q5: 'blue',
    q6: 'are',
    q7: 'thank you',
    q8: 'night',
    q9: 'children',
    q10: 'She plays soccer.'
  };

  let gabaritoHtml = `<strong>Parabéns, ${nome}!</strong><br>Você acertou <strong>${acertos} de 10</strong>.<br><br><strong>Gabarito:</strong><br><br>`;

  for (let i = 1; i <= 10; i++) {
    const pergunta = `q${i}`;
    const respostaCerta = respostasCorretas[pergunta];
    const selecionado = document.querySelector(`input[name=${pergunta}]:checked`);
    const respostaUsuario = selecionado ? selecionado.parentElement.textContent.trim() : 'Não respondeu';

    const acertou = respostaUsuario === respostaCerta;

    gabaritoHtml += `
      <strong>Questão ${i}:</strong><br>
      ${acertou
        ? `<span style="color: green;">✅ Sua resposta: ${respostaUsuario}</span><br><br>`
        : `<span style="color: red;">❌ Sua resposta: ${respostaUsuario}</span><br>
           <span style="color: green;">✅ Resposta correta: ${respostaCerta}</span><br><br>`
      }
    `;
  }

  const resultado = document.getElementById('resultado-final');
  resultado.innerHTML = gabaritoHtml;
  resultado.style.display = 'block';
  resultado.style.textAlign = 'center';

  document.getElementById('cadastro').style.display = 'none';
  document.getElementById('botao-voltar').style.display = 'block';
  document.getElementById('botao-voltar').style.margin = '20px auto';
  document.getElementById('botao-voltar').style.textAlign = 'center';
}