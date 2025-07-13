// Versão 2.0 - Cadastro de Clientes para Auto Escola
// Salva dados no localStorage

const form = document.getElementById('formulario');
const mensagem = document.getElementById('mensagem');
const listaClientes = document.getElementById('lista-clientes');

let clientes = JSON.parse(localStorage.getItem('clientes_autoescola')) || [];
let editandoId = null;

function renderizarClientes() {
  listaClientes.innerHTML = '';
  if (clientes.length === 0) {
    listaClientes.innerHTML = '<li>Nenhum cliente cadastrado.</li>';
    return;
  }
  clientes.forEach((cliente, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${cliente.nome}</strong> (${cliente.idade} anos) - ${cliente.cidade}<br>
        Habilitado: ${cliente.habilitado === 'sim' ? 'Sim' : 'Não'}<br>
        CNH: ${cliente.numero_cnh || 'N/A'}<br>
        Validade: ${cliente.validade_cnh ? new Date(cliente.validade_cnh).toLocaleDateString('pt-BR') : 'N/A'}
      </div>
      <div class="acoes">
        <button class="acao-btn" onclick="editarCliente(${idx})">Editar</button>
        <button class="acao-btn" onclick="excluirCliente(${idx})">Excluir</button>
      </div>
    `;
    listaClientes.appendChild(li);
  });
}

window.editarCliente = function(idx) {
  const cliente = clientes[idx];
  document.getElementById('nome').value = cliente.nome;
  document.getElementById('idade').value = cliente.idade;
  document.getElementById('habilitado').value = cliente.habilitado;
  document.getElementById('cidade').value = cliente.cidade;
  document.getElementById('numero_cnh').value = cliente.numero_cnh || '';
  document.getElementById('validade_cnh').value = cliente.validade_cnh || '';
  editandoId = idx;
  mensagem.textContent = 'Editando cadastro. Salve para atualizar.';
  mensagem.className = '';
}

window.excluirCliente = function(idx) {
  if (confirm('Tem certeza que deseja excluir este cliente?')) {
    clientes.splice(idx, 1);
    localStorage.setItem('clientes_autoescola', JSON.stringify(clientes));
    renderizarClientes();
    mensagem.textContent = 'Cliente excluído com sucesso!';
    mensagem.className = 'sucesso';
  }
}

// --- SUPABASE CONFIG ---
const SUPABASE_URL = "https://kuenkqwckxctltlplmbg.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1ZW5rcXdja3hjdGx0bHBsbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDg5N0AsImV4cCI6MjA2NjI4NDk3MH0.51ztyRF391PxfwzVD0VYP4SiCt5JCpnQftRbHFU8Y5g";

const consultarBtn = document.getElementById("consultar");
const listaCNHs = document.getElementById("lista-cnhs");

// Substituir o submit para salvar no Supabase
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const idade = parseInt(document.getElementById('idade').value);
  const habilitado = document.getElementById('habilitado').value;
  const cidade = document.getElementById('cidade').value.trim();
  const numero_cnh = document.getElementById('numero_cnh').value.trim();
  const validade_cnh = document.getElementById('validade_cnh').value;

  if (habilitado === 'sim') {
    if (!numero_cnh) {
      mensagem.textContent = 'Informe o número da CNH.';
      mensagem.className = 'erro';
      return;
    }
    if (!validade_cnh) {
      mensagem.textContent = 'Informe a validade da CNH.';
      mensagem.className = 'erro';
      return;
    }
  }

  const novoCliente = { nome, idade, habilitado, cidade, numero_cnh, validade_cnh };

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
        body: JSON.stringify(novoCliente),
      }
    );
    if (response.ok) {
      mensagem.textContent = 'Cliente cadastrado com sucesso!';
      mensagem.className = 'sucesso';
      form.reset();
      renderizarClientes();
      setTimeout(() => {
        mensagem.textContent = '';
        mensagem.className = '';
      }, 2500);
    } else {
      const errorData = await response.json();
      mensagem.textContent = `Erro: ${errorData.message || response.status}`;
      mensagem.className = 'erro';
    }
  } catch (error) {
    mensagem.textContent = 'Erro de conexão com o servidor.';
    mensagem.className = 'erro';
    console.error(error);
  }
});

// Consulta CNHs próximas do vencimento (até 60 dias)
consultarBtn.addEventListener("click", async () => {
  listaCNHs.innerHTML = "<li>Buscando CNHs próximas do vencimento...</li>";
  try {
    const hoje = new Date();
    const sessentaDiasDepois = new Date();
    sessentaDiasDepois.setDate(hoje.getDate() + 60);
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
        let classeUrgencia = "normal";
        let corDias = "#27ae60";
        if (diffDays <= 15) {
          classeUrgencia = "urgente";
          corDias = "#e53935";
        } else if (diffDays <= 30) {
          classeUrgencia = "atencao";
          corDias = "#ffb300";
        }
        const dataFormatada = validadeDate.toLocaleDateString('pt-BR');
        const li = document.createElement("li");
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

renderizarClientes(); 