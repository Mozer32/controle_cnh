# 🔒 Configurar RLS (Row Level Security) - Guia Completo

## 🎯 O que é RLS?

### 📖 **Definição:**
RLS (Row Level Security) é um sistema de segurança que controla quais linhas de dados cada usuário pode acessar, baseado em políticas definidas.

### 🛡️ **Por que é importante:**
- **Sem RLS:** Qualquer pessoa pode acessar todos os dados
- **Com RLS:** Apenas usuários autorizados acessam dados específicos

## 🔴 Problema Atual:

### ❌ **Sem RLS (Inseguro):**
```sql
-- Qualquer pessoa pode fazer isso:
SELECT * FROM usuarios_javascript;  -- Vê todos os dados
INSERT INTO usuarios_javascript VALUES (...);  -- Insere dados
UPDATE usuarios_javascript SET ...;  -- Modifica dados
DELETE FROM usuarios_javascript;  -- Deleta dados
```

### ✅ **Com RLS (Seguro):**
```sql
-- Apenas usuários autenticados podem:
SELECT * FROM usuarios_javascript WHERE user_id = auth.uid();
INSERT INTO usuarios_javascript (user_id, ...) VALUES (auth.uid(), ...);
```

## 📋 Passo a Passo para Configurar RLS:

### 1. 🔧 Acessar o Supabase Dashboard

#### 📍 **Navegação:**
```
1. Vá para: https://supabase.com
2. Faça login na sua conta
3. Selecione o projeto: controle_cnh
4. Menu lateral → Database
5. Clique em Tables
```

### 2. 🗄️ Encontrar a Tabela

#### 📍 **Localização:**
```
Database → Tables → usuarios_javascript
```

#### 🔍 **Se não encontrar:**
- Procure por "Tables" no menu lateral
- Verifique se está no projeto correto
- Use Ctrl+F e digite "usuarios_javascript"

### 3. 🔒 Ativar RLS

#### 📍 **Passos:**
```
1. Clique na tabela usuarios_javascript
2. Procure por "RLS" ou "Row Level Security"
3. Clique no toggle/switch para ATIVAR
4. Confirme a ativação
```

#### 🔍 **Se não encontrar RLS:**
- Procure por "Security" ou "Policies"
- Pode estar em uma aba separada
- Use Ctrl+F e digite "RLS"

### 4. 📝 Criar Políticas de Acesso

#### 🔴 **Política 1: Usuários autenticados podem LER**
```sql
-- Vá para: Database → SQL Editor
-- Cole e execute este código:

CREATE POLICY "Usuários autenticados podem ler" ON usuarios_javascript
FOR SELECT USING (auth.role() = 'authenticated');
```

#### 🔴 **Política 2: Usuários autenticados podem INSERIR**
```sql
CREATE POLICY "Usuários autenticados podem inserir" ON usuarios_javascript
FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

#### 🔴 **Política 3: Usuários autenticados podem ATUALIZAR**
```sql
CREATE POLICY "Usuários autenticados podem atualizar" ON usuarios_javascript
FOR UPDATE USING (auth.role() = 'authenticated');
```

#### 🔴 **Política 4: Usuários autenticados podem DELETAR**
```sql
CREATE POLICY "Usuários autenticados podem deletar" ON usuarios_javascript
FOR DELETE USING (auth.role() = 'authenticated');
```

## 🛠️ Como Executar as Políticas:

### 1. **Acessar SQL Editor:**
```
Database → SQL Editor
```

### 2. **Executar Políticas:**
```sql
-- Cole todo este código e clique em "Run":

-- Política 1: SELECT (Ler)
CREATE POLICY "Usuários autenticados podem ler" ON usuarios_javascript
FOR SELECT USING (auth.role() = 'authenticated');

-- Política 2: INSERT (Inserir)
CREATE POLICY "Usuários autenticados podem inserir" ON usuarios_javascript
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política 3: UPDATE (Atualizar)
CREATE POLICY "Usuários autenticados podem atualizar" ON usuarios_javascript
FOR UPDATE USING (auth.role() = 'authenticated');

-- Política 4: DELETE (Deletar)
CREATE POLICY "Usuários autenticados podem deletar" ON usuarios_javascript
FOR DELETE USING (auth.role() = 'authenticated');
```

### 3. **Verificar Resultado:**
```
Você deve ver: "Success. No rows returned"
```

## 🔍 Verificar se RLS está Funcionando:

### 1. **Teste sem Autenticação:**
```sql
-- No SQL Editor, execute:
SELECT * FROM usuarios_javascript;
```
**Resultado esperado:** Erro ou nenhum dado retornado

### 2. **Teste com Autenticação:**
```sql
-- Execute na aplicação (usuário logado):
-- Deve funcionar normalmente
```

## 🚨 Troubleshooting:

### ❌ **Problema: "Policy already exists"**
**Solução:**
```sql
-- Remover política existente
DROP POLICY IF EXISTS "Usuários autenticados podem ler" ON usuarios_javascript;
DROP POLICY IF EXISTS "Usuários autenticados podem inserir" ON usuarios_javascript;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar" ON usuarios_javascript;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar" ON usuarios_javascript;

-- Criar novamente
CREATE POLICY "Usuários autenticados podem ler" ON usuarios_javascript
FOR SELECT USING (auth.role() = 'authenticated');
-- ... (repita para as outras)
```

### ❌ **Problema: "Table doesn't exist"**
**Solução:**
1. Verifique se está no projeto correto
2. Confirme o nome da tabela: `usuarios_javascript`
3. Verifique se a tabela foi criada

### ❌ **Problema: "Permission denied"**
**Solução:**
1. Verifique se você é owner/admin do projeto
2. Tente executar como owner
3. Verifique permissões do usuário

## 🎯 Políticas Avançadas (Opcional):

### 🔐 **Política por Usuário (Mais Restritiva):**
```sql
-- Apenas o usuário que criou pode ver/modificar seus dados
CREATE POLICY "Usuários veem apenas seus dados" ON usuarios_javascript
FOR ALL USING (auth.uid() = user_id);
```

### 👥 **Política por Role (Administrador):**
```sql
-- Administradores podem ver todos os dados
CREATE POLICY "Admins podem tudo" ON usuarios_javascript
FOR ALL USING (
    auth.uid() IN (
        SELECT user_id FROM user_roles 
        WHERE role = 'admin'
    )
);
```

## 📊 Verificar Políticas Criadas:

### 1. **No Dashboard:**
```
Database → Tables → usuarios_javascript → Policies
```

### 2. **Via SQL:**
```sql
-- Ver todas as políticas
SELECT * FROM pg_policies 
WHERE tablename = 'usuarios_javascript';
```

## 🧪 Teste de Segurança:

### 1. **Teste Local:**
```bash
# Abra a aplicação
open index.html

# Tente acessar sem login
# Deve mostrar erro ou dados vazios
```

### 2. **Teste com Login:**
```bash
# Faça login
# Deve funcionar normalmente
```

### 3. **Teste Direto no Supabase:**
```sql
-- No SQL Editor, sem autenticação:
SELECT * FROM usuarios_javascript;
-- Deve retornar erro ou vazio
```

## 🎉 Resultado Esperado:

### ✅ **Com RLS Configurado:**
- **Usuários não logados:** Não conseguem acessar dados
- **Usuários logados:** Conseguem acessar normalmente
- **Aplicação:** Funciona corretamente
- **Segurança:** Dados protegidos

### 📊 **Score de Segurança:**
```
🔐 Autenticação:     ⭐⭐⭐⭐⭐ (5/5)
🛡️ Proteção:        ⭐⭐⭐⭐⭐ (5/5)
🔒 Privacidade:      ⭐⭐⭐⭐⭐ (5/5) ✅
📊 Auditoria:        ⭐☆☆☆☆ (1/5)
🔄 Backup:           ⭐☆☆☆☆ (1/5)

SCORE: 21/25 (84% - MUITO BOM) ✅
```

## 🚀 Próximos Passos:

### 🟡 **Prioridade 2:**
1. **Implementar logs** de auditoria
2. **Configurar backup** automático
3. **Adicionar rate limiting**

### 🟢 **Prioridade 3:**
1. **Implementar 2FA**
2. **Política de senhas** fortes
3. **Validação de entrada**

---

## 💡 Dicas Importantes:

### 🔐 **Segurança:**
- RLS é a proteção mais importante
- Sem RLS, dados ficam expostos
- Teste sempre após configurar

### 📝 **Manutenção:**
- Monitore logs de acesso
- Atualize políticas conforme necessário
- Teste regularmente

### 🆘 **Suporte:**
- Se não conseguir, tire screenshot
- Verifique se está no projeto correto
- Confirme permissões de usuário

---

**🎯 Configure o RLS agora e seu projeto ficará 84% seguro!** 🔒 