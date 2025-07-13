require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Configurações importantes
app.use(cors());
app.use(express.static("public"));

// Debug: Mostrar credenciais no terminal
console.log("Configurações carregadas:");
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log(
  "SUPABASE_API_KEY:",
  process.env.SUPABASE_API_KEY ? "*****" : "Não encontrada"
);

// Rota para fornecer configurações
app.get("/config", (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_API_KEY,
  });
});

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
