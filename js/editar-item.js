import { ListaCardapio } from "./classes/ListaCardapio.js";

const modalEditar = document.querySelector("#editarItemModal");

// Event delegation - funciona com IDs dinâmicos
document.addEventListener("click", (e) => {
    if (e.target.closest(".icon-btn.editar")) {
        const btn = e.target.closest(".icon-btn.editar");
        const id = btn.id.split("-")[1]; // Extrai o ID do item a partir do ID do botão
        const cardapio = new ListaCardapio();
        const prato = cardapio.buscarItemDoCardapioPorId(id);
        // carrega os detalhes do item no modal body
        document.querySelector("#idItemEditar").value = id; // Armazena o ID do item a ser editado em um campo hidden para uso posterior
        document.querySelector("#editarNomePrato").value = prato.nome;
        document.querySelector("#editarValorPrato").value = prato.valor;
        document.querySelector("#editarCategoriaPrato").value = prato.categoria;
        document.querySelector("#editarDescricaoPrato").value = prato.descricao;
        document.querySelector("#editarImagemPrato").value = prato.imagem;
        // Abra o modal aqui
        modalEditar.showModal();
    }
});

function fechar() {
modalEditar.classList.add("fechar");
modalEditar.addEventListener("animationend", () => {
	modalEditar.close();
	modalEditar.classList.remove("fechar");
}, { once: true });
}

document.querySelector("#fecharEditarItemModal").addEventListener("click", fechar);
document.querySelector("#cancelarEditarItemModal").addEventListener("click", fechar);
