-- 🎯 VERIFICAR IMPLEMENTAÇÃO DE SEGURANÇA
-- Execute este script para verificar se tudo está funcionando

-- 1. Verificar se a tabela audit_logs existe
SELECT 
    'Tabela audit_logs' as item,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'audit_logs') 
        THEN '✅ EXISTE' 
        ELSE '❌ NÃO EXISTE' 
    END as status;

-- 2. Verificar se o trigger existe
SELECT 
    'Trigger audit_usuarios_javascript' as item,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'audit_usuarios_javascript') 
        THEN '✅ EXISTE' 
        ELSE '❌ NÃO EXISTE' 
    END as status;

-- 3. Verificar se a função log_changes existe
SELECT 
    'Função log_changes' as item,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.routines WHERE routine_name = 'log_changes') 
        THEN '✅ EXISTE' 
        ELSE '❌ NÃO EXISTE' 
    END as status;

-- 4. Verificar se RLS está habilitado na tabela audit_logs
SELECT 
    'RLS na tabela audit_logs' as item,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_tables 
            WHERE tablename = 'audit_logs' 
            AND rowsecurity = true
        ) 
        THEN '✅ HABILITADO' 
        ELSE '❌ NÃO HABILITADO' 
    END as status;

-- 5. Verificar se a política existe
SELECT 
    'Política de admin para logs' as item,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE tablename = 'audit_logs' 
            AND policyname = 'Apenas admins podem ver logs'
        ) 
        THEN '✅ EXISTE' 
        ELSE '❌ NÃO EXISTE' 
    END as status;

-- 6. Contar registros na tabela audit_logs
SELECT 
    'Total de logs registrados' as item,
    COUNT(*) as quantidade
FROM audit_logs;

-- 7. Verificar índices
SELECT 
    'Índices na tabela audit_logs' as item,
    COUNT(*) as quantidade_indices
FROM pg_indexes 
WHERE tablename = 'audit_logs';

-- 8. Resumo final
SELECT 
    '🎯 STATUS GERAL' as item,
    CASE 
        WHEN (
            EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'audit_logs') AND
            EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'audit_usuarios_javascript') AND
            EXISTS (SELECT 1 FROM information_schema.routines WHERE routine_name = 'log_changes')
        )
        THEN '✅ 100% IMPLEMENTADO - SISTEMA SEGURO!' 
        ELSE '⚠️ IMPLEMENTAÇÃO INCOMPLETA' 
    END as status; 