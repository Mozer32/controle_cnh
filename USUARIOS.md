# 👥 Usuários Autorizados - Sistema de Controle de CNHs

## 🔐 Credenciais de Acesso

### Usuários Padrão (já configurados):

| Usuário | Senha | Tipo |
|---------|-------|------|
| `admin` | `admin123` | Administrador |
| `usuario1` | `senha123` | Usuário comum |
| `usuario2` | `senha456` | Usuário comum |
| `teste` | `teste123` | Usuário de teste |

## 🎯 Como usar:

1. **Acesse a aplicação:** `https://mozer32.github.io/controle_cnh/`
2. **Digite usuário e senha** de qualquer linha acima
3. **Clique em "Entrar"**
4. **Use o sistema normalmente**

## 🔧 Como adicionar/remover usuários:

### Para adicionar um novo usuário:
1. Abra o arquivo `index.html`
2. Procure por `USUARIOS_AUTORIZADOS`
3. Adicione uma nova linha:
   ```javascript
   'novo_usuario': 'nova_senha',
   ```

### Para remover um usuário:
1. Abra o arquivo `index.html`
2. Procure por `USUARIOS_AUTORIZADOS`
3. Remova a linha do usuário desejado

### Para alterar senha:
1. Abra o arquivo `index.html`
2. Procure por `USUARIOS_AUTORIZADOS`
3. Altere a senha na linha do usuário

## 🛡️ Segurança:

### ⚠️ IMPORTANTE:
- **Estas credenciais estão no código** (visíveis para quem acessar)
- **Para maior segurança**, implemente autenticação no Supabase
- **Em produção**, use variáveis de ambiente ou banco de dados

### 🔒 Recomendações:
1. **Use senhas fortes** (mínimo 8 caracteres, números, letras)
2. **Não compartilhe** as credenciais publicamente
3. **Altere as senhas** regularmente
4. **Remova usuários** que não precisam mais de acesso

## 📝 Exemplo de configuração segura:

```javascript
// Senhas mais seguras
const USUARIOS_AUTORIZADOS = {
    'admin': 'Admin@2024#',
    'gerente': 'Gerente@2024#',
    'operador': 'Operador@2024#',
    'teste': 'Teste@2024#'
};
```

## 🚨 Para maior segurança:

### Opção 1: Autenticação Supabase
- Configure autenticação no Supabase
- Use email/senha ou OAuth
- Mais seguro e profissional

### Opção 2: Variáveis de ambiente
- Use um backend para autenticação
- Credenciais em variáveis de ambiente
- Não expostas no frontend

### Opção 3: Banco de dados
- Armazene usuários no Supabase
- Verificação via API
- Controle total de acesso

## 📞 Suporte:

Se precisar de ajuda para implementar autenticação mais segura, consulte:
- [Documentação Supabase Auth](https://supabase.com/docs/guides/auth)
- [Guia de segurança](SEGURANCA.md)

---

**Lembre-se:** A segurança é responsabilidade de todos! 🔒 