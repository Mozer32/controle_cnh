-- 🔒 Script para Configurar RLS (Row Level Security)
-- 📋 Execute este código no SQL Editor do Supabase

-- ========================================
-- 1. ATIVAR RLS NA TABELA
-- ========================================

-- Ativar Row Level Security na tabela usuarios_javascript
ALTER TABLE usuarios_javascript ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 2. REMOVER POLÍTICAS EXISTENTES (se houver)
-- ========================================

-- Remover políticas existentes para evitar conflitos
DROP POLICY IF EXISTS "Usuários autenticados podem ler" ON usuarios_javascript;
DROP POLICY IF EXISTS "Usuários autenticados podem inserir" ON usuarios_javascript;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar" ON usuarios_javascript;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar" ON usuarios_javascript;

-- ========================================
-- 3. CRIAR POLÍTICAS DE SEGURANÇA
-- ========================================

-- Política 1: Usuários autenticados podem LER dados
CREATE POLICY "Usuários autenticados podem ler" ON usuarios_javascript
FOR SELECT USING (auth.role() = 'authenticated');

-- Política 2: Usuários autenticados podem INSERIR dados
CREATE POLICY "Usuários autenticados podem inserir" ON usuarios_javascript
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política 3: Usuários autenticados podem ATUALIZAR dados
CREATE POLICY "Usuários autenticados podem atualizar" ON usuarios_javascript
FOR UPDATE USING (auth.role() = 'authenticated');

-- Política 4: Usuários autenticados podem DELETAR dados
CREATE POLICY "Usuários autenticados podem deletar" ON usuarios_javascript
FOR DELETE USING (auth.role() = 'authenticated');

-- ========================================
-- 4. VERIFICAR CONFIGURAÇÃO
-- ========================================

-- Verificar se RLS está ativo
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'usuarios_javascript';

-- Verificar políticas criadas
SELECT policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'usuarios_javascript';

-- ========================================
-- 5. TESTE DE SEGURANÇA
-- ========================================

-- Teste 1: Tentar acessar sem autenticação (deve falhar)
-- SELECT * FROM usuarios_javascript;

-- Teste 2: Verificar se a tabela existe
SELECT COUNT(*) as total_registros FROM usuarios_javascript;

-- ========================================
-- ✅ CONFIGURAÇÃO CONCLUÍDA
-- ========================================

-- Resultado esperado:
-- 1. "Success. No rows returned" para todas as políticas
-- 2. rowsecurity = true na verificação
-- 3. 4 políticas criadas na verificação
-- 4. total_registros mostra quantidade de dados

-- ========================================
-- 📊 PRÓXIMOS PASSOS
-- ========================================

-- 1. Teste a aplicação localmente
-- 2. Verifique se o login funciona
-- 3. Confirme se os dados são carregados
-- 4. Teste sem login (deve falhar)

-- ========================================
-- 🚨 SE ALGO DER ERRADO
-- ========================================

-- Para desativar RLS temporariamente:
-- ALTER TABLE usuarios_javascript DISABLE ROW LEVEL SECURITY;

-- Para remover todas as políticas:
-- DROP POLICY IF EXISTS "Usuários autenticados podem ler" ON usuarios_javascript;
-- DROP POLICY IF EXISTS "Usuários autenticados podem inserir" ON usuarios_javascript;
-- DROP POLICY IF EXISTS "Usuários autenticados podem atualizar" ON usuarios_javascript;
-- DROP POLICY IF EXISTS "Usuários autenticados podem deletar" ON usuarios_javascript; 