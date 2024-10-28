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
    console.log("botao de cliente apertado");
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
    Cliente = {nome, tel, vendedora, bairro, cidade, uf, pagamento: 0, transp: 0, entrega: 0, desconto: 0, pedido: [{quantidade: 0, peça: 0}], conjuntos: 0};

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
})

ElementoDesc.addEventListener('change', (event) => {
    const DescValor = event.target.value;
    Listagem[IndexAtualCliente]['desconto'] = DescValor;
    localStorage.setItem('clientes', JSON.stringify(Listagem));
    criadorTR(Listagem[IndexAtualCliente])
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
    console.log('tome macro');
}


// Faz desaparecer a tabela do Cliente
function MacroHide(){
    bigquadro.classList.add('hidden');
    BtnPeça.classList.add('hidden')
    PecaBusca.classList.add('hidden')
    console.log('macro apagado');
}


// Fecha o formulario para adicionar ou editar Cliente
function FechaForm(){
    document.getElementById("popupForm").classList.add("hidden");
    console.log("Form fechado")
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
}


// Faz aparecer os <a> na tabela central
function ShowA(cliente, clienteLink){
    const LinkCliente = clienteLink.querySelector('a');
    LinkCliente.addEventListener('click', (e) =>{
        e.preventDefault();
        const index = e.target.getAttribute('data-index');
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
        console.log('contato apagado');
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
        console.log(val)
        Listagem[IndexAtualCliente]['conjuntos'] = val;
        localStorage.setItem('clientes', JSON.stringify(Listagem));
        $('#pecaselect').val(null).trigger('change');

        i = Listagem[IndexAtualCliente]['conjuntos']
        console.log(i)
        while (i < val) {
            Listagem[IndexAtualCliente]['pedidos'][i].push({quantidade: 1, peça: PecasSelect[i]})
            console.log('Adicionado as peças:',PecasSelect[i] )
            i++
        }

        criadorTR(cliente, val, TextoSelect)
    }) 
}


function criadorTR(cliente, QuantidadeAdicionada, TextoSelect){
    console.log(TextoSelect)
    let i = cliente.conjuntos
    const n = cliente.conjuntos + QuantidadeAdicionada
    console.log('novo:', QuantidadeAdicionada)
    const tabela = document.getElementById("variavel2")
    let ContaDindin = 0
    let ValorCompleto = 0
    let UnidadeTotal = 0 
    
    // Criação de tabela do romaneio
    // Parte mais importante do programa
    
    while (i < n){
        
        const NewLinha = tabela.insertRow(-1)
        NewLinha.id = `tr_${i}`
        NewLinha.className = 'TrClass'
        
        TRInput(NewLinha, i)
        descricionvalue = TRProduto(NewLinha, TextoSelect, i)
        valorunico = TRValorUn(NewLinha, cliente, i)
        TRTotal(NewLinha, UnidadeTotal, valorunico, i)
        TRDelete(cliente, NewLinha, i)
        
        i++
        cliente.conjuntos++
    }

    console.log('conjuntos:', cliente.conjuntos)
    localStorage.setItem('clientes', JSON.stringify(Listagem));
    
    ValorCompleto = ((ContaDindin + cliente.entrega) - cliente.desconto)
    document.getElementById('TdPreco').textContent = `R$ ${ValorCompleto}`
}

/*
function TRCreate(tabela){
    const NewLinha = tabela.insertRow(-1)
    NewLinha.id = `tr_${i}`
    NewLinha.className = 'TrClass'
}
*/


function TRInput(NewLinha, i){
    // Cria o input de Qntd
    const numero = NewLinha.insertCell(0)
    const numerovalue = document.createElement("input")
    numerovalue.type = "number"
    numero.appendChild(numerovalue)
    numero.id = `num_${i}`
    numero.className = 'NumeroTd'
    numerovalue.className = 'NumeroIn'
}


function TRProduto(NewLinha, TextoSelect, i){
    // Cria a Coluna do Produto Selecionado
    const descricion = NewLinha.insertCell(1)
    const descricionvalue = document.createElement("p")
    descricionvalue.innerHTML = TextoSelect[i]
    descricion.appendChild(descricionvalue)
    descricion.className = 'DescTd'

    return descricionvalue
}


function TRValorUn(NewLinha, cliente, i){
    // Cria a Coluna de Valor de cada peça
    let valorunico = 0
    const unidade = NewLinha.insertCell(2)
    let unidadevalue = document.createElement("p")
    console.log('cliente pagou com: ',cliente.pagamento)
    
    if (cliente.pagamento < 3)
        {
            console.log('valor sem acrescimo')
            valorunico = EncontrarPreco(descricionvalue)
            unidadevalue.innerHTML = `R$ ${valorunico},00`
            unidade.appendChild(unidadevalue)
        }
        
        else 
        {
            console.log('valor com acrescimo')
            valorunico = (EncontrarPreco(descricionvalue) * 1.1).toFixed(2)
            unidadevalue.innerHTML = `R$ ${valorunico}`
            unidade.appendChild(unidadevalue)
        }
        
    unidade.id = `un_${i}`
    unidade.className = 'UnTd'
    return valorunico
}


function TRTotal(NewLinha, UnidadeTotal, valorunico, i){
    // Cria a Coluna de Total
    const totales = NewLinha.insertCell(3)
    const totalesvalue = document.createElement("p")
    const IdentNumb = document.getElementById(`num_${i}`)
    let ContaDindin = 0
    
    IdentNumb.addEventListener('change', (event) => {
    const qntd = event.target.value
    UnidadeTotal = UnidadeTotal + qntd
    valortotal = valorunico * qntd
    
    ContaDindin = ContaDindin + valortotal
    totalesvalue.innerHTML = `R$ ${valortotal.toFixed(2)}` 
    totales.appendChild(totalesvalue)
    })
}


function TRDelete(cliente, NewLinha, i){
    // Cria o icone de Apagar a Linha
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
    const LinhaDel = document.getElementById(`tr_${i}`) 

    apagavalue.onclick = function(){
        LinhaDel.innerHTML = ''
    }

    cliente.conjuntos = cliente.conjuntos - 1
}   
















function EncontrarPreco(pecinha){
    const descrição = pecinha.innerHTML
    const peca = ListaDoCsv.find(item => item.DESC == descrição);
    if (peca){
        return peca.PRECO
    }
}




////////////////////////////////////////////////////////////////////////////////////
//                                 Debug Area                                     //
////////////////////////////////////////////////////////////////////////////////////

function Clear(){
    localStorage.clear(Listagem)
    localStorage.setItem('Listagem', JSON.stringify(Listagem));

    console.log('Todos os Clientes foram Apagados')
    console.log('lista dos arrays atualis:', Listagem)
    SideFill()
    location.reload()
}

function WaWaWa(){
    console.log('lista dos arrays atualis:', Listagem)
}

function wewewe(){
    console.log('Listagem de produtos: ', ProdutoLista)
}