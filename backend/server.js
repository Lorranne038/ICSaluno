const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());


app.get("/alunos", (req, res) => {
    const dados = fs.readFileSync("banco.json");
    const banco = JSON.parse(dados);
    res.json(banco.alunos);
});


// CADASTRAR ALUNO

app.post("/alunos", (req, res) => {
    const dados = fs.readFileSync("banco.json");
    const banco = JSON.parse(dados);
    const novoAluno = {
        id: Date.now(),
        nome: req.body.nome,
        idade: req.body.idade,
        nota: req.body.nota
    };

    banco.alunos.push(novoAluno);

    fs.writeFileSync(
        "banco.json",
        JSON.stringify(banco, null, 4)
    );

    res.json({
        mensagem: "Aluno cadastrado com sucesso!"
    });

});

app.listen(3000, () => {
    console.log(
        "Backend rodando em http://localhost:3000"
    );
});