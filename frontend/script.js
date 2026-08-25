async function cadastrarAluno() {

    // Pegando os valores dos campos

    const nome = document.getElementById("nome").value;
    const idade = Number(
        document.getElementById("idade").value
    );

    const nota = Number(
        document.getElementById("nota").value
    );

    // Verificando se os campos foram preenchidos
    if (nome === "" || idade === 0 || nota === 0) {
        alert("Preencha todos os campos!");
        return;
    }
    // Enviando os dados para o backend
    const resposta = await fetch(
        "http://localhost:3000/alunos",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                idade: idade,
                nota: nota
            })
        }
    );

    const resultado = await resposta.json();
    alert(resultado.mensagem);

    // Limpar os campos

    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("nota").value = "";
    // Atualizar a lista
    buscarAlunos();
}

async function buscarAlunos() {
    const resposta = await fetch(
        "http://localhost:3000/alunos"
    );
    const alunos = await resposta.json();
    const lista = document.getElementById("listaAlunos");

    lista.innerHTML = "";
    if (alunos.length === 0) {
        lista.innerHTML =
            "<p>Nenhum aluno cadastrado.</p>";
        return;
    }

    alunos.forEach(aluno => {
        let situacao;
        let classe;

        if (aluno.nota >= 6) {
            situacao = "Aprovado";
            classe = "aprovado";

        } else {
            situacao = "Reprovado";
            classe = "reprovado";
        }

        lista.innerHTML += `
            <div class="aluno">
                <strong>${aluno.nome}</strong>
                <p>
                    Idade: ${aluno.idade}
                </p>
                <p>
                    Nota: ${aluno.nota}
                </p>
                <p class="${classe}">
                    ${situacao}
                </p>
                <div class="botoes">
                    <button class="btn-editar" onclick="editarAluno(${aluno.id})">
                        Editar
                    </button>
                    <button class="btn-deletar" onclick="deletarAluno(${aluno.id})">
                        Deletar
                    </button>
                </div>
                <div class="editar" id="editar-${aluno.id}" style="display: none;">
                    <input
                        type="text"
                        id="editNome-${aluno.id}"
                        placeholder="Nome"
                        value="${aluno.nome}"
                    >
                    <input
                        type="number"
                        id="editIdade-${aluno.id}"
                        placeholder="Idade"
                        value="${aluno.idade}"
                    >
                    <input
                        type="number"
                        id="editNota-${aluno.id}"
                        placeholder="Nota"
                        step="0.1"
                        min="0"
                        max="10"
                        value="${aluno.nota}"
                    >
                    <button class="btn-salvar" onclick="salvarEdicao(${aluno.id})">
                        Salvar
                    </button>
                </div>
            </div>
        `;
    });
}

function editarAluno(id) {
    const div = document.getElementById("editar-" + id);
    div.style.display =
        div.style.display === "none" ? "block" : "none";
}

async function salvarEdicao(id) {
    const nomeCampo =
        document.getElementById("editNome-" + id).value;
    const idadeCampo =
        document.getElementById("editIdade-" + id).value;
    const notaCampo =
        document.getElementById("editNota-" + id).value;

    if (nomeCampo === "" || idadeCampo === "" || notaCampo === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const resposta = await fetch(
        "http://localhost:3000/alunos/" + id,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nomeCampo,
                idade: Number(idadeCampo),
                nota: Number(notaCampo)
            })
        }
    );

    const resultado = await resposta.json();
    alert(resultado.mensagem);
    buscarAlunos();
}

async function deletarAluno(id) {
    if (!confirm("Tem certeza que deseja deletar este aluno?")) {
        return;
    }

    const resposta = await fetch(
        "http://localhost:3000/alunos/" + id,
        {
            method: "DELETE"
        }
    );

    const resultado = await resposta.json();
    alert(resultado.mensagem);
    buscarAlunos();
}

// Buscar os alunos quando a página abrir
buscarAlunos();
