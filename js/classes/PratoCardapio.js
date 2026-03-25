export class PratoCardapio {

    static #LIMITE_DESCRICAO = 30;

    constructor(id, nome, valor, categoria, descricao, imagem) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.categoria = categoria;
        this.descricao = descricao;
        this.imagem = imagem;
    }

    _truncarDescricao(descricao) {
        return descricao.length > PratoCardapio.#LIMITE_DESCRICAO ? descricao.substring(0, PratoCardapio.#LIMITE_DESCRICAO) + "..." : descricao;
    }

    criarCardNoDOM() {
        let cardapioContainer;
        if (this.categoria === "lanches") {
            cardapioContainer = document.querySelector(".grid-cardapio.lanches");
        } else if (this.categoria === "bebidas-alcoolicas") {
            cardapioContainer = document.querySelector(".grid-cardapio.bebidas-alcoolicas");
        } else if (this.categoria === "bebidas-nao-alcoolicas") {
            cardapioContainer = document.querySelector(".grid-cardapio.bebidas-nao-alcoolicas");
        }

        if (!cardapioContainer) {
            console.error(`Categoria não reconhecida: "${this.categoria}"`);
            return;
        }

        const card = document.createElement("div");
        card.className = "card card-cardapio";

        const idHidden = document.createElement("input");
        idHidden.type = "hidden";
        idHidden.value = this.id;
        card.appendChild(idHidden);

        const cardapioTexto = document.createElement("div");
        cardapioTexto.className = "cardapio-texto";

        const titulo = document.createElement("h2");
        titulo.className = "montserrat-titulo";
        titulo.textContent = this.nome;

        const descricao = document.createElement("p");
        descricao.className = "domine-corpo-texto";
        descricao.textContent = this._truncarDescricao(this.descricao); // truncado

        const valor = document.createElement("p");
        valor.className = "domine-valor";
        valor.textContent = `R$ ${this.valor.toFixed(2).replace('.', ',')}`;

        cardapioTexto.appendChild(titulo);
        cardapioTexto.appendChild(descricao);
        cardapioTexto.appendChild(valor);

        const cardapioImagem = document.createElement("div");
        cardapioImagem.className = "cardapio-imagem";

        const img = document.createElement("img");
        img.src = this.imagem;
        img.alt = `Imagem do ${this.nome}`;
        cardapioImagem.appendChild(img);

        const cardapioAcoes = document.createElement("div");
        cardapioAcoes.className = "cardapio-acoes";

        const btnDetalhar = document.createElement("button");
        btnDetalhar.className = "icon-btn detalhar";
        btnDetalhar.id = `detalhar-${this.id}`;
        btnDetalhar.setAttribute("aria-label", "Detalhes");
        btnDetalhar.innerHTML = '<span class="material-icons">visibility</span>';

        const btnEditar = document.createElement("button");
        btnEditar.className = "icon-btn editar";
        btnEditar.id = `editar-${this.id}`;
        btnEditar.setAttribute("aria-label", "Editar");
        btnEditar.innerHTML = '<span class="material-icons">edit</span>';

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "icon-btn excluir";
        btnExcluir.id = `excluir-${this.id}`;
        btnExcluir.setAttribute("aria-label", "Excluir");
        btnExcluir.innerHTML = '<span class="material-icons">delete</span>';

        cardapioAcoes.appendChild(btnDetalhar);
        cardapioAcoes.appendChild(btnEditar);
        cardapioAcoes.appendChild(btnExcluir);

        card.appendChild(cardapioTexto);
        card.appendChild(cardapioImagem);
        card.appendChild(cardapioAcoes);

        cardapioContainer.appendChild(card);
    }

    atualizarCardNoDOM() {
        const cards = document.querySelectorAll(".card-cardapio");
        let card = null;
        cards.forEach(c => {
            const input = c.querySelector("input[type='hidden']");
            if (input && String(input.value) === String(this.id)) {
                card = c;
            }
        });

        if (!card) {
            console.error(`Card com id ${this.id} não encontrado no DOM`);
            return;
        }

        card.querySelector(".montserrat-titulo").textContent = this.nome;
        card.querySelector(".domine-corpo-texto").textContent = this._truncarDescricao(this.descricao); // truncado
        card.querySelector(".domine-valor").textContent = `R$ ${this.valor.toFixed(2).replace('.', ',')}`;
        card.querySelector("img").src = this.imagem;
        card.querySelector("img").alt = `Imagem do ${this.nome}`;

        const containerAtual = card.parentElement;
        const categoriaAtual = containerAtual.classList[1];

        if (categoriaAtual !== this.categoria) {
            const novoContainer = document.querySelector(`.grid-cardapio.${this.categoria}`);
            if (!novoContainer) {
                console.error(`Container para categoria "${this.categoria}" não encontrado`);
                return;
            }
            novoContainer.appendChild(card);
        }
    }
}