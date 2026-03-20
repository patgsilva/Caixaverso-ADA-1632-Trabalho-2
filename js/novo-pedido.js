const modalPedido = document.querySelector("#novoPedidoModal");
const btnAbrirPedido = document.querySelector("#abrirNovoPedido");

function fechar() {
modalPedido.classList.add("fechar");
modalPedido.addEventListener("animationend", () => {
    modalPedido.close();
    modalPedido.classList.remove("fechar");
}, { once: true });
}

btnAbrirPedido.addEventListener("click", () => modalPedido.showModal());
document.querySelector("#fecharNovoPedido").addEventListener("click", fechar);
document.querySelector("#cancelarNovoPedido").addEventListener("click", fechar);
