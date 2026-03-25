import { PratoCardapio } from "./classes/PratoCardapio.js";
import { ListaCardapio } from "./classes/ListaCardapio.js";

const btnSalvarEditarItem = document.querySelector("#salvar-editar-item");
const modalEditar = document.querySelector("#editarItemModal");

btnSalvarEditarItem.addEventListener("click", () => {
    // Event delegation - funciona com IDs dinâmicos
    const id = document.querySelector("#idItemEditar").value; // Obtém o ID do item a ser editado do campo hidden

    const prato = new PratoCardapio(
        id,
        document.querySelector("#editarNomePrato").value,
        parseFloat(document.querySelector("#editarValorPrato").value),
        document.querySelector("#editarCategoriaPrato").value,
        document.querySelector("#editarDescricaoPrato").value,
        document.querySelector("#editarImagemPrato").value
    );
    const cardapio = new ListaCardapio();
    cardapio.editarItemDoCardapioPorId(id, prato); // Chama o método para editar o item do cardápio
    prato.atualizarCardNoDOM(); // atualiza o card no DOM

    // Após excluir o item, você pode fechar o modal
    modalEditar.classList.add("fechar");
    modalEditar.addEventListener("animationend", () => {
        modalEditar.close();
        modalEditar.classList.remove("fechar");
    }, { once: true });

});