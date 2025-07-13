-- 🎯 SCRIPT PARA 100% DE SEGURANÇA - LOGS DE AUDITORIA
-- Execute este script no SQL Editor do Supabase

-- 1. Criar tabela de logs de auditoria
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

-- 3. Aplicar trigger na tabela usuarios_javascript
DROP TRIGGER IF EXISTS audit_usuarios_javascript ON usuarios_javascript;
CREATE TRIGGER audit_usuarios_javascript
    AFTER INSERT OR UPDATE OR DELETE ON usuarios_javascript
    FOR EACH ROW EXECUTE FUNCTION log_changes();

-- 4. Criar política RLS para a tabela de logs (apenas admins podem ver)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Apenas admins podem ver logs" ON audit_logs
    FOR SELECT USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE email = 'seu-email-admin@exemplo.com' -- SUBSTITUA pelo seu email
        )
    );

-- 5. Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- 6. Verificar se tudo foi criado
SELECT 
    'Tabela audit_logs criada' as status,
    COUNT(*) as total_registros
FROM audit_logs;

-- 7. Testar trigger (opcional - remova depois)
-- INSERT INTO usuarios_javascript (nome, cpf, cnh, vencimento) 
-- VALUES ('Teste Auditoria', '12345678901', '12345678901', '2025-12-31');

-- 8. Verificar logs (opcional)
-- SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 5; 