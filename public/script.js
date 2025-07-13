// Configurações para aplicação desktop
const SUPABASE_URL = "https://kuenkqwckxctltlplmbg.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1ZW5rcXdja3hjdGx0bHBsbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDg5NzAsImV4cCI6MjA2NjI4NDk3MH0.51ztyRF391PxfwzVD0VYP4SiCt5JCpnQftRbHFU8Y5g";

// Elementos DOM
const form = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const consultarBtn = document.getElementById("consultar");
const listaCNHs = document.getElementById("lista-cnhs");

// Função para inicializar aplicação desktop
function inicializarAplicacao() {
  console.log("🚀 Iniciando aplicação desktop de Controle de CNHs");
  console.log("📊 Conectando ao Supabase:", SUPABASE_URL);
  mensagem.textContent = "Aplicação pronta!";
  mensagem.className = "sucesso";
}

// Eventos
window.addEventListener("DOMContentLoaded", inicializarAplicacao);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    idade: parseInt(document.getElementById("idade").value),
    habilitado: document.getElementById("habilitado").value === "sim",
    cidade: document.getElementById("cidade").value,
    numero_cnh: document.getElementById("numero_cnh").value || null,
    validade_cnh: document.getElementById("validade_cnh").value || null,
  };

  try {
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

    if (response.ok) {
      mensagem.textContent = "✅ Cadastro realizado com sucesso!";
      mensagem.className = "sucesso";
      form.reset();
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    mensagem.textContent = `❌ Erro no cadastro: ${error.message}`;
    mensagem.className = "erro";
  }
});

consultarBtn.addEventListener("click", async () => {
  listaCNHs.innerHTML = "<li>🔄 Carregando...</li>";

  try {
    const hoje = new Date().toISOString().split("T")[0];
    const sessentaDias = new Date();
    sessentaDias.setDate(sessentaDias.getDate() + 60);
    const sessentaDiasISO = sessentaDias.toISOString().split("T")[0];

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/usuarios_javascript?validade_cnh=gte.${hoje}&validade_cnh=lte.${sessentaDiasISO}`,
      {
        headers: {
          apikey: SUPABASE_API_KEY,
          Authorization: `Bearer ${SUPABASE_API_KEY}`,
        },
      }
    );

    const dados = await response.json();
    renderizarCNHs(dados);
  } catch (error) {
    listaCNHs.innerHTML = `<li>❌ Erro na consulta: ${error.message}</li>`;
  }
});

function renderizarCNHs(dados) {
  if (dados.length === 0) {
    listaCNHs.innerHTML = "<li>✅ Nenhuma CNH próxima do vencimento</li>";
    return;
  }

  listaCNHs.innerHTML = dados
    .map((pessoa) => {
      const validade = new Date(pessoa.validade_cnh);
      const diasRestantes = Math.ceil(
        (validade - new Date()) / (1000 * 60 * 60 * 24)
      );

      const urgência =
        diasRestantes <= 15
          ? "urgente"
          : diasRestantes <= 30
          ? "atencao"
          : "normal";
      const cor =
        diasRestantes <= 15
          ? "#e53935"
          : diasRestantes <= 30
          ? "#ffb300"
          : "#27ae60";

      return `
      <li class="${urgência}">
        <div>
          <strong>${pessoa.nome}</strong> - ${pessoa.cidade}
          <div>CNH: ${pessoa.numero_cnh || "N/A"}</div>
        </div>
        <div>
          <div>Vence em: ${validade.toLocaleDateString("pt-BR")}</div>
          <div class="dias" style="background-color: ${cor}">
            ${diasRestantes} ${diasRestantes === 1 ? "dia" : "dias"}
          </div>
        </div>
      </li>
    `;
    })
    .join("");
}
