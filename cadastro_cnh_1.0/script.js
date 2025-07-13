const SUPABASE_URL = "https://kuenkqwckxctltlplmbg.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1ZW5rcXdja3hjdGx0bHBsbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDg5NzAsImV4cCI6MjA2NjI4NDk3MH0.51ztyRF391PxfwzVD0VYP4SiCt5JCpnQftRbHFU8Y5g";

const form = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const consultarBtn = document.getElementById("consultar");
const listaCNHs = document.getElementById("lista-cnhs");

// Enviar formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = parseInt(document.getElementById("idade").value);
  const habilitado = document.getElementById("habilitado").value;
  const cidade = document.getElementById("cidade").value;
  const numero_cnh = document.getElementById("numero_cnh").value || null;
  const validade_cnh = document.getElementById("validade_cnh").value || null;

  const dados = {
    nome,
    idade,
    habilitado,
    cidade,
    numero_cnh,
    validade_cnh,
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
      mensagem.textContent = "Dados enviados com sucesso!";
      mensagem.className = "sucesso";
      form.reset();
      setTimeout(() => {
        mensagem.textContent = "";
        mensagem.className = "";
      }, 3000);
    } else {
      const errorData = await response.json();
      mensagem.textContent = `Erro: ${errorData.message || response.status}`;
      mensagem.className = "erro";
    }
  } catch (error) {
    mensagem.textContent = "Erro de conexão com o servidor.";
    mensagem.className = "erro";
    console.error(error);
  }
});

// Consultar CNHs próximas do vencimento (60 dias)
consultarBtn.addEventListener("click", async () => {
  listaCNHs.innerHTML = "<li>Buscando CNHs próximas do vencimento...</li>";

  try {
    const hoje = new Date();
    const sessentaDiasDepois = new Date();
    sessentaDiasDepois.setDate(hoje.getDate() + 60);

    // Formatar datas para YYYY-MM-DD
    const hojeISO = hoje.toISOString().split("T")[0];
    const depoisISO = sessentaDiasDepois.toISOString().split("T")[0];

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

    const dados = await response.json();

    if (!response.ok) throw new Error(dados.message || "Erro na consulta");

    if (dados.length === 0) {
      listaCNHs.innerHTML = "<li>Nenhuma CNH vencendo nos próximos 60 dias 🎉</li>";
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
        const dataFormatada = validadeDate.toLocaleDateString('pt-BR');
        
        li.className = classeUrgencia;
        li.innerHTML = `
          <div>
            <strong>${pessoa.nome}</strong> - ${pessoa.cidade}
            <div>CNH: ${pessoa.numero_cnh || 'N/A'}</div>
          </div>
          <div>
            <div>Vence em: ${dataFormatada}</div>
            <div class="dias" style="background-color: ${corDias}">
              ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}
            </div>
          </div>
        `;
        
        listaCNHs.appendChild(li);
      });
    }
  } catch (error) {
    listaCNHs.innerHTML = `<li>Erro ao buscar dados: ${error.message}</li>`;
    console.error("Erro na consulta:", error);
  }
});