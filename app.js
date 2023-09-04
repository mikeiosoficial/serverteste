const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "mike",
  password: "1",
  database: "logins",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL");
});

// Rota para a página de login
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// Rota para a página de registro
app.get("/registro.html", (req, res) => {
  res.sendFile(__dirname + "/registro.html");
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Consulta SQL para verificar as credenciais no banco de dados MySQL
    const sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("Erro na consulta SQL:", err);
            return res.status(500).send("Erro interno no servidor");
        }

        if (result.length > 0) {
            // Credenciais válidas, retorne uma resposta de sucesso
            console.log(`Usuário ${username} autenticado com sucesso.`);
            res.json({ sucesso: true });
        } else {
            // Credenciais inválidas, retorne uma resposta de erro
            console.log(`Falha na autenticação para o usuário ${username}.`);
            res.json({ sucesso: false });
        }
    });
});

// Rota para processar o formulário de registro
app.post("/processar_registro", (req, res) => {
  // Aqui você pode acessar os dados do formulário usando req.body
  const username = req.body.username;
  const password = req.body.password;

  // Faça o processamento necessário, como salvar os dados no banco de dados, aqui

  // Redirecione o usuário para uma página de sucesso após o registro
  res.redirect("/registro_sucesso.html");
});

// Página de sucesso após o login bem-sucedido
app.get("/sucesso", (req, res) => {
  console.log("Página de sucesso acessada.");
  res.send("Login bem-sucedido! Bem-vindo.");
});

// Página de erro após o login mal-sucedido
app.get("/erro", (req, res) => {
  console.log("Página de erro acessada.");
  res.send("Login mal-sucedido. Credenciais inválidas.");
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
