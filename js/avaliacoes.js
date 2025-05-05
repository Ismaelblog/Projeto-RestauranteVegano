
//Menu
const menuButton = document.querySelector('.menu-button');
const menuDropdown = document.querySelector('.menu-dropdown');

menuButton.addEventListener('click', () => {
  if (menuDropdown.classList.contains('show')) {
    // Se o menu estiver visível, aciona o efeito de saída
    menuDropdown.style.opacity = '0';
    setTimeout(() => {
      menuDropdown.classList.remove('show');
      menuDropdown.style.opacity = '';
    }, 300);
  } else {
    // Se o menu estiver escondido, mostra o menu
    menuDropdown.classList.add('show');
  }
});

window.addEventListener('click', (event) => {
  if (!event.target.matches('.menu-button')) {
    if (menuDropdown.classList.contains('show')) {
      menuDropdown.style.opacity = '0';
      setTimeout(() => {
        menuDropdown.classList.remove('show');
        menuDropdown.style.opacity = '';
      }, 300);
    }
  }
});



//Botão de Topo.
document.getElementById('back-to-top').addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rola suavemente para o topo.
    });
});



// Lista local usada temporariamente (será alimentada com dados do Supabase)
const avaliacoes = [];

// Formata a data para exibição amigável
function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(data));
}

// Gera avatar com inicial do nome
function gerarAvatar(nome) {
  const inicial = nome.charAt(0).toUpperCase();
  return `<div class="avatar">${inicial}</div>`;
}

// Renderiza as avaliações na tela
function renderAvaliacoes() {
  const container = document.getElementById('lista-avaliacoes');
  container.innerHTML = '';

  avaliacoes.forEach(avaliacao => {
    container.innerHTML += `
      <div class="avaliacao">
        ${gerarAvatar(avaliacao.nome)}
        <strong>${avaliacao.nome || 'Anônimo'}</strong>
        <div class="estrelas">${'★'.repeat(avaliacao.nota)}${'☆'.repeat(5 - avaliacao.nota)}</div>
        <p>${avaliacao.comentario}</p>
        <small>Publicado em: ${formatarData(avaliacao.data)}</small>
      </div>
    `;
  });
}

// Exibe a média das avaliações
function exibirMediaAvaliacoes() {
  const totalAvaliacoes = avaliacoes.length;
  if (totalAvaliacoes === 0) return;

  const somaNotas = avaliacoes.reduce((total, avaliacao) => total + avaliacao.nota, 0);
  const media = somaNotas / totalAvaliacoes;
  const mediaFormatada = media.toFixed(1);

  const mediaElemento = document.getElementById("media-avaliacoes");
  mediaElemento.innerText = `⭐ ${mediaFormatada} de 5 (${totalAvaliacoes} avaliações)`;
}

// Carrega avaliações do Supabase e renderiza
async function carregarAvaliacoesDoSupabase() {
  const { data, error } = await supabase
    .from('avaliacoes')
    .select('*')
    .order('data', { ascending: false });

  if (error) {
    console.error('Erro ao carregar avaliações:', error);
    return;
  }

  avaliacoes.length = 0; // Limpa o array local
  avaliacoes.push(...data.map(av => ({
    ...av,
    data: new Date(av.data)
  })));

  renderAvaliacoes();
  exibirMediaAvaliacoes();
}

// Evento de envio do formulário
document.getElementById('form-avaliacao').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const nota = parseInt(document.getElementById('nota').value);
  const comentario = document.getElementById('comentario').value;

  if (comentario.trim() !== '') {
    // Salva no banco de dados Supabase
    const { error } = await supabase.from('avaliacoes').insert([
      {
        nome,
        nota,
        comentario,
        data: new Date().toISOString()
      }
    ]);

    if (error) {
      alert('Erro ao salvar avaliação!');
      console.error(error);
      return;
    }

    // Após salvar, recarrega a lista
    carregarAvaliacoesDoSupabase();
    this.reset(); // Limpa o formulário
  }
});

// Ao carregar a página, busca as avaliações no Supabase
carregarAvaliacoesDoSupabase();

