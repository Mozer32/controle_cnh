// src/assets/js/database.js

const SUPABASE_URL = window.SUPABASE_CONFIG.url;
const SUPABASE_API_KEY = window.SUPABASE_CONFIG.apiKey;
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

async function cadastrarPessoa(dados) {
    return await supabase.from('usuarios_javascript').insert([dados]);
}

async function consultarVencimentos(hoje, sessentaDiasISO) {
    return await supabase
        .from('usuarios_javascript')
        .select('*')
        .gte('validade_cnh', hoje)
        .lte('validade_cnh', sessentaDiasISO);
}

async function consultarTodos() {
    return await supabase
        .from('usuarios_javascript')
        .select('*')
        .order('nome', { ascending: true });
}

window.Database = { cadastrarPessoa, consultarVencimentos, consultarTodos }; 