// Menu Principal.
const menuButton = document.querySelector(".menu-button");
const menuDropdown = document.querySelector(".menu-dropdown");

menuButton.addEventListener("click", () => {
  if (menuDropdown.classList.contains("show")) {
    // Se o menu estiver visível, aciona o efeito de saída
    menuDropdown.style.opacity = "0";
    setTimeout(() => {
      menuDropdown.classList.remove("show");
      menuDropdown.style.opacity = "";
    }, 300);
  } else {
    // Se o menu estiver escondido, mostra o menu
    menuDropdown.classList.add("show");
  }
});

window.addEventListener("click", (event) => {
  if (!event.target.matches(".menu-button")) {
    if (menuDropdown.classList.contains("show")) {
      menuDropdown.style.opacity = "0";
      setTimeout(() => {
        menuDropdown.classList.remove("show");
        menuDropdown.style.opacity = "";
      }, 300);
    }
  }
});

//Botão de Topo.
document.getElementById("back-to-top").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Rola suavemente para o topo.
  });
});

//Carrinho & Catálogo.
// Lista de produtos disponíveis
const produtos = [
  {
    nome: "Hambúrguer de Grão-de-Bico",
    preco: 24.9,
    categoria: "sanduiche",
    imagem: "imagens/inicio.png",
  },
  {
    nome: "Suco Detox",
    preco: 9.5,
    categoria: "bebida",
    imagem: "imagens/inicio.png",
  },
  {
    nome: "Brownie Vegano",
    preco: 14.0,
    categoria: "sobremesa",
    imagem: "imagens/inicio.png",
  },
  {
    nome: "Wrap de Tofu",
    preco: 21.3,
    categoria: "sanduiche",
    imagem: "imagens/inicio.png",
  },
  {
    nome: "Smoothie de Frutas",
    preco: 11.5,
    categoria: "bebida",
    imagem: "imagens/inicio.png",
  },
  {
    nome: "Mousse de Abacate",
    preco: 16.9,
    categoria: "sobremesa",
    imagem: "imagens/inicio.png",
  },
];

// Elementos do DOM
const catalogo = document.getElementById("catalogo");
const filtro = document.getElementById("filtro");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const carrinhoButton = document.querySelector(".carrinho-button");
const carrinhoAba = document.querySelector(".carrinho-aba");

let carrinho = [];

// Renderiza o catálogo com base na categoria selecionada
function renderCatalogo(filtrarCategoria = "todos") {
  catalogo.innerHTML = "";
  produtos.forEach((produto, index) => {
    if (filtrarCategoria !== "todos" && produto.categoria !== filtrarCategoria)
      return;

    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
  <img src="${produto.imagem}" alt="${
      produto.nome
    }" style="width:100%; border-radius:8px; margin-bottom:10px;">
  <h4>${produto.nome}</h4>
  <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
  <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
`;

    catalogo.appendChild(div);
  });
}

// Adiciona produto ao carrinho
function adicionarAoCarrinho(index) {
  carrinho.push(produtos[index]);
  atualizarCarrinho();
}

// Remove produto do carrinho
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// Atualiza a lista de itens e o total do carrinho
function atualizarCarrinho() {
  const quantidadeSpan = carrinhoButton.querySelector("#carrinho-quantidade");
  if (quantidadeSpan) {
    quantidadeSpan.textContent = carrinho.length;
  } else {
    const span = document.createElement("span");
    span.id = "carrinho-quantidade";
    span.textContent = carrinho.length;
    carrinhoButton.appendChild(span);
  }

  listaCarrinho.innerHTML = "";
  let total = 0;
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
  <div style="display: flex; justify-content: space-between;">
    <span>${item.nome}</span>
    <strong>R$ ${item.preco.toFixed(2)}</strong>
  </div>
`;
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.onclick = () => removerDoCarrinho(index);
    li.appendChild(btnRemover);
    listaCarrinho.appendChild(li);
    total += item.preco;
  });
  totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
  // Atualiza o botão do carrinho
  carrinhoButton.textContent = "CARRINHO";
  carrinhoButton.appendChild(quantidadeSpan);
}

// Evento para aplicar filtro ao mudar o select
filtro.addEventListener("change", () => {
  renderCatalogo(filtro.value);
});

// Exibe ou oculta o carrinho ao clicar no botão (com efeito de deslize)
function toggleCarrinho() {
  carrinhoAba.classList.toggle("show");
}

// Fecha a aba do carrinho se clicar fora dela (com efeito de deslize)
document.addEventListener("click", (event) => {
  const isClickInsideCarrinho = carrinhoAba.contains(event.target);
  const isClickNoBotaoCarrinho = carrinhoButton.contains(event.target);

  if (
    !isClickInsideCarrinho &&
    !isClickNoBotaoCarrinho &&
    carrinhoAba.classList.contains("show")
  ) {
    carrinhoAba.classList.remove("show");
  }
});

// Finaliza o pedido
document.getElementById("finalizar-pedido").addEventListener("click", () => {
  window.location.href = "meus-pedidos.html";
});

// Renderização inicial do catálogo
renderCatalogo();
