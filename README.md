# 🚗 Controle de CNHs - Aplicação Desktop

Sistema desktop para cadastro e controle de carteiras de habilitação com integração ao Supabase.

## 🎯 Sobre o Projeto

Esta é uma aplicação desktop simples que permite:
- ✅ Cadastrar pessoas com informações de CNH
- ✅ Consultar CNHs próximas do vencimento (60 dias)
- ✅ Interface moderna e responsiva
- ✅ Integração direta com Supabase
- ✅ Funciona offline (apenas precisa de internet para conectar ao banco)

## 🚀 Como Usar

### Método 1: Abrir no Navegador
1. **Navegue até a pasta do projeto**
2. **Abra o arquivo:** `public/index.html`
3. **Pronto!** A aplicação está funcionando

### Método 2: Servidor Local (Opcional)
Se quiser rodar com um servidor local:

```bash
# Instalar Python (se não tiver)
# macOS: brew install python
# Windows: baixar do python.org

# Navegar até a pasta
cd public

# Iniciar servidor Python
python -m http.server 8000

# Abrir no navegador: http://localhost:8000
```

## 📁 Estrutura do Projeto

```
doc_web_dev/
├── public/
│   ├── index.html          # Interface principal
│   ├── script.js           # Lógica da aplicação
│   └── style.css           # Estilos modernos
├── cadastro_cnh_1.0/       # Versão anterior
├── cadastro_cnh_2.0/       # Versão anterior
└── README.md               # Este arquivo
```

## 🛠️ Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Banco de Dados:** Supabase (PostgreSQL)
- **Design:** Interface moderna com gradientes e animações
- **Responsividade:** Funciona em desktop, tablet e mobile

## 📝 Funcionalidades

### Cadastro de Pessoas
- Nome completo
- Idade (16-120 anos)
- Status de habilitação
- Cidade
- Número da CNH (opcional)
- Data de validade da CNH (opcional)

### Consulta de CNHs
- Lista CNHs que vencem em até 60 dias
- Código de cores por urgência:
  - 🔴 **Vermelho:** Vence em 15 dias ou menos
  - 🟡 **Amarelo:** Vence em 16-30 dias
  - 🟢 **Verde:** Vence em 31-60 dias

## 🎨 Interface

- **Design moderno** com gradientes e efeitos de vidro
- **Animações suaves** para melhor experiência
- **Responsivo** para diferentes tamanhos de tela
- **Ícones intuitivos** para facilitar o uso
- **Feedback visual** para todas as ações

## 🔧 Configuração

A aplicação já está configurada com:
- ✅ URL do Supabase
- ✅ Chave de API do Supabase
- ✅ Conexão direta ao banco de dados

**Não precisa de configuração adicional!**

## 📱 Compatibilidade

- ✅ **Desktop:** Chrome, Firefox, Safari, Edge
- ✅ **Tablet:** iPad, Android tablets
- ✅ **Mobile:** iPhone, Android phones
- ✅ **Sistemas:** Windows, macOS, Linux

## 🚀 Próximas Funcionalidades

- [ ] Exportar dados para Excel/PDF
- [ ] Notificações de vencimento
- [ ] Backup automático
- [ ] Múltiplos usuários
- [ ] Relatórios avançados

## 📞 Suporte

Se encontrar algum problema:
1. Verifique sua conexão com a internet
2. Recarregue a página
3. Limpe o cache do navegador
4. Tente em outro navegador

---

**Desenvolvido com ❤️ para facilitar o controle de CNHs** 