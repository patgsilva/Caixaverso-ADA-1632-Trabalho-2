import { PratoCardapio } from "./PratoCardapio.js";

export class ListaCardapio {
    
    constructor() {
        this.pratos = [];
    }

    salvarPratoNaLista(prato) {
        this.pratos.push(prato);
        this.salvarCardapioNoLocalStorage();
    }

    buscarCardapioNoLocalStorage() {
        const cardapioSalvo = localStorage.getItem("cardapio_db");
        //console.log("Cardápio carregado do localStorage:", cardapioSalvo);
        if (cardapioSalvo) {
            try {
                this.pratos = JSON.parse(cardapioSalvo);
            } catch (e) {
                console.error("Erro ao carregar cardápio do localStorage:", e);
                this.pratos = [];
            }
        }
        return this.pratos;
    }

    salvarCardapioNoLocalStorage() {
        localStorage.setItem("cardapio_db", JSON.stringify(this.pratos));
    }

    carregarItensDoCardapio() {
        this.pratos = this.buscarCardapioNoLocalStorage();

        // Separa os pratos por categoria
        const bebidasAlcoolicas = this.pratos.filter(prato => prato.categoria === "bebidas-alcoolicas");
        const bebidasNaoAlcoolicas = this.pratos.filter(prato => prato.categoria === "bebidas-nao-alcoolicas");
        const lanches = this.pratos.filter(prato => prato.categoria === "lanches");
        
        // Itera sobre bebidas e adiciona ao DOM
        bebidasAlcoolicas.forEach(prato => {
            const pratoObj = new PratoCardapio(prato.id, prato.nome, prato.valor, prato.categoria, prato.descricao, prato.imagem);
            pratoObj.criarCardNoDOM();
        });

        bebidasNaoAlcoolicas.forEach(prato => {
            const pratoObj = new PratoCardapio(prato.id, prato.nome, prato.valor, prato.categoria, prato.descricao, prato.imagem);
            pratoObj.criarCardNoDOM();
        });
        
        // Itera sobre lanches e adiciona ao DOM
        lanches.forEach(prato => {
            const pratoObj = new PratoCardapio(prato.id, prato.nome, prato.valor, prato.categoria, prato.descricao, prato.imagem);
            pratoObj.criarCardNoDOM();
        });
    }

    buscarItemDoCardapioPorId(id) {
        const cardapioSalvo = this.buscarCardapioNoLocalStorage();
        if (!cardapioSalvo) return null;
        const item = cardapioSalvo.find(prato => String(prato.id) === String(id));
        console.log("Item encontrado no cardápio:", item);
        return item;
    }

    excluirItemDoCardapioPorId(id) {
        const cardapioSalvo = this.buscarCardapioNoLocalStorage();
        if (!cardapioSalvo) return null;
        const cardapioFiltrado = cardapioSalvo.filter(prato => String(prato.id) !== String(id));
        this.pratos = cardapioFiltrado;
        this.salvarCardapioNoLocalStorage();
    }

    editarItemDoCardapioPorId(id, novoPrato) {
        const cardapioSalvo = this.buscarCardapioNoLocalStorage();
        if (!cardapioSalvo) return null;
        const index = cardapioSalvo.findIndex(prato => String(prato.id) === String(id));
        if (index !== -1) {
            cardapioSalvo[index] = novoPrato;
            this.pratos = cardapioSalvo;
            this.salvarCardapioNoLocalStorage();
        }
    }
}