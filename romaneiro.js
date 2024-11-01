// Uma nova tentativa. dessa vez eu confio.

//abriu o site, vai mandar o classico e vai preencher a tabela lateral
document.addEventListener('DOMContentLoaded', () => {
    console.log("Haro World!")
    JSONando('produtos.CSV')
    SideFill()
})

let IndexAtualCliente = -1
let Listagem = JSON.parse(localStorage.getItem('clientes')) || [];
let Cliente = {};
let ContadorSelect = 0
let PecasSelect = 0
let TextoSelect = 0

//abrir o formulario
function NewCLT(){
    MacroHide()
    document.getElementById("popupForm").classList.remove("hidden");
    document.getElementById("salvadore").classList.remove("hidden");
    document.getElementById('editore').classList.add("hidden");
    document.getElementById('addpeca').classList.add("hidden");
    ClientForm.reset();
}

// Salvar o cadastro dos clientes
function Salvear(event){
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const tel = document.getElementById('tel').value;
    const vendedora = document.getElementById('vendedora').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const uf = document.getElementById('uf').value;
    Cliente = {nome, tel, vendedora, bairro, cidade, uf, pagamento: 0, transp: 0, entrega: 0, desconto: 0, pedido: [], acrescimo: false};

    Listagem.push(Cliente);

    // cria um armazenador "clientes"  com os dados do Listagem
    localStorage.setItem('clientes', JSON.stringify(Listagem));

    console.log('Array Unico:',Cliente);
    console.log('Lista Dos Arrays: ',Listagem);
    
    FechaForm()
    SideFill()
}

const SideBar = document.getElementById('listaClientes')
let editingIndex = -1;

// Preenche a barra lateral com os Clientes
function SideFill(){
    SideBar.innerHTML = '';

    const Clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const ClienteSide = document.getElementById('listaClientes');

    Clientes.forEach((cliente,index) => {
        const clienteLink = document.createElement('li')
        clienteLink.innerHTML = `
        <a href="#" data-index="${index}">${cliente.nome}</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" id="del" > 
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" id="edit">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
        </svg>
        `;
        ClienteSide.appendChild(clienteLink);

        ShowA(cliente, clienteLink);
        DelA(Clientes, clienteLink);
        EditarA(Clientes, clienteLink);
    });
};

// Adição de forma de pagamento, meio de transporte, e valor do pagamento e desconto (respectivamente)
const ElementoPgmnt = document.getElementById('pgmnt')
const ElementoTransp = document.getElementById('transp')
const ElementoPagTrans = document.getElementById('PagTrans')
const ElementoDesc = document.getElementById('desconto')

ElementoPgmnt.addEventListener('change', (event) => {
    const PgmntValor = event.target.value;
    Listagem[IndexAtualCliente]['pagamento'] = PgmntValor;
    localStorage.setItem('clientes', JSON.stringify(Listagem));
    criadorTR(Listagem[IndexAtualCliente])
    const tabela = document.getElementById("variavel2")
    MudancaPagamento(tabela, PgmntValor, Listagem[IndexAtualCliente])
    MudancaTotal()
})


ElementoTransp.addEventListener('change', (event) => {
    const TranspValor = event.target.value;
    Listagem[IndexAtualCliente]['transp'] = TranspValor;
    localStorage.setItem('clientes', JSON.stringify(Listagem));
    criadorTR(Listagem[IndexAtualCliente])
})


ElementoPagTrans.addEventListener('change', (event) => {
    const PagTransValor = event.target.value;
    Listagem[IndexAtualCliente]['entrega'] = PagTransValor;
    localStorage.setItem('clientes', JSON.stringify(Listagem));
    criadorTR(Listagem[IndexAtualCliente])
    Contagem()
})


ElementoDesc.addEventListener('change', (event) => {
    const DescValor = event.target.value;
    Listagem[IndexAtualCliente]['desconto'] = DescValor;
    localStorage.setItem('clientes', JSON.stringify(Listagem));
    criadorTR(Listagem[IndexAtualCliente])
    Contagem()
})


const bigquadro = document.getElementsByClassName('macro')[0]
const BtnPeça = document.getElementById('addpeca')
const PecaBusca = document.getElementById('pecaselect')

// Faz aparecer a tabela do Cliente
function MacroShow(){
    bigquadro.classList.remove('hidden');
    document.getElementById("popupForm").classList.add("hidden");
    BtnPeça.classList.remove('hidden')
    PecaBusca.classList.remove('hidden')
}


// Faz desaparecer a tabela do Cliente
function MacroHide(){
    bigquadro.classList.add('hidden');
    BtnPeça.classList.add('hidden')
    PecaBusca.classList.add('hidden')
}


// Fecha o formulario para adicionar ou editar Cliente
function FechaForm(){
    document.getElementById("popupForm").classList.add("hidden");
}


// Faz a Tabela do Cliente ser Preechida com os dados do mesmo
function FixaShow(cliente) {
    const fixa = document.querySelectorAll('#fixa tr');
    fixa[1].cells[0].textContent = cliente.nome || '';
    fixa[1].cells[1].textContent = cliente.tel || '';
    fixa[1].cells[2].textContent = cliente.vendedora || '';
    fixa[3].cells[0].textContent = cliente.bairro || '';
    fixa[3].cells[1].textContent = cliente.cidade || ''; 
    fixa[3].cells[2].textContent = cliente.uf || '';     

    // preenche os dados ja escolhidos de forma de pagamento, entrega, valor e desconto
    const select1 = document.getElementById('pgmnt');
    const select2 = document.getElementById('transp');
    const select3 = document.getElementById('PagTrans');
    const select4 = document.getElementById('desconto');

    select1.value = cliente.pagamento || '0';
    select2.value = cliente.transp || '0';
    select3.value = cliente.entrega || '0';
    select4.value = cliente.desconto || '0';

    
    MacroShow();
    SelectPronto(cliente);
}


// Faz aparecer os <a> na tabela central
function ShowA(cliente, clienteLink){
    const LinkCliente = clienteLink.querySelector('a');
    LinkCliente.addEventListener('click', (e) =>{
        e.preventDefault();
        const index = e.target.getAttribute('data-index');
        const tabela = document.getElementById("variavel2")
        tabela.innerHTML = `
        <table id="variavel2">
            <tr>
                <th>Qntd</th>
                <th>Descrição</th>
                <th>Unid</th>
                <th>Total</th>
                <th></th>
            </tr>
        </table>
        `
        FixaShow(cliente);
        IndexAtualCliente = index;
    });
}

// Some com o Array do Cliente e seu respectivo <a>
function DelA(Clientes, clienteLink){
    const deletare = clienteLink.querySelector('#del');
    deletare.addEventListener('click', () =>{
        const index = clienteLink.querySelector('a').getAttribute('data-index');
        Clientes.splice(index,1);
        localStorage.setItem('clientes', JSON.stringify(Clientes));
        SideFill();
    });
}

// Edita os Dados do Cliente
function EditarA(Clientes,clienteLink){
    const editar = clienteLink.querySelector('#edit');
    editar.addEventListener('click', () => {
        document.getElementById("salvadore").classList.add("hidden");
        const index = clienteLink.querySelector('a').getAttribute('data-index');

        const cliente = Clientes[index];
        if (cliente) {
            document.getElementById('nome').value = cliente.nome
            document.getElementById('tel').value = cliente.tel;
            document.getElementById('vendedora').value = cliente.vendedora;
            document.getElementById('bairro').value = cliente.bairro;
            document.getElementById('cidade').value = cliente.cidade;
            document.getElementById('uf').value = cliente.uf;

            popupForm.classList.remove('hidden');
            MacroHide();
            document.getElementById("editore").classList.remove("hidden");
            editingIndex = index;
            console.log('Index a ser Editado:', editingIndex)
            const SubmitEditore = document.getElementById('editore');
            SubmitEditore.addEventListener('click', () => {

                cliente.nome = document.getElementById('nome').value;
                cliente.tel = document.getElementById('tel').value;
                cliente.vendedora = document.getElementById('vendedora').value;
                cliente.bairro = document.getElementById('bairro').value;
                cliente.cidade = document.getElementById('cidade').value;
                cliente.uf = document.getElementById('uf').value;

                localStorage.setItem('clientes', JSON.stringify(Clientes));
                SideFill()
                FechaForm()
            });
        };
    });
};

// "liga" o select2
$(document).ready(function() {
    $('#pecaselect').select2();
});

let ListaDoCsv = []

// Insere os dados do CSV no <Select>
function JSONando(csv){
    fetch(csv)
    .then(response => {
        if (!response.ok) { 
            throw new Error('Erro: '+ response.statusText);
        }
        return response.text();
    })
    .then(csvText => {
        const resultado = Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true
        });
        ListaDoCsv = resultado.data
        console.log('Lista do CSV:',ListaDoCsv)

        const ProdutoLista = resultado.data.map(item => ({
            id: item.id,
            text: item.DESC
        }))
        
        $('#pecaselect').select2({
            data:ProdutoLista
        })
        console.log('Listagem de produtos: ', ProdutoLista)
    })
    .catch(erro => console.error('Erro ao carregar o CSV:', erro));

}


function SelectPronto(cliente){
    const SelectBotao = document.getElementById('addpeca')
    SelectBotao.addEventListener('click', () =>{
        const dados = $('#pecaselect').val();
        const texto = $('#pecaselect').find(':selected').map(function(){
            return $(this).text();
        }).get();
        TextoSelect = texto;
        PecasSelect = dados;
        const val = dados ? dados.length : 0;
        $('#pecaselect').val(null).trigger('change');
        
        i = Listagem[IndexAtualCliente].pedido.length
        const n = val + i

        console.log('pedido ponto lengfi: ',Listagem[IndexAtualCliente].pedido.length)
        console.log('conjuntos do individuo: ',i)
        while (i < n) {
            const Pecinhas = {quantidade: 1, peca: PecasSelect[i]}
            Listagem[IndexAtualCliente].pedido.push(Pecinhas)
            console.log('Adicionado as peças:',PecasSelect[i] )
            console.log('Adicionado a pecinha:', Pecinhas )
            localStorage.setItem('Listagem', JSON.stringify(Listagem));
            i++
        }
        console.log('pedido do individuo: ', Listagem[IndexAtualCliente].pedido)
        console.log('val: ', val)
        criadorTR(cliente, val, TextoSelect)
        Contagem()
    }) 
}


function criadorTR(cliente, QuantidadeAdicionada, TextoSelect){
    console.log(TextoSelect)
    let i = cliente.pedido.length
    const n = i + QuantidadeAdicionada
    const tabela = document.getElementById("variavel2")
    
    // Criação de tabela do romaneio
    // Parte mais importante do programa
    
    while (i < n){
        const NewLinha = tabela.insertRow(-1)
        NewLinha.id = `tr_${i}`
        NewLinha.className = 'TrClass'
        
        TRInput(NewLinha, i)
        descricionvalue = TRProduto(NewLinha, TextoSelect, i)
        valorunico = TRValorUn(NewLinha, cliente, i)
        TRTotal(NewLinha, valorunico, i)
        TRDelete(NewLinha, i)
        
        i++
    }

    console.log('conjuntos:', cliente.pedido.length)
    localStorage.setItem('cliente', JSON.stringify(Listagem));
    

}


// Cria o input de Qntd
function TRInput(NewLinha, i){
    const numero = NewLinha.insertCell(0)
    const numerovalue = document.createElement("input")
    numerovalue.type = "number"
    numero.appendChild(numerovalue)
    numero.id = `num_${i}`
    numerovalue.id = `numV_${i}`
    numero.className = 'NumeroTd'
    numerovalue.className = 'NumeroIn'
    numerovalue.value = 1

    numerovalue.addEventListener('change', function(){
        MudancaTotal()
    })
}


// Cria a Coluna do Produto Selecionado
function TRProduto(NewLinha, TextoSelect, i){
    const descricion = NewLinha.insertCell(1)
    const descricionvalue = document.createElement("p")
    descricionvalue.innerHTML = TextoSelect[i]
    descricion.appendChild(descricionvalue)
    descricion.className = 'DescTd'
    descricionvalue.id = `DescV_${i}`

    return descricionvalue
}


// Cria a Coluna de Valor de cada peça
function TRValorUn(NewLinha, cliente, i){
    let valorunico = 0
    const unidade = NewLinha.insertCell(2)
    let unidadevalue = document.createElement("p")
    unidade.appendChild(unidadevalue)

    if (cliente.pagamento < 3){
        valorunico = EncontrarPreco(descricionvalue)
        unidadevalue.innerHTML = `R$ ${valorunico}`
        unidade.appendChild(unidadevalue)
    }

    else{
        valorunico = (EncontrarPreco(descricionvalue) * 1.1).toFixed(2)
        unidadevalue.innerHTML = `R$ ${valorunico}`
        unidade.appendChild(unidadevalue)
    }

    unidade.id = `un_${i}`
    unidade.className = 'UnTd'
    return valorunico
}


// Cria a Coluna de Total
function TRTotal(NewLinha, valorunico, i){
    const totales = NewLinha.insertCell(3)
    const totalesvalue = document.createElement("p")
    totales.id = `Total_${i}`

    totalesvalue.innerHTML = `R$ ${valorunico}` 
    totales.appendChild(totalesvalue)
}


// Cria o icone de Apagar a Linha
function TRDelete(NewLinha, i){
    const apaga = NewLinha.insertCell(4)
    const apagavalue = document.createElement("button")
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "del");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "bi bi-x-circle");
    svg.setAttribute("viewBox", "0 0 16 16");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16");
    svg.appendChild(path1);

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708");
    svg.appendChild(path2);

    apagavalue.appendChild(svg);
    apaga.appendChild(apagavalue);

    apaga.id = `apg_${i}`
    apaga.className = `ApgTd`
    const tabela = document.getElementById("variavel2")


    apagavalue.onclick = function(){
        const linha = apagavalue.parentNode.parentNode
        const indice = linha.rowIndex
        tabela.deleteRow(indice)
        //Listagem[IndexAtualCliente]['pedidos'][i].splice
        Listagem[IndexAtualCliente].pedido.length -= 1
        localStorage.setItem('Listagem', JSON.stringify(Listagem));
        Contagem()
    }

}   

function ContadorPeço(tabela){
    const ColunaPreco = 3
    let total = 0
    for(let i=1; i < tabela.rows.length; i++){
        let texto = tabela.rows[i].cells[ColunaPreco].innerText;
        let numero = parseFloat(texto.replace('R$ ',''))
        parseFloat(total = total + (numero))
    }
}













function EncontrarPreco(pecinha){
    const descrição = pecinha.innerHTML
    const peca = ListaDoCsv.find(item => item.DESC == descrição);
    if (peca){
        return peca.PRECO
    }
}


function MudancaTotal(){
    const ColunaTotal = 3
    const ColunaUnidade = 2
    const ColunaQntd = 0
    const tabela = document.getElementById("variavel2")

    for(let i = 1; i < tabela.rows.length; i++){
        let SlotTotal = tabela.rows[i].cells[ColunaTotal]
        let qntd = tabela.rows[i].cells[ColunaQntd]
        let unid = tabela.rows[i].cells[ColunaUnidade].innerText;
        
        let QntdValue = qntd.querySelector("input").value
        let UnidValue = (parseFloat(unid.replace('R$ ',''))).toFixed(2)
        
        let NewTotal = (UnidValue * QntdValue).toFixed(2)
        SlotTotal.innerHTML = `R$ ${NewTotal}`
    }
    Contagem()
}

function Contagem(){
    let QuantidadeTotal = 0
    let PrecoTotal = 0
    const tabela = document.getElementById("variavel2")
    const PrecoSlot = document.getElementById('TdPreco')
    const UnidadeSlot = document.getElementById('TdUnidade')

    for(let i = 1; i < tabela.rows.length; i++){
        let qntd = tabela.rows[i].cells[0]
        let precotxt = tabela.rows[i].cells[3]
        
        let preco = (parseFloat(precotxt.innerText.replace('R$ ',''))).toFixed(2)
        
        QuantidadeTotal += ~~qntd.querySelector("input").value
        PrecoTotal += ~~preco
    }
    
    let ValorCompleto = (PrecoTotal + (~~Listagem[IndexAtualCliente].entrega) - Listagem[IndexAtualCliente].desconto)
    PrecoSlot.textContent = `R$ ${ValorCompleto}`
    UnidadeSlot.textContent = `${QuantidadeTotal} un`
}

function MudancaPagamento(tabela, pagamento, cliente){
    const ColunaUnidade = 2
    const ColunaDesc = 1

    // cliente pagando sem cartao anteriormente
    if(cliente.acrescimo == false){

        if(pagamento == 0){
            console.log('O cliente nao recebe acrescimo 00')
            cliente.acrescimo = false
        }
        
        else if(pagamento > 3){
            for(let i = 1; i < tabela.rows.length; i++)
                {
                    let unidade = tabela.rows[i].cells[ColunaUnidade];

                    let NewNumero = (parseFloat(unidade.innerText.replace('R$ ','')) * 1.1).toFixed(2)
                    console.log('un ',unidade)
                    console.log('nn ',NewNumero)
                    
                    unidade.innerHTML = `R$ ${NewNumero}`
                }
                cliente.acrescimo = true
                localStorage.setItem('clientes', JSON.stringify(Listagem));
                console.log('o cliente recebeu o acrescimo 1')
            }
        else{
            console.log('O cliente nao recebe acrescimo 2')
            cliente.acrescimo = false
        }
    }
    
    // cliente pagando com cartao anteriormente
    else{
        
        if(pagamento == 0){
            console.log('O cliente nao perde acrescimo 0')
            cliente.acrescimo = true
        }
        
        if(pagamento < 4){
            for(let i = 1; i < tabela.rows.length; i++)
            {
                let unidade = tabela.rows[i].cells[ColunaUnidade]
                let peca = tabela.rows[i].cells[ColunaDesc]

                const descrição = peca.innerText
                const pecapreco = ListaDoCsv.find(item => item.DESC == descrição);
                if (pecapreco){
                    unidade.innerHTML = `R$ ${pecapreco.PRECO}`
                }

            }
            cliente.acrescimo = false
            localStorage.setItem('clientes', JSON.stringify(Listagem));
            console.log('O cliente perde o acrescimo 3')
        }
        
        else{
            console.log('O cliente nao perde acrescimo 4')
            cliente.acrescimo = true
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////
//                                 Debug Area                                     //
////////////////////////////////////////////////////////////////////////////////////

function Clear(){
    localStorage.clear(Listagem)
    localStorage.setItem('Listagem', JSON.stringify(Listagem));
    location.reload()
}

function wewewe(){
    Listagem[IndexAtualCliente].pedido.length = 0
    localStorage.setItem('Listagem', JSON.stringify(Listagem));
    console.log('conjuntos zerados')
}

function WaWaWa(){
    console.log('lista dos arrays atualis:', Listagem)
}