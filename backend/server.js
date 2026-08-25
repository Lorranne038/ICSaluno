const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());


function lerBanco() {
    const dados = fs.readFileSync("banco.json");
    return JSON.parse(dados);
}

function salvarBanco(banco) {
    fs.writeFileSync(
        "banco.json",
        JSON.stringify(banco, null, 4)
    );
}

// LISTAR ALUNOS
app.get("/alunos", (req, res) => {
    const banco = lerBanco();
    res.json(banco.alunos);
});

// CADASTRAR ALUNO
app.post("/alunos", (req, res) => {
    const banco = lerBanco();
    const novoAluno = {
        id: Date.now(),
        nome: req.body.nome,
        idade: req.body.idade,
        nota: req.body.nota
    };

    banco.alunos.push(novoAluno);
    salvarBanco(banco);

    res.json({
        mensagem: "Aluno cadastrado com sucesso!"
    });
});

// EDITAR ALUNO
app.put("/alunos/:id", (req, res) => {
    const banco = lerBanco();
    const id = Number(req.params.id);
    const aluno = banco.alunos.find(a => a.id === id);

    if (!aluno) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado!"
        });
    }

    if (req.body.nome !== undefined) aluno.nome = req.body.nome;
    if (req.body.idade !== undefined) aluno.idade = req.body.idade;
    if (req.body.nota !== undefined) aluno.nota = req.body.nota;

    salvarBanco(banco);

    res.json({
        mensagem: "Aluno atualizado com sucesso!",
        aluno
    });
});

// DELETAR ALUNO
app.delete("/alunos/:id", (req, res) => {
    const banco = lerBanco();
    const id = Number(req.params.id);
    const indice = banco.alunos.findIndex(a => a.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado!"
        });
    }

    banco.alunos.splice(indice, 1);
    salvarBanco(banco);

    res.json({
        mensagem: "Aluno deletado com sucesso!"
    });
});

app.listen(3000, () => {
    console.log(
        "Backend rodando em http://localhost:3000"
    );
});
