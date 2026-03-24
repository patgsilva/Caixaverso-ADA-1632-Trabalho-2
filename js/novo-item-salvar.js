const btnSalvarItem = document.querySelector("#salvar-novo-item");
btnSalvarItem.addEventListener("click", salvar);

class PratoCardapio {
    constructor(id, nome, valor, categoria, descricao, imagem) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.categoria = categoria;
        this.descricao = descricao;
        this.imagem = imagem;
    }

    criarCardNoDOM() {
        let cardapioContainer;
        if (this.categoria === "lanches") {
            cardapioContainer = document.querySelector(".grid-cardapio.lanches");
        }
        else if (this.categoria === "bebidas") {
            cardapioContainer = document.querySelector(".grid-cardapio.bebidas");
        }

        // Cria o card principal
        const card = document.createElement("div");
        card.className = "card card-cardapio";

        // Cria um div hidden para o id do prato
        const idHidden = document.createElement("input");
        idHidden.type = "hidden";
        idHidden.value = this.id;
        card.appendChild(idHidden);

        // Cria o div para texto
        const cardapioTexto = document.createElement("div");
        cardapioTexto.className = "cardapio-texto";

        const titulo = document.createElement("h2");
        titulo.className = "montserrat-titulo";
        titulo.textContent = this.nome;

        const descricao = document.createElement("p");
        descricao.className = "domine-corpo-texto";
        descricao.textContent = this.descricao;

        const valor = document.createElement("p");
        valor.className = "domine-valor";
        valor.textContent = `R$ ${this.valor.toFixed(2).replace('.', ',')}`;

        cardapioTexto.appendChild(titulo);
        cardapioTexto.appendChild(descricao);
        cardapioTexto.appendChild(valor);

        // Cria o div para imagem
        const cardapioImagem = document.createElement("div");
        cardapioImagem.className = "cardapio-imagem";

        const img = document.createElement("img");
        img.src = this.imagem;
        img.alt = `Imagem do ${this.nome}`;

        cardapioImagem.appendChild(img);

        // Cria o div para ações
        const cardapioAcoes = document.createElement("div");
        cardapioAcoes.className = "cardapio-acoes";

        const btnDetalhar = document.createElement("button");
        btnDetalhar.className = "icon-btn detalhar";
        btnDetalhar.setAttribute("aria-label", "Detalhes");
        btnDetalhar.innerHTML = '<span class="material-icons">visibility</span>';

        const btnEditar = document.createElement("button");
        btnEditar.className = "icon-btn editar";
        btnEditar.setAttribute("aria-label", "Editar");
        btnEditar.innerHTML = '<span class="material-icons">edit</span>';

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "icon-btn excluir";
        btnExcluir.setAttribute("aria-label", "Excluir");
        btnExcluir.innerHTML = '<span class="material-icons">delete</span>';

        cardapioAcoes.appendChild(btnDetalhar);
        cardapioAcoes.appendChild(btnEditar);
        cardapioAcoes.appendChild(btnExcluir);

        // Monta o card
        card.appendChild(cardapioTexto);
        card.appendChild(cardapioImagem);
        card.appendChild(cardapioAcoes);

        // Adiciona ao container
        cardapioContainer.appendChild(card);
    }
}

class ListaCardapio {
    
    constructor() {
        this.pratos = [];
    }

    salvarPratoNaLista(prato) {
        this.pratos.push(prato);
        this.salvarCardapioNoLocalStorage();
    }

    buscarCardapioNoLocalStorage() {
        const cardapioSalvo = localStorage.getItem("cardapio_db");
        console.log("Cardápio carregado do localStorage:", cardapioSalvo);
        if (cardapioSalvo) {
            try {
                this.pratos = JSON.parse(cardapioSalvo);
            } catch (e) {
                console.error("Erro ao carregar cardápio do localStorage:", e);
                this.pratos = [];
            }
        }
    }

    salvarCardapioNoLocalStorage() {
        localStorage.setItem("cardapio_db", JSON.stringify(this.pratos));
    }

    carregarItensDoCardapio() {
        this.buscarCardapioNoLocalStorage();
        
        // Separa os pratos por categoria
        const bebidas = this.pratos.filter(prato => prato.categoria === "bebidas");
        const lanches = this.pratos.filter(prato => prato.categoria === "lanches");
        
        // Itera sobre bebidas e adiciona ao DOM
        bebidas.forEach(prato => {
            const pratoObj = new PratoCardapio(prato.id, prato.nome, prato.valor, prato.categoria, prato.descricao, prato.imagem);
            pratoObj.criarCardNoDOM();
        });
        
        // Itera sobre lanches e adiciona ao DOM
        lanches.forEach(prato => {
            const pratoObj = new PratoCardapio(prato.id, prato.nome, prato.valor, prato.categoria, prato.descricao, prato.imagem);
            pratoObj.criarCardNoDOM();
        });
    }
}

function salvar(e) {
    e.preventDefault(); 
    
    const id = Date.now(); // Gera um ID único
    const nome = document.querySelector("#nomePrato").value;
    const valor = parseFloat(document.querySelector("#valorPrato").value);
    const categoria = document.querySelector("#categoriaPrato").value;
    const descricao = document.querySelector("#descricaoPrato").value;
    const imagem = document.querySelector("#imagemPrato").value;

    const novoPrato = new PratoCardapio(id, nome, valor, categoria, descricao, imagem);
    novoPrato.criarCardNoDOM();
    const listaCardapio = new ListaCardapio();
    listaCardapio.buscarCardapioNoLocalStorage();
    listaCardapio.salvarPratoNaLista(novoPrato);
    listaCardapio.salvarCardapioNoLocalStorage();

    // copiada mesma logica do botão fechar do modal
    modalItem.classList.add("fechar");
    modalItem.addEventListener("animationend", () => {
        modalItem.close();
        modalItem.classList.remove("fechar");
    }, { once: true });

}

