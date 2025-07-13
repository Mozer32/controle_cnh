# 🚀 Guia de Deploy - Controle de CNHs

## Deploy Local
1. Clone o repositório
2. Configure o Supabase (`src/assets/js/config.js`)
3. Abra `src/index.html` no navegador

## Deploy em Produção (GitHub Pages ou Vercel)
- **GitHub Pages**: basta publicar a pasta `src/` como site estático
- **Vercel/Netlify**: importe o repositório e aponte para `src/index.html`
- **Supabase**: mantenha apenas a chave `anon` no frontend

## Variáveis de Ambiente
- Nunca exponha a chave `service_role` no frontend
- Use apenas a chave `anon` para aplicações públicas

## Backup e Restauração
- Use o painel do Supabase para backups automáticos
- Teste restauração periodicamente

## Scripts SQL
- Veja `database/setup.sql` e `database/security.sql` para estrutura e segurança 