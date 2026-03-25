import { ListaCardapio } from "./classes/ListaCardapio.js";

const listaCardapio = new ListaCardapio();

document.addEventListener("DOMContentLoaded", () => {
    listaCardapio.carregarItensDoCardapio();
});
