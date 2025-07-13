# 🔐 Configuração de Autenticação Supabase - Guia Completo

## 🎯 O que foi implementado:

### ✨ Funcionalidades de Autenticação:
- ✅ **Login com email/senha**
- ✅ **Registro de novos usuários**
- ✅ **Recuperação de senha**
- ✅ **Sessão persistente**
- ✅ **Logout seguro**
- ✅ **Interface responsiva**

### 🛡️ Segurança:
- ✅ **Autenticação via Supabase Auth**
- ✅ **Senhas criptografadas**
- ✅ **Sessões seguras**
- ✅ **Validação de email**
- ✅ **Proteção contra ataques**

## 📋 Passos para Configurar no Supabase:

### 1. 🔧 Habilitar Autenticação

1. **Acesse o Dashboard do Supabase:**
   - Vá para [supabase.com](https://supabase.com)
   - Faça login na sua conta
   - Selecione seu projeto

2. **Navegue para Authentication:**
   - Menu lateral → **Authentication**
   - Clique em **Settings**

3. **Configure as opções:**
   ```
   ✅ Enable email confirmations: ON
   ✅ Enable email change confirmations: ON
   ✅ Enable phone confirmations: OFF (opcional)
   ✅ Enable phone change confirmations: OFF (opcional)
   ```

### 2. 📧 Configurar Email

1. **Vá para Email Templates:**
   - Authentication → **Email Templates**

2. **Configure os templates:**
   - **Confirm signup** - Email de confirmação
   - **Reset password** - Email de recuperação
   - **Change email address** - Mudança de email

3. **Personalize os emails:**
   ```html
   Assunto: Confirme sua conta - Controle de CNHs
   
   Olá!
   
   Clique no link abaixo para confirmar sua conta:
   {{ .ConfirmationURL }}
   
   Obrigado,
   Equipe Controle de CNHs
   ```

### 3. 🌐 Configurar URLs de Redirecionamento

1. **Vá para URL Configuration:**
   - Authentication → **Settings** → **URL Configuration**

2. **Adicione as URLs:**
   ```
   Site URL: https://mozer32.github.io/controle_cnh/
   
   Redirect URLs:
   - https://mozer32.github.io/controle_cnh/
   - https://mozer32.github.io/controle_cnh/index.html
   - http://localhost:3000/ (para desenvolvimento)
   ```

### 4. 🔒 Configurar Políticas de Segurança (RLS)

1. **Vá para Database:**
   - Menu lateral → **Database** → **Tables**

2. **Selecione a tabela `usuarios_javascript`**

3. **Vá para RLS (Row Level Security):**
   - Clique em **RLS** na tabela
   - Ative **Enable RLS**

4. **Crie políticas de acesso:**
   ```sql
   -- Política para usuários autenticados lerem dados
   CREATE POLICY "Usuários autenticados podem ler" ON usuarios_javascript
   FOR SELECT USING (auth.role() = 'authenticated');
   
   -- Política para usuários autenticados inserirem dados
   CREATE POLICY "Usuários autenticados podem inserir" ON usuarios_javascript
   FOR INSERT WITH CHECK (auth.role() = 'authenticated');
   
   -- Política para usuários autenticados atualizarem dados
   CREATE POLICY "Usuários autenticados podem atualizar" ON usuarios_javascript
   FOR UPDATE USING (auth.role() = 'authenticated');
   
   -- Política para usuários autenticados deletarem dados
   CREATE POLICY "Usuários autenticados podem deletar" ON usuarios_javascript
   FOR DELETE USING (auth.role() = 'authenticated');
   ```

### 5. 👥 Gerenciar Usuários

1. **Vá para Users:**
   - Authentication → **Users**

2. **Funcionalidades disponíveis:**
   - ✅ Ver todos os usuários
   - ✅ Editar informações
   - ✅ Desabilitar/habilitar usuários
   - ✅ Resetar senhas
   - ✅ Ver logs de atividade

## 🚀 Como usar o sistema:

### 📝 Para novos usuários:
1. Acesse a aplicação
2. Clique em **"Criar conta"**
3. Digite email e senha
4. Confirme o email recebido
5. Faça login

### 🔐 Para usuários existentes:
1. Digite email e senha
2. Clique em **"Entrar"**
3. Use o sistema normalmente

### 🔑 Para recuperar senha:
1. Clique em **"Esqueci minha senha"**
2. Digite seu email
3. Verifique a caixa de entrada
4. Clique no link de recuperação
5. Defina nova senha

## 🛠️ Personalizações Avançadas:

### 1. 🔐 Adicionar provedores OAuth:
```javascript
// Google OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://mozer32.github.io/controle_cnh/'
  }
});

// GitHub OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: 'https://mozer32.github.io/controle_cnh/'
  }
});
```

### 2. 📊 Adicionar perfis de usuário:
```sql
-- Criar tabela de perfis
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para criar perfil automaticamente
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
```

### 3. 🎨 Personalizar interface:
```css
/* Estilo para usuário logado */
.user-info {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

/* Badge de status */
.user-status {
  background: #27ae60;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
}
```

## 🔍 Monitoramento e Logs:

### 1. 📊 Ver logs de autenticação:
- Authentication → **Logs**
- Veja tentativas de login
- Monitore atividades suspeitas

### 2. 📈 Métricas de uso:
- Dashboard → **Analytics**
- Usuários ativos
- Tentativas de login
- Registros de novos usuários

## 🚨 Troubleshooting:

### Problema: Email não chega
**Solução:**
1. Verifique a pasta de spam
2. Confirme configuração de email no Supabase
3. Teste com email diferente

### Problema: Login não funciona
**Solução:**
1. Verifique se o email foi confirmado
2. Confirme se a senha está correta
3. Verifique logs de erro no console

### Problema: Redirecionamento não funciona
**Solução:**
1. Verifique URLs configuradas
2. Confirme se o domínio está correto
3. Teste em modo incógnito

## 📞 Suporte:

### Recursos úteis:
- [Documentação Supabase Auth](https://supabase.com/docs/guides/auth)
- [Exemplos de código](https://supabase.com/docs/guides/auth/examples)
- [Fórum da comunidade](https://github.com/supabase/supabase/discussions)

### Contato:
- Email: suporte@seudominio.com
- Discord: [Supabase Community](https://discord.supabase.com)

---

## 🔍 GUIA VISUAL - Onde encontrar as opções:

### 📍 Passo a passo detalhado:

#### 1. **Acesse o Dashboard:**
- Vá para [supabase.com](https://supabase.com)
- Faça login
- Clique no seu projeto

#### 2. **Encontre Authentication:**
- No menu lateral esquerdo, procure por **"Authentication"**
- Clique em **"Authentication"**

#### 3. **Vá para Settings:**
- Dentro de Authentication, clique em **"Settings"** (ou "Configurações")
- Deve aparecer uma aba com várias opções

#### 4. **Configure Email Confirmations:**
- Procure por **"Email confirmations"** ou **"Confirm email"**
- Deve haver um toggle/switch para ativar/desativar
- **Ative** a opção (mude para ON)

#### 5. **Outras opções importantes:**
- **"Enable email change confirmations"** - Ative
- **"Enable phone confirmations"** - Pode deixar OFF
- **"Enable phone change confirmations"** - Pode deixar OFF

### 🔍 Se não encontrar:

#### Opção A - Menu diferente:
- Alguns projetos têm menu ligeiramente diferente
- Procure por: **"Auth"**, **"Users"**, **"Settings"**, **"Configuration"**

#### Opção B - Versão mais antiga:
- Se não encontrar, pode estar usando versão mais antiga
- Procure por: **"Auth Settings"**, **"User Management"**

#### Opção C - Procurar por texto:
- Use Ctrl+F (Cmd+F no Mac) para procurar por:
- "email"
- "confirmation"
- "confirm"
- "settings"

### 📱 Interface mobile:
- No mobile, o menu pode estar em um botão hambúrguer (☰)
- Clique no ícone de menu para expandir as opções

### 🆘 Se ainda não encontrar:

1. **Verifique se está no projeto correto:**
   - No topo da página deve aparecer o nome do seu projeto
   - Se não for o correto, clique no seletor de projetos

2. **Procure por "Auth" ou "Authentication":**
   - Deve estar no menu lateral esquerdo
   - Pode estar agrupado com outras opções

3. **Verifique se tem permissões:**
   - Você precisa ser owner ou admin do projeto
   - Se não for, peça acesso ao administrador

4. **Tente navegar por:**
   - Dashboard → Authentication → Settings
   - Ou: Dashboard → Auth → Configuration
   - Ou: Dashboard → Users → Settings

### 📞 Ainda com problemas?

Se não conseguir encontrar, posso te ajudar de outras formas:

1. **Screenshot:** Tire um print da tela do seu dashboard
2. **Descrição:** Me diga o que você vê no menu lateral
3. **Versão:** Verifique se está usando a versão mais recente

---

**🎉 Parabéns!** Seu sistema agora tem autenticação profissional e segura! 🔐 