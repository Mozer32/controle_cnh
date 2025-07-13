const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Erro: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar no arquivo .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupSupabase() {
    console.log('🚀 Iniciando configuração automática do Supabase...\n');

    try {
        // 1. Criar tabela se não existir
        console.log('📋 1. Criando tabela usuarios_javascript...');
        const { error: tableError } = await supabase.rpc('exec_sql', {
            sql: `
                CREATE TABLE IF NOT EXISTS usuarios_javascript (
                    id SERIAL PRIMARY KEY,
                    nome VARCHAR(100) NOT NULL,
                    cpf VARCHAR(14) UNIQUE NOT NULL,
                    cnh VARCHAR(20) UNIQUE NOT NULL,
                    categoria VARCHAR(5) NOT NULL,
                    data_emissao DATE NOT NULL,
                    data_vencimento DATE NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
                );
            `
        });

        if (tableError) {
            console.log('⚠️  Tabela já existe ou erro:', tableError.message);
        } else {
            console.log('✅ Tabela criada com sucesso!');
        }

        // 2. Ativar RLS
        console.log('\n🔒 2. Ativando Row Level Security...');
        const { error: rlsError } = await supabase.rpc('exec_sql', {
            sql: 'ALTER TABLE usuarios_javascript ENABLE ROW LEVEL SECURITY;'
        });

        if (rlsError) {
            console.log('⚠️  RLS já ativado ou erro:', rlsError.message);
        } else {
            console.log('✅ RLS ativado com sucesso!');
        }

        // 3. Criar políticas
        console.log('\n🛡️  3. Criando políticas de segurança...');
        
        const policies = [
            {
                name: 'Usuários autenticados podem ler',
                sql: 'CREATE POLICY "Usuários autenticados podem ler" ON usuarios_javascript FOR SELECT USING (auth.role() = \'authenticated\');'
            },
            {
                name: 'Usuários autenticados podem inserir',
                sql: 'CREATE POLICY "Usuários autenticados podem inserir" ON usuarios_javascript FOR INSERT WITH CHECK (auth.role() = \'authenticated\');'
            },
            {
                name: 'Usuários autenticados podem atualizar',
                sql: 'CREATE POLICY "Usuários autenticados podem atualizar" ON usuarios_javascript FOR UPDATE USING (auth.role() = \'authenticated\');'
            },
            {
                name: 'Usuários autenticados podem deletar',
                sql: 'CREATE POLICY "Usuários autenticados podem deletar" ON usuarios_javascript FOR DELETE USING (auth.role() = \'authenticated\');'
            }
        ];

        for (const policy of policies) {
            try {
                // Primeiro tenta deletar se existir
                await supabase.rpc('exec_sql', {
                    sql: `DROP POLICY IF EXISTS "${policy.name}" ON usuarios_javascript;`
                });
                
                // Depois cria a nova política
                const { error } = await supabase.rpc('exec_sql', { sql: policy.sql });
                
                if (error) {
                    console.log(`⚠️  Política "${policy.name}": ${error.message}`);
                } else {
                    console.log(`✅ Política "${policy.name}" criada!`);
                }
            } catch (err) {
                console.log(`⚠️  Erro na política "${policy.name}": ${err.message}`);
            }
        }

        // 4. Criar tabela de auditoria
        console.log('\n📊 4. Criando sistema de auditoria...');
        const { error: auditError } = await supabase.rpc('exec_sql', {
            sql: `
                CREATE TABLE IF NOT EXISTS audit_logs (
                    id SERIAL PRIMARY KEY,
                    user_id UUID REFERENCES auth.users(id),
                    action TEXT NOT NULL,
                    table_name TEXT,
                    record_id INTEGER,
                    old_data JSONB,
                    new_data JSONB,
                    timestamp TIMESTAMP DEFAULT NOW()
                );
            `
        });

        if (auditError) {
            console.log('⚠️  Tabela de auditoria já existe ou erro:', auditError.message);
        } else {
            console.log('✅ Tabela de auditoria criada!');
        }

        // 5. Criar função de auditoria
        console.log('\n🔍 5. Criando função de auditoria...');
        const { error: functionError } = await supabase.rpc('exec_sql', {
            sql: `
                CREATE OR REPLACE FUNCTION log_changes()
                RETURNS TRIGGER AS $$
                BEGIN
                    INSERT INTO audit_logs (user_id, action, table_name, record_id, old_data, new_data)
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
            `
        });

        if (functionError) {
            console.log('⚠️  Função de auditoria já existe ou erro:', functionError.message);
        } else {
            console.log('✅ Função de auditoria criada!');
        }

        // 6. Criar trigger
        console.log('\n⚡ 6. Criando trigger de auditoria...');
        const { error: triggerError } = await supabase.rpc('exec_sql', {
            sql: `
                DROP TRIGGER IF EXISTS audit_usuarios_javascript ON usuarios_javascript;
                CREATE TRIGGER audit_usuarios_javascript
                    AFTER INSERT OR UPDATE OR DELETE ON usuarios_javascript
                    FOR EACH ROW EXECUTE FUNCTION log_changes();
            `
        });

        if (triggerError) {
            console.log('⚠️  Trigger já existe ou erro:', triggerError.message);
        } else {
            console.log('✅ Trigger de auditoria criado!');
        }

        console.log('\n🎉 Configuração completa!');
        console.log('\n📋 Próximos passos:');
        console.log('1. Configure a autenticação por email no Supabase Dashboard');
        console.log('2. Teste a aplicação localmente');
        console.log('3. Faça deploy no GitHub Pages ou Vercel');

    } catch (error) {
        console.error('❌ Erro durante a configuração:', error.message);
        console.log('\n💡 Dica: Verifique se você tem a chave SERVICE_ROLE no arquivo .env');
    }
}

setupSupabase(); 