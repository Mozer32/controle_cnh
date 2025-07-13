// src/assets/js/security.js

// Força de senha
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const errors = [];
    if (password.length < minLength) errors.push(`Mínimo ${minLength} caracteres`);
    if (!hasUpperCase) errors.push('Pelo menos uma letra maiúscula');
    if (!hasLowerCase) errors.push('Pelo menos uma letra minúscula');
    if (!hasNumbers) errors.push('Pelo menos um número');
    if (!hasSpecialChar) errors.push('Pelo menos um caractere especial (!@#$%^&*)');
    return { isValid: errors.length === 0, errors };
}

// Rate limiting simples (memória local)
const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000;
function checkRateLimit(email) {
    const now = Date.now();
    const attempts = loginAttempts.get(email) || [];
    const recentAttempts = attempts.filter(time => now - time < LOCKOUT_TIME);
    if (recentAttempts.length >= MAX_LOGIN_ATTEMPTS) return false;
    recentAttempts.push(now);
    loginAttempts.set(email, recentAttempts);
    return true;
}
function resetRateLimit(email) { loginAttempts.delete(email); }

// UI helpers
function showPasswordStrength(password) {
    const validation = validatePassword(password);
    const strengthBar = document.getElementById('password-strength');
    const strengthText = document.getElementById('password-strength-text');
    if (!strengthBar || !strengthText) return;
    const strength = validation.errors.length;
    const maxStrength = 5;
    const percentage = Math.max(0, ((maxStrength - strength) / maxStrength) * 100);
    strengthBar.style.width = percentage + '%';
    if (percentage >= 80) {
        strengthBar.className = 'strength-bar strong';
        strengthText.textContent = 'Forte';
        strengthText.className = 'strength-text strong';
    } else if (percentage >= 60) {
        strengthBar.className = 'strength-bar medium';
        strengthText.textContent = 'Média';
        strengthText.className = 'strength-text medium';
    } else if (percentage >= 40) {
        strengthBar.className = 'strength-bar weak';
        strengthText.textContent = 'Fraca';
        strengthText.className = 'strength-text weak';
    } else {
        strengthBar.className = 'strength-bar very-weak';
        strengthText.textContent = 'Muito Fraca';
        strengthText.className = 'strength-text very-weak';
    }
}

window.Security = { validatePassword, showPasswordStrength, checkRateLimit, resetRateLimit }; 