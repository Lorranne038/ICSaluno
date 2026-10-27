require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

<<<<<<< HEAD
// LISTAR ALUNOS

app.get("/alunos", async (req, res) => {
    const { data, error } = await supabase
        .from("alunos")
        .select("*")
        .order("id");

    if (error) {
        return res.status(500).json({
            mensagem: "Erro ao buscar alunos!",
            erro: error.message
        });
    }

    res.json(data);
});

// CADASTRAR ALUNO

app.post("/alunos", async (req, res) => {
    const { nome, idade, nota1, nota2 } = req.body;

    if (!nome || !idade || nota1 === undefined || nota2 === undefined) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos!"
        });
    }

    const { data, error } = await supabase
        .from("alunos")
        .insert({
            nome: nome,
            idade: idade,
            nota1: nota1,
            nota2: nota2
        })
        .select();

    if (error) {
        return res.status(500).json({
            mensagem: "Erro ao cadastrar aluno!",
            erro: error.message
        });
    }
=======
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
>>>>>>> 9023f84703033058843a10d9f63e8024a2a03af7

    res.json({
        mensagem: "Aluno cadastrado com sucesso!",
        aluno: data[0]
    });
});

// EDITAR ALUNO
<<<<<<< HEAD

app.put("/alunos/:id", async (req, res) => {
    const id = req.params.id;
    const { nome, idade, nota1, nota2 } = req.body;

    const { data, error } = await supabase
        .from("alunos")
        .update({
            nome: nome,
            idade: idade,
            nota1: nota1,
            nota2: nota2
        })
        .eq("id", id)
        .select();

    if (error) {
        return res.status(500).json({
            mensagem: "Erro ao atualizar aluno!",
            erro: error.message
        });
    }

    if (data.length === 0) {
=======
app.put("/alunos/:id", (req, res) => {
    const banco = lerBanco();
    const id = Number(req.params.id);
    const aluno = banco.alunos.find(a => a.id === id);

    if (!aluno) {
>>>>>>> 9023f84703033058843a10d9f63e8024a2a03af7
        return res.status(404).json({
            mensagem: "Aluno não encontrado!"
        });
    }

<<<<<<< HEAD
    res.json({
        mensagem: "Aluno atualizado com sucesso!"
=======
    if (req.body.nome !== undefined) aluno.nome = req.body.nome;
    if (req.body.idade !== undefined) aluno.idade = req.body.idade;
    if (req.body.nota !== undefined) aluno.nota = req.body.nota;

    salvarBanco(banco);

    res.json({
        mensagem: "Aluno atualizado com sucesso!",
        aluno
>>>>>>> 9023f84703033058843a10d9f63e8024a2a03af7
    });
});

// DELETAR ALUNO
<<<<<<< HEAD

app.delete("/alunos/:id", async (req, res) => {
    const id = req.params.id;

    const { data, error } = await supabase
        .from("alunos")
        .delete()
        .eq("id", id)
        .select();

    if (error) {
        return res.status(500).json({
            mensagem: "Erro ao remover aluno!",
            erro: error.message
        });
    }

    if (data.length === 0) {
=======
app.delete("/alunos/:id", (req, res) => {
    const banco = lerBanco();
    const id = Number(req.params.id);
    const indice = banco.alunos.findIndex(a => a.id === id);

    if (indice === -1) {
>>>>>>> 9023f84703033058843a10d9f63e8024a2a03af7
        return res.status(404).json({
            mensagem: "Aluno não encontrado!"
        });
    }

<<<<<<< HEAD
    res.json({
        mensagem: "Aluno removido com sucesso!"
=======
    banco.alunos.splice(indice, 1);
    salvarBanco(banco);

    res.json({
        mensagem: "Aluno deletado com sucesso!"
>>>>>>> 9023f84703033058843a10d9f63e8024a2a03af7
    });
});

app.listen(3000, () => {
    console.log(
        "Backend rodando em http://localhost:3000"
    );
});
