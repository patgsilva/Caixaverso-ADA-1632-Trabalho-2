const modalVendas = document.querySelector("#listaVendasModal");

const STORAGE_KEY_PEDIDOS = "pedidos_do_dia";

const categorias = {
    "bebidas-alcoolicas": "Bebidas Alcoólicas",
    "bebidas-nao-alcoolicas": "Bebidas Não Alcoólicas",
    "lanches": "Lanches"
};

export function carregarPedidosDaSession() {
    const salvo = sessionStorage.getItem(STORAGE_KEY_PEDIDOS);
    return salvo ? JSON.parse(salvo) : [];
}

function limparPedidosDaSession() {
    sessionStorage.removeItem(STORAGE_KEY_PEDIDOS);
}


function formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

function formatarHorario(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}


function renderizarRelatorio() {
    const pedidos = carregarPedidosDaSession();

    renderizarResumo(pedidos);
    renderizarCategorias(pedidos);
    renderizarRanking(pedidos);
    renderizarListaPedidos(pedidos);
}

function renderizarResumo(pedidos) {
    const total = pedidos.reduce((acc, p) => acc + p.total, 0);
    const qtd = pedidos.length;
    const ticketMedio = qtd > 0 ? total / qtd : 0;

    document.querySelector("#vendasTotal").textContent = formatarValor(total);
    document.querySelector("#vendasQtdPedidos").textContent = qtd;
    document.querySelector("#vendasTicketMedio").textContent = formatarValor(ticketMedio);
}

function renderizarCategorias(pedidos) {
    const tbody = document.querySelector("#tabelaCategoriasBody");
    tbody.innerHTML = "";

    if (pedidos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="vendas-vazio-msg">Nenhum pedido registrado.</td></tr>`;
        return;
    }

    const totalGeral = pedidos.reduce((acc, p) => acc + p.total, 0);

    // Acumula por categoria
    const porCategoria = {};
    pedidos.forEach(pedido => {
        pedido.itens.forEach(item => {
            const cat = item.categoria ?? "outros";
            if (!porCategoria[cat]) porCategoria[cat] = { qtd: 0, total: 0 };
            porCategoria[cat].qtd += item.quantidade;
            porCategoria[cat].total += item.quantidade * item.valor;
        });
    });

    Object.entries(porCategoria)
        .sort((a, b) => b[1].total - a[1].total)
        .forEach(([cat, dados]) => {
            const percentual = totalGeral > 0 ? (dados.total / totalGeral * 100).toFixed(1) : "0.0";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${categorias[cat] ?? cat}</td>
                <td>${dados.qtd}</td>
                <td>${formatarValor(dados.total)}</td>
                <td>${percentual}%</td>`;
            tbody.appendChild(tr);
        });
}

function renderizarRanking(pedidos) {
    const tbody = document.querySelector("#tabelaRankingBody");
    tbody.innerHTML = "";

    if (pedidos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="vendas-vazio-msg">Nenhum pedido registrado.</td></tr>`;
        return;
    }

    // Acumula por item
    const porItem = {};
    pedidos.forEach(pedido => {
        pedido.itens.forEach(item => {
            if (!porItem[item.id]) porItem[item.id] = { nome: item.nome, qtd: 0, total: 0, valor: item.valor };
            porItem[item.id].qtd += item.quantidade;
            porItem[item.id].total += item.quantidade * item.valor;
        });
    });

    const ranking = Object.values(porItem).sort((a, b) => b.qtd - a.qtd);
    const medalhas = ["ouro", "prata", "bronze"];

    ranking.forEach((item, index) => {
        const medalha = medalhas[index] ?? "";
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span class="vendas-rank-badge ${medalha}">${index + 1}</span></td>
            <td>${item.nome}</td>
            <td>${item.qtd}</td>
            <td>${formatarValor(item.total)}</td>`;
        tbody.appendChild(tr);
    });
}

function renderizarListaPedidos(pedidos) {
    const container = document.querySelector("#vendasListaPedidos");
    container.innerHTML = "";

    if (pedidos.length === 0) {
        container.innerHTML = `<p class="vendas-vazio-msg">Nenhum pedido registrado.</p>`;
        return;
    }

    pedidos.forEach((pedido, index) => {
        const div = document.createElement("div");
        div.className = "vendas-pedido-card";

        const itensHTML = pedido.itens.map(item => `
            <tr>
                <td>${item.nome}</td>
                <td>${item.quantidade}x</td>
                <td>${formatarValor(item.valor)}</td>
                <td>${formatarValor(item.quantidade * item.valor)}</td>
            </tr>`).join("");

        div.innerHTML = `
            <div class="vendas-pedido-header">
                <span class="vendas-pedido-numero">Pedido #${index + 1}</span>
                <span class="vendas-pedido-horario">${formatarHorario(pedido.horario)}</span>
                <span class="vendas-pedido-total-inline">${formatarValor(pedido.total)}</span>
            </div>
            <table class="vendas-pedido-itens">
                <tbody>${itensHTML}</tbody>
            </table>`;

        container.appendChild(div);
    });
}


document.querySelector("#abrirRelatorio").addEventListener("click", () => {
    renderizarRelatorio();
    modalVendas.showModal();
});


document.querySelector("#limparVendas").addEventListener("click", () => {
    if (!confirm("Deseja realmente limpar todas as vendas do dia?")) return;
    limparPedidosDaSession();
    renderizarRelatorio();
});


function fechar() {
    modalVendas.classList.add("fechar");
    modalVendas.addEventListener("animationend", () => {
        modalVendas.close();
        modalVendas.classList.remove("fechar");
    }, { once: true });
}

document.querySelector("#fecharVendas").addEventListener("click", fechar);
document.querySelector("#cancelarVendas").addEventListener("click", fechar);