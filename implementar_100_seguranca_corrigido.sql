-- 🎯 SCRIPT CORRIGIDO PARA 100% DE SEGURANÇA - LOGS DE AUDITORIA
-- Execute este script no SQL Editor do Supabase

-- 1. Criar tabela de logs de auditoria (se não existir)
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    table_name TEXT,
    record_id INTEGER,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- 2. Criar função para registrar mudanças automaticamente
CREATE OR REPLACE FUNCTION log_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (
        user_id, 
        action, 
        table_name, 
        record_id, 
        old_data, 
        new_data
    )
    VALUES (
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Aplicar trigger na tabela usuarios_javascript (remover se existir primeiro)
DROP TRIGGER IF EXISTS audit_usuarios_javascript ON usuarios_javascript;
CREATE TRIGGER audit_usuarios_javascript
    AFTER INSERT OR UPDATE OR DELETE ON usuarios_javascript
    FOR EACH ROW EXECUTE FUNCTION log_changes();

-- 4. Habilitar RLS na tabela de logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 5. Remover política existente (se existir) e criar nova
DROP POLICY IF EXISTS "Apenas admins podem ver logs" ON audit_logs;
CREATE POLICY "Apenas admins podem ver logs" ON audit_logs
    FOR SELECT USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE email = 'seu-email-admin@exemplo.com' -- SUBSTITUA pelo seu email
        )
    );

-- 6. Criar índices (se não existirem)
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- 7. Verificar se tudo foi criado
SELECT 
    'Tabela audit_logs criada' as status,
    COUNT(*) as total_registros
FROM audit_logs;

-- 8. Verificar se o trigger foi criado
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'audit_usuarios_javascript';

-- 9. Verificar se a política foi criada
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'audit_logs';

-- 10. Testar trigger (opcional - remova depois)
-- INSERT INTO usuarios_javascript (nome, cpf, cnh, vencimento) 
-- VALUES ('Teste Auditoria', '12345678901', '12345678901', '2025-12-31');

-- 11. Verificar logs (opcional)
-- SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 5; 