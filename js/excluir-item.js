import { ListaCardapio } from "./classes/ListaCardapio.js";

const modalExcluir = document.querySelector("#excluirItemModal");

// Event delegation - funciona com IDs dinâmicos
document.addEventListener("click", (e) => {
    if (e.target.closest(".icon-btn.excluir")) {
        const btn = e.target.closest(".icon-btn.excluir");
        const id = btn.id.split("-")[1]; // Extrai o ID do item a partir do ID do botão

        const cardapio = new ListaCardapio();
        const prato = cardapio.buscarItemDoCardapioPorId(id);
        // carrega os detalhes do item no modal
        document.querySelector(".item-a-excluir").innerHTML = `Tem certeza que deseja excluir o item <strong>"${prato.nome}"</strong>? Essa ação não pode ser desfeita.`;
        
        //adiciona o ID do item a ser excluído em um campo hidden no modal para ser usado na confirmação
        document.querySelector("#idItemExcluir").value = id;

        // Abra o modal aqui
        modalExcluir.showModal();
    }
});

function fechar() {
modalExcluir.classList.add("fechar");
modalExcluir.addEventListener("animationend", () => {
	modalExcluir.close();
	modalExcluir.classList.remove("fechar");
}, { once: true });
}

document.querySelector("#fecharExcluirItemModal").addEventListener("click", fechar);
document.querySelector("#cancelarExcluirItemModal").addEventListener("click", fechar);