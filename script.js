// haverão console.log's por todo o código, acredito q vai ser melhor pra debuggar?
// se eu lembrar eu adiciono algum comentario aqui futuramente sobre.
// tem funcionado bem.
document.addEventListener('DOMContentLoaded', () => {
  console.log("Hallo World!")
  AtualizarLista()
})

let IndexAtualCliente = -1

// criação do array global de clientes
// percebi tarde demais que isso deveria ter sido feito beeeeeem antes
let UnicoCliente = {};
let ListaClientes = JSON.parse(localStorage.getItem('clientes')) || [];

// linkado no botão de contato
// deve abrir o formulario de inscrição de cliente
function NewCLT(){
  MacroHide()
  document.getElementById("popupForm").classList.remove("hidden");
  document.getElementById("salvadore").classList.remove("hidden");
  document.getElementById('editore').classList.add("hidden");
  document.getElementById('addpeca').classList.add("hidden");
  console.log("botao de cliente apertado");
  ClientForm.reset();
}

// botão pra fechar o formulario
// fecha o form... só isso msm
function Fechou(){
  document.getElementById("popupForm").classList.add("hidden");
  console.log("Form apagado da existencia com Sucesso")
}

// botão pra salvar o form
// todos os dados inseridos vao ser jogados pra um array
function Salvear(event){
  event.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const tel = document.getElementById('tel').value;
  const vendedora = document.getElementById('vendedora').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const uf = document.getElementById('uf').value;
  
  UnicoCliente = {nome, tel, vendedora, bairro, cidade, uf, pagamento: 0, transp: 0, entrega: 0, desconto: 0, pedido: [quantidade = 0, peça = 0, preço = 0]};

  ListaClientes.push(UnicoCliente);
  localStorage.setItem('clientes', JSON.stringify(ListaClientes));

  console.log('Array Unico:',UnicoCliente);
  console.log('Lista Dos Arrays: ',ListaClientes);
  
  Fechou()
  AtualizarLista()
}

// transformando a lista na sidebar em variavel
const ClienteSide = document.getElementById('listaClientes')

// variavel global pra ser usada na edição
let editingIndex = -1;


// função pra listar o nome dos clientes como <a>
// tem que pegar o nome do cliente e acidionar na lista, e ter os botãozinho tambem
function AtualizarLista(){
  ClienteSide.innerHTML = '';
  const Clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  
  const listagem = document.getElementById('listaClientes');

  Clientes.forEach((cliente,index) => {
    const clienteItem = document.createElement('li')
    clienteItem.innerHTML = `
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
    listagem.appendChild(clienteItem);

    // tornar os <a> clicaveis e montar a tabela
    const LinkCliente = clienteItem.querySelector('a');
    LinkCliente.addEventListener('click', (e) =>{
      e.preventDefault();
      FixaShow(cliente);
      IndexAtualCliente = index;

      console.log('index cliente: ',IndexAtualCliente)
    });

    // botoes funcionais de deletar
    // botão tem q apagar o array do cliente
    const deletare = clienteItem.querySelector('#del');
    deletare.addEventListener('click', () =>{
        Clientes.splice(index,1);
        localStorage.setItem('clientes', JSON.stringify(Clientes));
        AtualizarLista();
        console.log('contato apagado');
      });
    // botoes funcionais de editar
    // Evento de editar cliente
    const editar = clienteItem.querySelector('#edit');
    editar.addEventListener('click', () => {
        document.getElementById("salvadore").classList.add("hidden");
        const cliente = Clientes[index];
      if (cliente) {
        document.getElementById('nome').value = cliente.nome;
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
          Clientes.splice(index,1);
          localStorage.setItem('clientes', JSON.stringify(Clientes));
        });
      };
    });
  });
};

// função pra aparecer os dados de cada cliente
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
  const select4 = document.getElementById('desc');

  console.log("Valor de pagamento:", cliente.pagamento);
  console.log("Valor de transporte:", cliente.transp);
  console.log("Valor de entrega:", cliente.entrega);
  console.log("Valor de desconto:", cliente.desconto);

  select1.value = cliente.pagamento || '0';
  select2.value = cliente.transp || '0';
  select3.value = cliente.entrega || '0';
  select4.value = cliente.desconto || '0';

  MacroShow();
}

// desaparece e aparece com o romaneio.
// isso é muito mais preguiça doq necessidade slk
// pelomenos. console.log ta me ajudando bastante graças a Dios
const bigquadro = document.getElementsByClassName('macro')[0]
const BtnPeça = document.getElementById('addpeca')
const PecaBusca = document.getElementById('pecaselect')


function MacroShow(){
  bigquadro.classList.remove('hidden');
  document.getElementById("popupForm").classList.add("hidden");
  BtnPeça.classList.remove('hidden')
  PecaBusca.classList.remove('hidden')
  console.log('tome macro');
}
function MacroHide(){
  bigquadro.classList.add('hidden');
  BtnPeça.classList.add('hidden')
  PecaBusca.classList.add('hidden')
  console.log('mindê o macro');
}

// segunda tabela
// montar como a segunda tabela funciona agora, metade facil e metade tem q pensar ainda
// escolhe opção -> apaga valor armazenado -> armazena o escolhido

const ElementoPgmnt = document.getElementById('pgmnt')
const ElementoTransp = document.getElementById('transp')
const ElementoPagTrans = document.getElementById('PagTrans')

ElementoPgmnt.addEventListener('change', (event) => {
  const PgmntValor = event.target.value;
  ListaClientes[IndexAtualCliente]['pagamento'] = PgmntValor;
  localStorage.setItem('clientes', JSON.stringify(ListaClientes));
  console.log(PgmntValor) 
})

ElementoTransp.addEventListener('change', (event) => {
  const TranspValor = event.target.value;
  ListaClientes[IndexAtualCliente]['transp'] = TranspValor;
  localStorage.setItem('clientes', JSON.stringify(ListaClientes));
  console.log(TranspValor)
})

ElementoPagTrans.addEventListener('change', (event) => {
  const PagTransValor = event.target.value;
  ListaClientes[IndexAtualCliente]['entrega'] = PagTransValor;
  localStorage.setItem('clientes', JSON.stringify(ListaClientes));
  console.log(PagTransValor)
})

$(document).ready(function() {
  $('#pecaselect').select2();
});


















//=========================================================================================//
//                                        apenas testes                                    //
//                                         nada oficial                                    //
//=========================================================================================//

const logo = document.getElementById('LOGO')
  logo.addEventListener('click', () =>{
    MacroShow()
    document.getElementById("popupForm").classList.add("hidden");
})

function deletacion(){
  localStorage.clear()
  console.log('storage limpa')
  AtualizarLista()
}

function arraios(){
  console.log('Lista Dos Arrays: ',ListaClientes);
}

function clienteindexado(){
  console.log('Cod cliente: ',IndexAtualCliente)
}
//UnicoCliente = {nome:'debuga', tel: 259996584, vendedora: 'maria debugadora', bairro: 'Santa Debugação', cidade:'Debugaria', uf:'DB', pagamento: 2, transp: 2, entrega: 69, desconto: 90, pedido: [quantidade = 0, peça = 0, preço = 0]};
//ListaClientes.push(UnicoCliente);

