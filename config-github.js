// 🔐 Configurações do Supabase para GitHub Pages
// ⚠️ ATENÇÃO: Este arquivo contém credenciais públicas (anon key)
// A chave 'anon' é segura para uso público, mas a 'service_role' NÃO deve ser exposta

// Configurações do Supabase
const SUPABASE_CONFIG = {
    url: "https://kuenkqwckxctltlplmbg.supabase.co",
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1ZW5rcXdja3hjdGx0bHBsbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDg5NzAsImV4cCI6MjA2NjI4NDk3MH0.51ztyRF391PxfwzVD0VYP4SiCt5JCpnQftRbHFU8Y5g"
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = SUPABASE_CONFIG;
} else {
    // Browser
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}

// ⚠️ SEGURANÇA:
// 1. Esta é a chave 'anon' (pública) - segura para uso no frontend
// 2. A chave 'service_role' NUNCA deve ser exposta
// 3. Configure RLS (Row Level Security) no Supabase
// 4. Use políticas de acesso para proteger os dados 