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
            </div>
        `;
    });
}
// Buscar os alunos quando a página abrir
buscarAlunos();