# 🛡️ Guia de Segurança - Controle de CNHs

## Princípios
- **Autenticação forte**: Supabase Auth (email/senha, 2FA)
- **RLS**: Row Level Security ativo em todas as tabelas sensíveis
- **Política de senhas fortes**: mínimo 8 caracteres, maiúscula, minúscula, número, especial
- **Rate limiting**: bloqueio após 5 tentativas de login
- **Logs de auditoria**: todas as ações sensíveis registradas
- **Credenciais protegidas**: nunca expor chaves sensíveis no repositório

## Checklist de Segurança
- [x] Autenticação Supabase
- [x] RLS configurado
- [x] Política de senhas fortes
- [x] Rate limiting
- [x] 2FA
- [x] Logs de auditoria
- [x] HTTPS obrigatório
- [x] Variáveis de ambiente para chaves

## Recomendações
- Nunca use a chave `service_role` no frontend
- Sempre ative RLS e revise as políticas
- Monitore logs de acesso e ações
- Faça backup regular do banco
- Use HTTPS em produção

## Scripts SQL úteis
Veja `database/security.sql` para exemplos de RLS, políticas e auditoria. 