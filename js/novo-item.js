const modalItem = document.querySelector("#novoItemModal");
const btnAbrirItem = document.querySelector("#abrirNovoItem");

function fechar() {
modalItem.classList.add("fechar");
modalItem.addEventListener("animationend", () => {
    modalItem.close();
    modalItem.classList.remove("fechar");
}, { once: true });
}

btnAbrirItem.addEventListener("click", () => modalItem.showModal());
document.querySelector("#fecharNovoItem").addEventListener("click", fechar);
document.querySelector("#fecharModalItem").addEventListener("click", fechar);
