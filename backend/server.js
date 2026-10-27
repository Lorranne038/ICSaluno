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

    res.json({
        mensagem: "Aluno cadastrado com sucesso!",
        aluno: data[0]
    });
});

// EDITAR ALUNO

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
        return res.status(404).json({
            mensagem: "Aluno não encontrado!"
        });
    }

    res.json({
        mensagem: "Aluno atualizado com sucesso!"
    });
});

// DELETAR ALUNO

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
        return res.status(404).json({
            mensagem: "Aluno não encontrado!"
        });
    }

    res.json({
        mensagem: "Aluno removido com sucesso!"
    });
});

app.listen(3000, () => {
    console.log(
        "Backend rodando em http://localhost:3000"
    );
});