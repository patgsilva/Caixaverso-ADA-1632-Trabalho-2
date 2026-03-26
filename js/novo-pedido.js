import { ListaCardapio } from "./classes/ListaCardapio.js";

const modalPedido = document.querySelector("#novoPedidoModal");
const selectItem = document.querySelector("#itemPedido");
const inputQuantidade = document.querySelector("#quantidadePedido");
const tabelaBody = document.querySelector("#tabelaPedidoBody");
const pedidoTotal = document.querySelector("#pedidoTotal");

const STORAGE_KEY_RASCUNHO = "pedido_atual";
const STORAGE_KEY_PEDIDOS  = "pedidos_do_dia";


const categorias = {
    "bebidas-alcoolicas": "Bebidas Alcoólicas",
    "bebidas-nao-alcoolicas": "Bebidas Não Alcoólicas",
    "lanches": "Lanches"
};


function carregarSelectCardapio() {
    const cardapio = new ListaCardapio();
    const pratos = cardapio.buscarCardapioNoLocalStorage();

    selectItem.innerHTML = '<option value="" disabled selected>Selecione um item</option>';

    if (!pratos || pratos.length === 0) {
        const opt = document.createElement("option");
        opt.disabled = true;
        opt.textContent = "Nenhum item cadastrado no cardápio";
        selectItem.appendChild(opt);
        return;
    }

    const grupos = {};
    pratos.forEach(prato => {
        if (!grupos[prato.categoria]) grupos[prato.categoria] = [];
        grupos[prato.categoria].push(prato);
    });

    Object.entries(grupos).forEach(([cat, itens]) => {
        const optgroup = document.createElement("optgroup");
        optgroup.label = categorias[cat] ?? cat;
        itens.forEach(prato => {
            const opt = document.createElement("option");
            opt.value = String(prato.id);
            opt.textContent = `${prato.nome} — R$ ${prato.valor.toFixed(2).replace('.', ',')}`;
            opt.dataset.nome = prato.nome;
            opt.dataset.valor = prato.valor;
            opt.dataset.categoria = prato.categoria;
            optgroup.appendChild(opt);
        });
        selectItem.appendChild(optgroup);
    });
}


function salvarRascunho(itens) {
    sessionStorage.setItem(STORAGE_KEY_RASCUNHO, JSON.stringify(itens));
}

function carregarRascunho() {
    const salvo = sessionStorage.getItem(STORAGE_KEY_RASCUNHO);
    return salvo ? JSON.parse(salvo) : [];
}

function limparRascunho() {
    sessionStorage.removeItem(STORAGE_KEY_RASCUNHO);
}


function salvarPedidoConfirmado(itens) {
    const pedidos = carregarPedidosConfirmados();
    const total = itens.reduce((acc, item) => acc + item.quantidade * item.valor, 0);
    pedidos.push({
        horario: new Date().toISOString(),
        itens,
        total
    });
    sessionStorage.setItem(STORAGE_KEY_PEDIDOS, JSON.stringify(pedidos));
}

function carregarPedidosConfirmados() {
    const salvo = sessionStorage.getItem(STORAGE_KEY_PEDIDOS);
    return salvo ? JSON.parse(salvo) : [];
}


function renderizarTabela(itens) {
    tabelaBody.innerHTML = "";

    if (itens.length === 0) {
        tabelaBody.innerHTML = `
            <tr id="pedido-vazio">
                <td colspan="5" class="pedido-vazio-msg">Nenhum item adicionado.</td>
            </tr>`;
        atualizarTotal(itens);
        return;
    }

    itens.forEach((item, index) => {
        const subtotal = item.quantidade * item.valor;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.valor.toFixed(2).replace('.', ',')}</td>
            <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
            <td>
                <button class="btn-remover-item-pedido" data-index="${index}" aria-label="Remover">
                    <span class="material-icons" style="font-size:1rem;">delete</span>
                </button>
            </td>`;
        tabelaBody.appendChild(tr);
    });

    atualizarTotal(itens);
}

function atualizarTotal(itens) {
    const total = itens.reduce((acc, item) => acc + item.quantidade * item.valor, 0);
    pedidoTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}


document.querySelector("#adicionarItemPedido").addEventListener("click", () => {
    const opcao = selectItem.options[selectItem.selectedIndex];

    if (!selectItem.value) {
        alert("Selecione um item do cardápio.");
        return;
    }

    const quantidade = parseInt(inputQuantidade.value);
    if (!quantidade || quantidade < 1) {
        alert("Informe uma quantidade válida.");
        return;
    }

    const itens = carregarRascunho();
    const existente = itens.find(i => String(i.id) === selectItem.value);

    if (existente) {
        existente.quantidade += quantidade;
    } else {
        itens.push({
            id: selectItem.value,
            nome: opcao.dataset.nome,
            valor: parseFloat(opcao.dataset.valor),
            categoria: opcao.dataset.categoria,
            quantidade
        });
    }

    salvarRascunho(itens);
    renderizarTabela(itens);

    selectItem.selectedIndex = 0;
    inputQuantidade.value = 1;
});


tabelaBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-remover-item-pedido");
    if (!btn) return;

    const index = parseInt(btn.dataset.index);
    const itens = carregarRascunho();
    itens.splice(index, 1);
    salvarRascunho(itens);
    renderizarTabela(itens);
});


document.querySelector("#limparPedido").addEventListener("click", () => {
    limparRascunho();
    renderizarTabela([]);
});


document.querySelector("#confirmarNovoPedido").addEventListener("click", () => {
    const itens = carregarRascunho();

    if (itens.length === 0) {
        alert("Adicione ao menos um item ao pedido.");
        return;
    }

    salvarPedidoConfirmado(itens); // salva na lista de pedidos do dia
    limparRascunho();
    fechar();
});


document.querySelector("#abrirNovoPedido").addEventListener("click", () => {
    carregarSelectCardapio();
    renderizarTabela(carregarRascunho());
    modalPedido.showModal();
});


function fechar() {
    modalPedido.classList.add("fechar");
    modalPedido.addEventListener("animationend", () => {
        modalPedido.close();
        modalPedido.classList.remove("fechar");
    }, { once: true });
}

document.querySelector("#fecharNovoPedido").addEventListener("click", fechar);
document.querySelector("#cancelarNovoPedido").addEventListener("click", fechar);