# 🚗 Controle de CNHs

Sistema profissional para cadastro, consulta e controle de carteiras de habilitação (CNH), com autenticação segura, integração Supabase e interface moderna.

## Funcionalidades
- Cadastro de pessoas e CNHs
- Consulta de CNHs próximas do vencimento
- Autenticação (email/senha, 2FA)
- Recuperação de senha
- Segurança avançada (RLS, rate limiting, força de senha)
- Logs de auditoria

## Tecnologias
- HTML5, CSS3, JavaScript (ES6+)
- Supabase (Auth, Database, Storage)
- Estrutura modular e responsiva

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/controle-cnh.git
   cd controle-cnh
   ```
2. Configure o Supabase:
   - Crie um projeto no [Supabase](https://supabase.com/)
   - Copie a URL e a chave `anon`
   - Preencha em `src/assets/js/config.js`
3. Instale dependências (opcional, se usar Node):
   ```bash
   npm install
   ```
4. Rode localmente:
   - Abra `src/index.html` no navegador

## Estrutura do Projeto
```
controle-cnh/
├── src/
│   ├── index.html
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css
│   │   │   └── security.css
│   │   └── js/
│   │       ├── main.js
│   │       ├── auth.js
│   │       ├── security.js
│   │       └── database.js
│   └── config/
│       ├── config.js
│       └── config.example.js
├── database/
│   ├── setup.sql
│   └── security.sql
├── docs/
│   ├── README.md
│   ├── SECURITY.md
│   └── DEPLOYMENT.md
├── .gitignore
└── package.json
```

## Documentação
- [Guia de Segurança](./SECURITY.md)
- [Guia de Deploy](./DEPLOYMENT.md)

## Licença
MIT 