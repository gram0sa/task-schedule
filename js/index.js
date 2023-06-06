const inputTarefa = document.querySelector(".input-nova-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefa = document.querySelector(".tarefa");

//cria <li>
function criaLi() {
  const criali = document.createElement("li");
  return criali;
}

//captura o evento de click do mouse e tecla enter para criar <li> com conteudo
inputTarefa.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return console.log("Digite Algo");
    criaTarefa(inputTarefa.value);
  }
});

//captura o evento de click do botao
btnTarefa.addEventListener("click", (e) => {
  if (!inputTarefa.value) return console.log("Digite Algo");
  criaTarefa(inputTarefa.value);
});

//adiciona o inputTarefa a <li>
function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerHTML = textoInput;
  tarefa.appendChild(li);
  limpaInput();
  btnApagaTarefa(li);
  salvarTarefa();
}

//funcao para limpar o input
function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

//funcao de criacao para de butao de apagar
function btnApagaTarefa(li) {
  li.innerHTML += " ";
  const btnApagar = document.createElement("button");
  btnApagar.innerHTML = "Apagar";
  btnApagar.setAttribute("class", "apagar");
  li.appendChild(btnApagar);
}

//captura o evento de click do botao para apagar a <li>
document.addEventListener("click", (e) => {
  const el = e.target;

  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
  }
  salvarTarefa();
});

//funcao para salvar a tarefa com JSON
function salvarTarefa() {
  const liTarefas = tarefa.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", " ").trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

function addTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
addTarefasSalvas();
