create database db_acmefilmes_DS2A_B;

use db_acmefilmes_DS2A_B;

create table tbl_filme
(
	id integer primary key auto_increment not null,
    nome varchar(80) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(200) not null,
    classificacao_id integer,
    unique index (id),
    unique key (id),
    
    foreign key (classificacao_id) references tbl_classificacao(id)
);

create table tbl_atores
(
	id integer primary key auto_increment not null,
    nome varchar(150),
    data_nascimento date
);

create table tbl_diretores
(
	id integer primary key auto_increment not null,
    nome varchar(150)
);

create table tbl_genero
(
	id integer primary key auto_increment not null,
	nome varchar(50)
);

create table tbl_classificacao
(
	id integer primary key auto_increment not null,
	idade integer
);

create table tbl_usuarios
(
	id integer primary key auto_increment not null,
	nome varchar(200),
    email varchar(100),
    data_nascimento date,
    senha varchar(10)
);

create table filmes_atores
(
	id integer primary key auto_increment not null,
	filme_id integer,
    ator_id integer,
    
    foreign key (filme_id) references tbl_filme(id),
    foreign key (ator_id) references tbl_atores(id)
);

create table filmes_genero
(
	id integer primary key auto_increment not null,
	filme_id integer,
    genero_id integer,
    
    foreign key (filme_id) references tbl_filme(id),
    foreign key (genero_id) references tbl_genero(id)
);

create table filme_diretor
(
	id integer primary key auto_increment not null,
	filme_id integer,
	diretor_id integer,
    
    foreign key (filme_id) references tbl_filme(id),
    foreign key (diretor_id) references tbl_diretores(id)
);

-- POST
insert into tbl_filme (nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor_unitario)values
("Teen Beach Movie", 
"Brady e McKenie são dois jovens surfistas que magicamente se tornam parte de um filme musical. Ao perceber que sua presença está alterando o roteiro original do filme, eles se esforçam para fazer tudo voltar ao normal e acabam se apaixonando.",
"01:50:00",
"2013-07-19",
null,
"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTVhfbGTThTm0Cr1B9aiFGRkBALQzUFzJ1_Xl-d52MpfOTAaZQx",
null),
("Gente Grande",
"A morte do treinador de basquete de infância de velhos amigos reúne a turma no mesmo lugar que celebraram um campeonato anos atrás. Os amigos, acompanhados de suas esposas e filhos, descobrem que idade não significa o mesmo que maturidade.",
"01:42:00",
"2010-09-24",
null,
"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS3KC5CYzKSIx0aKLEL-lYfeeF7lfTqcd4nVGWOwO2IZaBzfdaz",
15.21);

-- GET
select * from tbl_filme where nome like '%be%';
select * from tbl_filme;

-- DELETE
delete from tbl_filme where id = 1;

-- PUT
update tbl_filme set  
					nome = "Barbie",
					sinopse = "Barbie começa a ter pensamentos estranhos e sua aparência muda, então ela parte para o mundo real com Ken para tentar encontrar uma solução e voltar a ser uma boneca perfeita.",
					duracao = "01:54:00",
					data_lancamento = "2023-07-20",
					data_relancamento = "2024-03-20",
					foto_capa = "https://upload.wikimedia.org/wikipedia/pt/8/82/Barbie_%282023%29.jpg",
					valor_unitario = 20

					where id = 13;