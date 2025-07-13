require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 10000; // Render usa porta 10000

// Configurações de segurança e CORS
app.use(cors({
  origin: ['https://seu-usuario.github.io', 'http://localhost:3000'] // Substitua pelo seu domínio
}));
app.use(express.json());
app.use(express.static("public"));

// Log das configurações
console.log("Iniciando servidor com as configurações:");
console.log("Supabase URL:", process.env.SUPABASE_URL);
console.log("Porta:", port);

// Rota para fornecer credenciais
app.get("/config", (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_API_KEY
  });
});

// Rota principal
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Erro interno do servidor");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
