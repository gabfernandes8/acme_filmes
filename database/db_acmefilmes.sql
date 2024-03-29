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
    valor_unitario float,
    unique index (id),
    unique key (id)
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

-- DELETE
delete from tbl_filme where id = 1;

-- PUT
update tbl_filme set 
					data_relancamento="2024-08-08",
                    sinopse="Uma versão melhorada de TB2";