let alunoEditandoId = null;

async function cadastrarAluno() {
    const nome = document.getElementById("nome").value;
    const idade = Number(
        document.getElementById("idade").value
    );
    const nota1 = Number(
        document.getElementById("nota1").value
    );
    const nota2 = Number(
        document.getElementById("nota2").value
    );

    if (nome === "" || idade === 0 || nota1 === 0 || nota2 === 0) {
        alert("Preencha todos os campos!");
        return;
    }

    if (alunoEditandoId !== null) {
        const resposta = await fetch(
            `http://localhost:3000/alunos/${alunoEditandoId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    idade: idade,
                    nota1: nota1,
                    nota2: nota2
                })
            }
        );

        const resultado = await resposta.json();
        alert(resultado.mensagem);
        cancelarEdicao();
    } else {
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
                    nota1: nota1,
                    nota2: nota2
                })
            }
        );

        const resultado = await resposta.json();
        alert(resultado.mensagem);
    }

    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    buscarAlunos();
}

async function editarAluno(id) {
    const resposta = await fetch(
        `http://localhost:3000/alunos`
    );
    const alunos = await resposta.json();
    const aluno = alunos.find(a => a.id === id);

    if (!aluno) {
        alert("Aluno não encontrado!");
        return;
    }

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("nota1").value = aluno.nota1;
    document.getElementById("nota2").value = aluno.nota2;

    alunoEditandoId = id;

    const btn = document.getElementById("btnCadastrar");
    btn.textContent = "Salvar";
    btn.classList.add("btn-salvar");

    document.querySelector(".formulario h2").textContent =
        "Editar aluno";
}

function cancelarEdicao() {
    alunoEditandoId = null;

    const btn = document.getElementById("btnCadastrar");
    btn.textContent = "Cadastrar";
    btn.classList.remove("btn-salvar");

    document.querySelector(".formulario h2").textContent =
        "Cadastrar aluno";

    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
}

async function deletarAluno(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir este aluno?"
    );

    if (!confirmar) {
        return;
    }

    const resposta = await fetch(
        `http://localhost:3000/alunos/${id}`,
        {
            method: "DELETE"
        }
    );

    const resultado = await resposta.json();
    alert(resultado.mensagem);

    if (alunoEditandoId === id) {
        cancelarEdicao();
    }

    buscarAlunos();
}

async function buscarAlunos() {
    const resposta = await fetch(
        "http://localhost:3000/alunos"
    );
    const alunos = await resposta.json();
    const lista = document.getElementById("listaAlunos");

    lista.innerHTML = "";
    if (!Array.isArray(alunos) || alunos.length === 0) {
        lista.innerHTML =
            "<p>Nenhum aluno cadastrado.</p>";
        return;
    }

    alunos.forEach(aluno => {
        const media = (aluno.nota1 + aluno.nota2) / 2;
        let situacao;
        let classe;

        if (media >= 6) {
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
                    Nota 1: ${aluno.nota1} | Nota 2: ${aluno.nota2}
                </p>
                <p>
                    Média: ${media.toFixed(1)}
                </p>
                <p class="${classe}">
                    ${situacao}
                </p>
                <div class="botoes-aluno">
                    <button class="btn-editar" onclick="editarAluno('${aluno.id}')">
                        Editar
                    </button>
                    <button class="btn-deletar" onclick="deletarAluno('${aluno.id}')">
                        Excluir
                    </button>
                </div>
            </div>
        `;
    });
}

buscarAlunos();