create database db_acmefilmes_DS2A_B;

use db_acmefilmes_DS2A_B;

create table tbl_classificacao
(
	id integer primary key auto_increment not null,
	sigla varchar(2) not null,
    icone varchar(150) not null,
    descricao varchar(150) not null
);

create table tbl_filme
(
	id integer primary key auto_increment not null,
    nome varchar(80) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(200) not null,
    link_trailer varchar(150) not null,
    
    classificacao_id integer not null,
    
    unique index (id),
    unique key (id),
    
    foreign key (classificacao_id) references tbl_classificacao(id)
);

create table tbl_genero
(
	id integer primary key auto_increment not null,
	nome varchar(50) not null
);

create table tbl_filmes_genero
(
	id integer primary key auto_increment not null,
    genero_id integer not null,
    filme_id integer not null,
    
    foreign key (genero_id) references tbl_genero(id),
    foreign key (filme_id) references tbl_filme(id)
);

create table tbl_filmes_atores
(
	id integer primary key auto_increment not null,
    filme_id integer not null,
    ator_id integer not null,
    
    foreign key (filme_id) references tbl_filme(id),
    foreign key (ator_id) references tbl_atores(id)
);

create table tbl_sexo
(
	id integer primary key auto_increment not null,
    nome varchar(9) not null,
    sigla varchar(1) not null
);

create table tbl_atores
(
	id integer primary key auto_increment not null,
    nome varchar(150) not null,
    data_nascimento date not null,
    data_falecimento date not null,
    biografia varchar(255) not null,
    sexo_id integer not null,
    
    foreign key (sexo_id) references tbl_sexo(id)
);

create table tbl_atores_nacionalidade
(
	id integer primary key auto_increment not null,
    atores_id integer not null,
    nacionalidade_id integer not null,
    
    foreign key (atores_id) references tbl_atores(id),
    foreign key (nacionalidade_id) references tbl_nacionalidade(id)
);

create table tbl_nacionalidade
(
	id integer primary key auto_increment not null,
    nome varchar(45) not null
);

create table tbl_diretores
(
	id integer primary key auto_increment not null,
    nome varchar(150) not null
);

create table tbl_filmes_diretores 
(
	id integer primary key auto_increment not null,
    filme_id integer,
    diretor_id integer,
    
    foreign key (filme_id) references tbl_filme (id),
    foreign key (diretor_id) references tbl_diretores(id)
);

select * from tbl_filme;

-- POST
insert into tbl_classificacao(sigla, icone, descricao)values
("L", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DJCTQ_-_L.svg/75px-DJCTQ_-_L.svg.png", "História sem conteúdos potencialmente prejudiciais para qualquer faixa etária."),
("10", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DJCTQ_-_10.svg/75px-DJCTQ_-_10.svg.png", "História de conteúdo violento e linguagem imprópria de nível leve."),
("12", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/DJCTQ_-_12.svg/75px-DJCTQ_-_12.svg.png", "Histórias com cenas de agressão física, insinuação de consumo de drogas e insinuação leve de sexo."),
("14", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/DJCTQ_-_14.svg/75px-DJCTQ_-_14.svg.png", "Histórias com agressão física média, consumo de drogas explícito e insinuação de sexo moderada."),
("16", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/DJCTQ_-_16.svg/75px-DJCTQ_-_16.svg.png", "Histórias com consumo de drogas explícito, agressão física acentuada e insinuação de sexo acentuada."),
("18", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/DJCTQ_-_18.svg/75px-DJCTQ_-_18.svg.png", "Histórias com consumo e indução ao consumo de drogas, violência extrema, suicídio, cenas de sexo explícitas e distúrbios psicossomáticos.");

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