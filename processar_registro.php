<?php
// Conecta ao banco de dados
$mysqli = new mysqli("localhost", "mike", "1", "logins");

// Verifica a conexão
if ($mysqli->connect_error) {
    die("Erro de conexão: " . $mysqli->connect_error);
}

// Obtém os dados do formulário
$username = $_POST['username'];
$password = $_POST['password'];

// Insere os dados na tabela "usuarios"
$query = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();

// Verifica se o registro foi bem-sucedido
if ($stmt->affected_rows > 0) {
    echo "Registro bem-sucedido!";
} else {
    echo "Erro ao registrar o usuário.";
}

$stmt->close();
$mysqli->close();
?>

