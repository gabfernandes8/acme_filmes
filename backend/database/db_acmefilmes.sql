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
    nome varchar(15) not null,
    sigla varchar(2) not null
);

create table tbl_atores
(
	id integer primary key auto_increment not null,
    nome varchar(150) not null,
    data_nascimento date not null,
    data_falecimento date,
    biografia text not null,
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


DELIMITER $
create trigger tgr_del_ator
	before delete on tbl_atores
		for each row
        begin 
			delete from tbl_atores_nacionalidade WHERE atores_id = old.id;
			delete from tbl_filmes_atores WHERE ator_id = old.id;
        end $
DELIMITER ;

select * from tbl_diretores;

-- POST
insert into tbl_classificacao(sigla, icone, descricao)values
("L", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DJCTQ_-_L.svg/75px-DJCTQ_-_L.svg.png", "História sem conteúdos potencialmente prejudiciais para qualquer faixa etária."),
("10", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DJCTQ_-_10.svg/75px-DJCTQ_-_10.svg.png", "História de conteúdo violento e linguagem imprópria de nível leve."),
("12", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/DJCTQ_-_12.svg/75px-DJCTQ_-_12.svg.png", "Histórias com cenas de agressão física, insinuação de consumo de drogas e insinuação leve de sexo."),
("14", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/DJCTQ_-_14.svg/75px-DJCTQ_-_14.svg.png", "Histórias com agressão física média, consumo de drogas explícito e insinuação de sexo moderada."),
("16", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/DJCTQ_-_16.svg/75px-DJCTQ_-_16.svg.png", "Histórias com consumo de drogas explícito, agressão física acentuada e insinuação de sexo acentuada."),
("18", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/DJCTQ_-_18.svg/75px-DJCTQ_-_18.svg.png", "Histórias com consumo e indução ao consumo de drogas, violência extrema, suicídio, cenas de sexo explícitas e distúrbios psicossomáticos.");

insert into tbl_diretores(nome) values
("Steven Spielberg"),
("Jon Watts"),
("Greta Gerwig");

insert into tbl_atores (
                                            nome,
                                            data_nascimento,
                                            data_falecimento,
                                            biografia,
                                            sexo_id
                                        )values (
                                            'Margot Robbie',
                                            '1990-07-02',
                                            null,
-                                           'Margot Elise Robbie é uma atriz e produtora australiana, indicada a dois Óscares, quatro Globos de Ouro e cinco BAFTAs. Em 2017, a revista Time a nomeou uma das 100 pessoas mais influentes do mundo, e, em 2019, foi classificada entre as atrizes mais bem pagas do mundo pela Forbes.',     
											3
                                        );

-- GET
select * from tbl_filme where nome like '%be%';
select * from tbl_filme;

select * from tbl_diretores where nome like '%g%';

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