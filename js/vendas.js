const modalVendas = document.querySelector("#listaVendasModal");
const btnAbrirVendas = document.querySelector("#abrirRelatorio");

function fechar() {
modalVendas.classList.add("fechar");
modalVendas.addEventListener("animationend", () => {
	modalVendas.close();
	modalVendas.classList.remove("fechar");
}, { once: true });
}

btnAbrirVendas.addEventListener("click", () => modalVendas.showModal());
document.querySelector("#fecharVendas").addEventListener("click", fechar);
document.querySelector("#cancelarVendas").addEventListener("click", fechar);
