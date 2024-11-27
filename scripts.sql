create table if not exists tbl_users(
	id serial primary key,
	name varchar(100) not null,
	email varchar(100) unique not null,
	url_avatar varchar(250),
	password varchar(250) not null,
	setting_id int,
	created_at bigint NOT NULL DEFAULT extract(EPOCH from NOW()),
	updated_at bigint
);
-- TRIGGER PARA ATUALIZAR CAMPO UPDATED_AT QUANDO ACONTECER UM UPDATE NA TABELA TBL_USERS
create or replace function update_updated_at()
returns trigger as $$
begin 
	new.updated_at = extract(epoch from now());
	return new;
end;
$$ language plpgsql;

create trigger tbl_users_set_updated_at
before update on tbl_users
for each row 
execute function update_updated_at();
--------------------------------------------------------------------
create table tbl_sessions(
	id uuid not null primary key,
	user_id int not null,
	is_active boolean not null,
	expires_in bigint not null,
	created_at bigint,
	updated_at bigint
);