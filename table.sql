create table tbl_users(
	id serial primary key,
	name varchar(100) not null,
	username varchar(30) not null,
	email varchar(50) unique not null,
	password varchar(250) not null,
	created_at bigint,
	updated_at bigint
);

create table tbl_sessions(
	id uuid not null primary key,
	user_id int not null,
	is_active boolean not null,
	expires_in bigint not null,
	created_at bigint,
	updated_at bigint
);