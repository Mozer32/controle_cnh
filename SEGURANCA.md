# 🔒 Guia de Segurança - Proteção de Credenciais

## ⚠️ IMPORTANTE: Proteja suas credenciais do Supabase!

### 🎯 **Como funciona agora:**

1. **Arquivo separado:** As credenciais estão em `config.js`
2. **Protegido pelo .gitignore:** O arquivo não será commitado
3. **Exemplo disponível:** `config.example.js` mostra como configurar

### 📋 **Passos para configurar:**

#### 1. **Primeira vez (setup):**
```bash
# Copie o arquivo de exemplo
cp config.example.js config.js

# Edite o arquivo config.js com suas credenciais
# Substitua:
# - sua_url_do_supabase_aqui
# - sua_chave_api_do_supabase_aqui
```

#### 2. **Verificar se está protegido:**
```bash
# Verifique se config.js está no .gitignore
git status
# Não deve aparecer config.js na lista
```

### 🔐 **Níveis de Segurança:**

#### ✅ **Básico (Atual):**
- Credenciais em arquivo separado
- Arquivo protegido pelo .gitignore
- Não aparece no repositório público

#### 🛡️ **Avançado (Para produção):**
- Use variáveis de ambiente
- Implemente autenticação de usuários
- Configure RLS (Row Level Security) no Supabase

### 📁 **Estrutura de arquivos:**

```
doc_web_dev/
├── Controle_CNHs.html          # Aplicação principal
├── config.js                   # 🔒 Credenciais (protegido)
├── config.example.js           # 📋 Exemplo de configuração
├── .gitignore                  # 🛡️ Protege config.js
└── SEGURANCA.md               # 📖 Este guia
```

### 🚨 **O que NUNCA fazer:**

- ❌ **Nunca** commite o arquivo `config.js`
- ❌ **Nunca** compartilhe suas credenciais
- ❌ **Nunca** coloque credenciais diretamente no HTML
- ❌ **Nunca** use credenciais de produção em desenvolvimento

### 🔄 **Para compartilhar o projeto:**

1. **Remova** o arquivo `config.js` do repositório
2. **Mantenha** o `config.example.js` como template
3. **Instrua** outros desenvolvedores a criar seu próprio `config.js`

### 📝 **Instruções para outros desenvolvedores:**

```bash
# 1. Clone o repositório
git clone [url-do-repositorio]

# 2. Copie o arquivo de exemplo
cp config.example.js config.js

# 3. Configure suas credenciais no config.js

# 4. Abra a aplicação
open Controle_CNHs.html
```

### 🎯 **Verificação de segurança:**

```bash
# Verifique se config.js está protegido
git status

# Se aparecer config.js, adicione ao .gitignore
echo "config.js" >> .gitignore
git add .gitignore
git commit -m "Adiciona config.js ao .gitignore"
```

---

**Lembre-se:** A segurança das suas credenciais é sua responsabilidade! 🔒 