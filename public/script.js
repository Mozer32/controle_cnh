// Variáveis globais para armazenar as credenciais
let SUPABASE_URL = "";
let SUPABASE_API_KEY = "";

// Elementos DOM
const form = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const consultarBtn = document.getElementById("consultar");
const listaCNHs = document.getElementById("lista-cnhs");

// Primeiro passo: obter as credenciais do backend
async function obterCredenciais() {
  try {
    console.log("Obtendo credenciais...");
    const response = await fetch("/config");
    console.log("Resposta do config:", response.status);

    if (response.ok) {
      const config = await response.json();
      console.log("Credenciais recebidas:", config);

      SUPABASE_URL = config.supabaseUrl;
      SUPABASE_API_KEY = config.supabaseKey;
    } else {
      throw new Error(`Erro ${response.status}: ${await response.text()}`);
    }
  } catch (error) {
    console.error("Falha ao obter credenciais:", error);
    mensagem.textContent = "Erro de conexão com o servidor: " + error.message;
    mensagem.className = "erro";
  }
}

// Chamar a função para obter credenciais quando a página carregar
window.addEventListener("DOMContentLoaded", obterCredenciais);

// Enviar formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Iniciando cadastro...");

  // Verificar se temos as credenciais
  if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    mensagem.textContent = "Aguardando configuração... tente novamente.";
    mensagem.className = "erro";
    return;
  }

  const nome = document.getElementById("nome").value;
  const idade = parseInt(document.getElementById("idade").value);
  const habilitado = document.getElementById("habilitado").value;
  const cidade = document.getElementById("cidade").value;
  const numero_cnh = document.getElementById("numero_cnh").value || null;
  const validade_cnh = document.getElementById("validade_cnh").value || null;

  // Converter 'habilitado' para booleano (true se for "sim", false caso contrário)
  const habilitadoBool = habilitado === "sim";

  const dados = {
    nome,
    idade,
    habilitado: habilitadoBool, // Enviar como booleano
    cidade,
    numero_cnh,
    validade_cnh,
  };

  try {
    console.log("Enviando dados para o Supabase:", dados);
    console.log("URL:", SUPABASE_URL + "/rest/v1/usuarios_javascript");

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/usuarios_javascript`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_API_KEY,
          Authorization: `Bearer ${SUPABASE_API_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(dados),
      }
    );

    console.log("Resposta recebida. Status:", response.status);

    if (response.ok) {
      mensagem.textContent = "Dados enviados com sucesso!";
      mensagem.className = "sucesso";
      form.reset();
      setTimeout(() => {
        mensagem.textContent = "";
        mensagem.className = "";
      }, 3000);
    } else {
      const errorText = await response.text();
      console.error("Erro detalhado do Supabase:", errorText);
      mensagem.textContent = `Erro: ${errorText || response.status}`;
      mensagem.className = "erro";
    }
  } catch (error) {
    console.error("Erro completo:", error);
    mensagem.textContent = "Erro de conexão com o servidor.";
    mensagem.className = "erro";
  }
});

// Consultar CNHs próximas do vencimento (60 dias)
consultarBtn.addEventListener("click", async () => {
  console.log("Iniciando consulta...");

  // Verificar se temos as credenciais
  if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    listaCNHs.innerHTML =
      "<li>Aguardando configuração... tente novamente.</li>";
    return;
  }

  listaCNHs.innerHTML = "<li>Buscando CNHs próximas do vencimento...</li>";

  try {
    const hoje = new Date();
    const sessentaDiasDepois = new Date();
    sessentaDiasDepois.setDate(hoje.getDate() + 60);

    // Formatar datas para YYYY-MM-DD
    const hojeISO = hoje.toISOString().split("T")[0];
    const depoisISO = sessentaDiasDepois.toISOString().split("T")[0];

    console.log("Consultando CNHs entre", hojeISO, "e", depoisISO);

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/usuarios_javascript?validade_cnh=gte.${hojeISO}&validade_cnh=lte.${depoisISO}`,
      {
        method: "GET",
        headers: {
          apikey: SUPABASE_API_KEY,
          Authorization: `Bearer ${SUPABASE_API_KEY}`,
        },
      }
    );

    console.log("Status da consulta:", response.status);

    const dados = await response.json();

    if (!response.ok) {
      throw new Error(
        dados.message || "Erro na consulta. Status: " + response.status
      );
    }

    if (dados.length === 0) {
      listaCNHs.innerHTML =
        "<li>Nenhuma CNH vencendo nos próximos 60 dias 🎉</li>";
    } else {
      listaCNHs.innerHTML = "";

      dados.forEach((pessoa) => {
        const validadeDate = new Date(pessoa.validade_cnh);
        const diffTime = validadeDate - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const li = document.createElement("li");

        // Determinar classe de urgência
        let classeUrgencia = "normal";
        let corDias = "#27ae60"; // Verde padrão

        if (diffDays <= 15) {
          classeUrgencia = "urgente";
          corDias = "#e53935"; // Vermelho
        } else if (diffDays <= 30) {
          classeUrgencia = "atencao";
          corDias = "#ffb300"; // Amarelo/laranja
        }

        // Formatar data para padrão BR
        const dataFormatada = validadeDate.toLocaleDateString("pt-BR");

        li.className = classeUrgencia;
        li.innerHTML = `
          <div>
            <strong>${pessoa.nome}</strong> - ${pessoa.cidade}
            <div>CNH: ${pessoa.numero_cnh || "N/A"}</div>
          </div>
          <div>
            <div>Vence em: ${dataFormatada}</div>
            <div class="dias" style="background-color: ${corDias}">
              ${diffDays} ${diffDays === 1 ? "dia" : "dias"}
            </div>
          </div>
        `;

        listaCNHs.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Erro na consulta:", error);
    listaCNHs.innerHTML = `<li>Erro ao buscar dados: ${error.message}</li>`;
  }
});
