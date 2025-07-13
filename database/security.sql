-- database/security.sql
-- RLS, políticas e auditoria

-- Ativar RLS
alter table usuarios_javascript enable row level security;

-- Permitir apenas usuários autenticados
create policy if not exists "Usuários autenticados podem ler" on usuarios_javascript
    for select using (auth.role() = 'authenticated');
create policy if not exists "Usuários autenticados podem inserir" on usuarios_javascript
    for insert with check (auth.role() = 'authenticated');
create policy if not exists "Usuários autenticados podem atualizar" on usuarios_javascript
    for update using (auth.role() = 'authenticated');
create policy if not exists "Usuários autenticados podem deletar" on usuarios_javascript
    for delete using (auth.role() = 'authenticated');

-- Tabela de logs de auditoria
create table if not exists audit_logs (
    id serial primary key,
    user_id uuid references auth.users(id),
    action text not null,
    table_name text,
    record_id integer,
    old_data jsonb,
    new_data jsonb,
    timestamp timestamp default now()
);

-- Função e trigger de auditoria
create or replace function log_changes()
returns trigger as $$
begin
    insert into audit_logs (user_id, action, table_name, record_id, old_data, new_data)
    values (
        auth.uid(),
        tg_op,
        tg_table_name,
        coalesce(new.id, old.id),
        case when tg_op = 'DELETE' then to_jsonb(old) else null end,
        case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) else null end
    );
    return coalesce(new, old);
end;
$$ language plpgsql security definer;

drop trigger if exists audit_usuarios_javascript on usuarios_javascript;
create trigger audit_usuarios_javascript
    after insert or update or delete on usuarios_javascript
    for each row execute function log_changes();

-- Política para logs (apenas admin)
alter table audit_logs enable row level security;
drop policy if exists "Apenas admins podem ver logs" on audit_logs;
create policy "Apenas admins podem ver logs" on audit_logs
    for select using (
        auth.uid() in (select id from auth.users where email = 'SEU_EMAIL_ADMIN')
    ); 