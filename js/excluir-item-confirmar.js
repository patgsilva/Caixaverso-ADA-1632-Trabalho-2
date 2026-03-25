import { ListaCardapio } from "./classes/ListaCardapio.js";

const btnExcluirItem = document.querySelector("#confirmarExcluirItemModal");
const modalExcluir = document.querySelector("#excluirItemModal");

btnExcluirItem.addEventListener("click", () => {
    // Event delegation - funciona com IDs dinâmicos
    const id = document.querySelector("#idItemExcluir").value; // Obtém o ID do item a ser excluído do campo hidden

    const cardapio = new ListaCardapio();
    cardapio.excluirItemDoCardapioPorId(id); // Chama o método para excluir o item do cardápio
    //remover DOM do item excluído
    const itemExcluir = document.querySelector(`.card-cardapio input[type="hidden"][value="${id}"]`);
    if (itemExcluir) {
        itemExcluir.parentElement.remove();
    }
    // Após excluir o item, você pode fechar o modal
    modalExcluir.classList.add("fechar");
    modalExcluir.addEventListener("animationend", () => {
        modalExcluir.close();
        modalExcluir.classList.remove("fechar");
    }, { once: true });

});