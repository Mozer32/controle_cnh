// Exemplo de configuração do Supabase
// ⚠️ IMPORTANTE: 
// 1. Copie este arquivo para config.js
// 2. Substitua as credenciais pelas suas
// 3. O arquivo config.js será ignorado pelo git

const config = {
    SUPABASE_URL: "sua_url_do_supabase_aqui",
    SUPABASE_API_KEY: "sua_chave_api_do_supabase_aqui"
};

// Exportar para uso no HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.SUPABASE_CONFIG = config;
} 