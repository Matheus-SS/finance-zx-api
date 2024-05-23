create table tbl_users(
	id serial primary key,
	name varchar(100) not null,
	username varchar(30) not null,
	email varchar(50) unique not null,
	password varchar(250) not null,
	created_at bigint default extract(EPOCH from NOW()),
	updated_at bigint
);