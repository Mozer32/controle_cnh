# 🌐 Configurando GitHub Pages

## 🎯 Como ativar o GitHub Pages

### Passo 1: Acessar as configurações
1. Vá para seu repositório: `https://github.com/Mozer32/controle_cnh`
2. Clique na aba **Settings** (Configurações)
3. No menu lateral esquerdo, clique em **Pages**

### Passo 2: Configurar a fonte
1. Em **Source** (Fonte), selecione **Deploy from a branch**
2. Em **Branch**, selecione **main**
3. Em **Folder**, deixe **/ (root)**
4. Clique em **Save**

### Passo 3: Aguardar o deploy
- O GitHub vai fazer o build automaticamente
- Aguarde alguns minutos para o deploy
- Você verá uma mensagem: "Your site is published at..."

## 🌍 URL da sua aplicação

Após o deploy, sua aplicação estará disponível em:
```
https://mozer32.github.io/controle_cnh/
```

## ✨ O que foi configurado

### 📁 Arquivo `index.html`
- **Versão standalone** para GitHub Pages
- **Credenciais embutidas** (sem dependência de config.js)
- **Mesma interface** da versão desktop
- **Funciona imediatamente** sem configuração

### 🔒 Segurança
- **Credenciais públicas** (necessário para GitHub Pages)
- **Apenas leitura/escrita** no banco de dados
- **Sem acesso administrativo** ao Supabase

## 📱 Como usar

### Para você:
1. Acesse: `https://mozer32.github.io/controle_cnh/`
2. Use normalmente como a versão desktop

### Para outros usuários:
1. Acesse a URL pública
2. Cadastre pessoas e CNHs
3. Consulte vencimentos
4. Funciona em qualquer dispositivo

## 🔄 Atualizações

### Para atualizar a aplicação:
```bash
# Faça suas alterações
git add .
git commit -m "Atualização da aplicação"
git push origin main

# O GitHub Pages atualiza automaticamente
```

### Tempo de atualização:
- **Deploy automático** após push
- **Aguarde 2-5 minutos** para propagação
- **Cache do navegador** pode precisar de refresh

## 🛠️ Solução de problemas

### Se a página não carrega:
1. Verifique se o GitHub Pages está ativo
2. Aguarde mais tempo para o deploy
3. Limpe o cache do navegador (Ctrl+F5)

### Se há erros de conexão:
1. Verifique se as credenciais do Supabase estão corretas
2. Confirme se a tabela `usuarios_javascript` existe
3. Verifique as permissões RLS no Supabase

## 📊 Monitoramento

### Status do deploy:
- Vá em **Actions** no seu repositório
- Veja o status do deploy do GitHub Pages
- Logs detalhados em caso de erro

### Analytics (opcional):
- Vá em **Settings > Pages**
- Ative **Google Analytics** se quiser

## 🎉 Pronto!

Sua aplicação estará disponível publicamente em:
**https://mozer32.github.io/controle_cnh/**

Qualquer pessoa poderá acessar e usar o sistema de controle de CNHs! 🚀 