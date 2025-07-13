-- database/setup.sql
-- Estrutura inicial da tabela de CNHs

create table if not exists usuarios_javascript (
    id serial primary key,
    nome text not null,
    idade integer not null,
    habilitado boolean not null,
    cidade text not null,
    numero_cnh text,
    validade_cnh date,
    user_id uuid references auth.users(id)
); 