// src/assets/js/main.js

// Exemplo de inicialização e controle de telas
window.addEventListener('DOMContentLoaded', () => {
    // Exemplo: esconder loading e mostrar login
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';

    // Força da senha no registro
    const registerPassword = document.getElementById('registerPassword');
    if (registerPassword) {
        registerPassword.addEventListener('input', function() {
            window.Security.showPasswordStrength(this.value);
        });
    }

    // Login
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (!window.Security.checkRateLimit(email)) {
            alert('Muitas tentativas. Aguarde alguns minutos.');
            return;
        }
        const { data, error } = await window.Auth.login(email, password);
        if (error) {
            alert('Erro: ' + error.message);
        } else {
            window.Security.resetRateLimit(email);
            alert('Login realizado!');
            // TODO: mostrar tela principal
        }
    });

    // Registro
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        const validation = window.Security.validatePassword(password);
        if (!validation.isValid) {
            alert('Senha fraca: ' + validation.errors.join(', '));
            return;
        }
        const { data, error } = await window.Auth.register(email, password);
        if (error) {
            alert('Erro: ' + error.message);
        } else {
            alert('Conta criada! Verifique seu email.');
            // TODO: mostrar tela de login
        }
    });

    // TODO: Adicionar listeners para 2FA, recuperação de senha, cadastro CNH, consulta, etc.
}); 