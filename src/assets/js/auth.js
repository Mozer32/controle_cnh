// src/assets/js/auth.js

// Inicialização do Supabase
const SUPABASE_URL = window.SUPABASE_CONFIG.url;
const SUPABASE_API_KEY = window.SUPABASE_CONFIG.apiKey;
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Funções de autenticação
async function login(email, password) {
    return await supabase.auth.signInWithPassword({ email, password });
}

async function register(email, password) {
    return await supabase.auth.signUp({ email, password });
}

async function sendPasswordReset(email) {
    return await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
}

async function loginWithOTP(email) {
    return await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: window.location.origin } });
}

async function verifyOTP(email, token) {
    return await supabase.auth.verifyOtp({ email, token, type: 'email' });
}

async function logout() {
    return await supabase.auth.signOut();
}

window.Auth = { login, register, sendPasswordReset, loginWithOTP, verifyOTP, logout }; 