const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000; // Use the provided port or 5000

// Simulação de banco de dados de usuários
const users = {
    "usuario1": "senha1",
    "usuario2": "senha2"
};

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] === password) {
        res.json({ status: 'success' });
    } else {
        res.json({ status: 'error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
