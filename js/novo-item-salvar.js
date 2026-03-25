import { PratoCardapio } from "./classes/PratoCardapio.js";
import { ListaCardapio } from "./classes/ListaCardapio.js";

const modalItem = document.querySelector("#novoItemModal");
const btnSalvarItem = document.querySelector("#salvar-novo-item");
btnSalvarItem.addEventListener("click", salvar);

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

    // copiada mesma logica do botão fechar do modal
    modalItem.classList.add("fechar");
    modalItem.addEventListener("animationend", () => {
        modalItem.close();
        modalItem.classList.remove("fechar");
    }, { once: true });

}

