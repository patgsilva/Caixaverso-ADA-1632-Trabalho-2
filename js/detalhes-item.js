import { ListaCardapio } from "./classes/ListaCardapio.js";

const modalDetalhes = document.querySelector("#exibirDetalhesItemModal");
const categorias = {
    "bebidas-alcoolicas": "Bebidas Alcoólicas",
    "bebidas-nao-alcoolicas": "Bebidas Não Alcoólicas",
    "lanches": "Lanches"
};

// Event delegation - funciona com IDs dinâmicos
document.addEventListener("click", (e) => {
    if (e.target.closest(".icon-btn.detalhar")) {
        const btn = e.target.closest(".icon-btn.detalhar");
        const id = btn.id.split("-")[1]; // Extrai o ID do item a partir do ID do botão

        const cardapio = new ListaCardapio();
        const prato = cardapio.buscarItemDoCardapioPorId(id);
        // carrega os detalhes do item no modal body
        document.querySelector("#detalhesNome").textContent = prato.nome;
        document.querySelector("#detalhesValor").textContent = prato.valor;
        document.querySelector("#detalhesCategoria").textContent = categorias[prato.categoria] ?? prato.categoria;
        document.querySelector("#detalhesDescricao").textContent = prato.descricao;
        document.querySelector("#detalhesImagem").src = prato.imagem;

        // Abra o modal aqui
        modalDetalhes.showModal();
    }
});

function fechar() {
modalDetalhes.classList.add("fechar");
modalDetalhes.addEventListener("animationend", () => {
	modalDetalhes.close();
	modalDetalhes.classList.remove("fechar");
}, { once: true });
}

document.querySelector("#fecharDetalhesItem").addEventListener("click", fechar);
document.querySelector("#cancelarDetalhesItem").addEventListener("click", fechar);
