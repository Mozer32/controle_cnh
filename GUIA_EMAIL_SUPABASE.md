# 📧 Guia Específico - Configurar Email no Supabase

## 🎯 O que você precisa encontrar:

### 🔍 Opções que devem estar ativadas:
- ✅ **Enable email confirmations** (ON)
- ✅ **Enable email change confirmations** (ON)
- ✅ **Enable password reset** (ON)

## 📍 Passo a passo EXATO:

### 1. **Acesse o Supabase:**
```
1. Vá para: https://supabase.com
2. Faça login na sua conta
3. Clique no seu projeto (controle_cnh)
```

### 2. **Encontre o menu Authentication:**
```
No menu lateral esquerdo, procure por:
┌─────────────────┐
│ 📊 Dashboard    │
│ 🔐 Authentication │ ← CLIQUE AQUI
│ 🗄️ Database     │
│ ⚙️ Settings     │
└─────────────────┘
```

### 3. **Dentro de Authentication:**
```
Você deve ver:
┌─────────────────┐
│ 👥 Users        │
│ 📧 Email Templates │
│ ⚙️ Settings     │ ← CLIQUE AQUI
│ 📊 Logs         │
└─────────────────┘
```

### 4. **Na página Settings:**
```
Procure por estas opções:

┌─────────────────────────────────────┐
│ 🔧 Authentication Settings          │
├─────────────────────────────────────┤
│ ☑️ Enable email confirmations      │ ← ATIVE ESTA
│ ☑️ Enable email change confirmations│ ← ATIVE ESTA
│ ☐ Enable phone confirmations       │ ← DEIXE DESATIVADA
│ ☐ Enable phone change confirmations│ ← DEIXE DESATIVADA
│ ☑️ Enable password reset           │ ← ATIVE ESTA
└─────────────────────────────────────┘
```

## 🔍 Se não encontrar "Authentication":

### Opção 1 - Menu diferente:
```
Procure por:
- "Auth"
- "Users" 
- "User Management"
- "Authentication"
```

### Opção 2 - Versão antiga:
```
Pode estar em:
- Dashboard → Auth → Settings
- Dashboard → Users → Configuration
- Dashboard → Settings → Auth
```

### Opção 3 - Busca rápida:
```
1. Pressione Ctrl+F (ou Cmd+F no Mac)
2. Digite: "email"
3. Procure por opções relacionadas
```

## 📱 Se estiver no mobile:

### Menu hambúrguer:
```
1. Clique no ícone ☰ (três linhas)
2. Procure por "Authentication"
3. Clique e navegue para "Settings"
```

## 🆘 Se ainda não encontrar:

### Verifique se está no projeto correto:
```
No topo da página deve aparecer:
┌─────────────────────────────────┐
│ [Dropdown] controle_cnh         │ ← Seu projeto
│                                 │
│ Dashboard | Authentication | ...│
└─────────────────────────────────┘
```

### Verifique permissões:
```
Você precisa ser:
- Owner do projeto, OU
- Admin do projeto

Se não for, peça acesso ao administrador.
```

## 🔧 Configurações alternativas:

### Se não encontrar as opções exatas:
```
Procure por termos similares:
- "Email verification"
- "Confirm signup"
- "Email validation"
- "User confirmation"
- "Account verification"
```

### Configuração via SQL (alternativa):
```sql
-- Se não encontrar as opções na interface, pode configurar via SQL
-- Vá para: Database → SQL Editor

-- Habilitar confirmação de email
UPDATE auth.config 
SET email_confirmation_required = true;

-- Habilitar reset de senha
UPDATE auth.config 
SET password_reset_enabled = true;
```

## 📞 Ainda com problemas?

### Me ajude a te ajudar:

1. **Descreva o que você vê:**
   - Que opções aparecem no menu lateral?
   - O que você vê quando clica em "Authentication"?

2. **Screenshot:**
   - Tire um print da tela do seu dashboard
   - Mostre o menu lateral

3. **URL atual:**
   - Copie a URL do navegador
   - Deve ser algo como: `https://supabase.com/dashboard/project/[ID]`

### Possíveis problemas:

#### Problema 1: Projeto não encontrado
```
Solução: Verifique se está logado na conta correta
```

#### Problema 2: Menu diferente
```
Solução: O Supabase atualizou a interface
Procure por "Auth" ou "Users"
```

#### Problema 3: Sem permissões
```
Solução: Peça acesso ao owner do projeto
```

## 🎯 Resumo rápido:

### O que você precisa fazer:
1. **Encontrar** "Authentication" no menu
2. **Clicar** em "Settings"
3. **Ativar** "Enable email confirmations"
4. **Ativar** "Enable email change confirmations"
5. **Ativar** "Enable password reset"

### Se não conseguir:
- Use Ctrl+F para procurar por "email"
- Procure por "Auth" em vez de "Authentication"
- Verifique se está no projeto correto

---

**💡 Dica:** As opções de email são essenciais para o sistema funcionar corretamente. Sem elas, os usuários não conseguirão confirmar suas contas ou recuperar senhas. 