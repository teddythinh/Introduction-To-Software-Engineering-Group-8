use master
go

if db_id('usflixdb') is not null 
    drop database usflixdb
    go 

create database usflixdb
go 

use usflixdb
go 

create table users
(
    username varchar(100),
    password varchar(100),
    utype varchar(10)

    constraint pk_user
    primary key(username)
)

create table userInfo
(
    username varchar(100),
    pathid varchar(100),
    fullname varchar(100),
    genders varchar(100),
    cells varchar(100),
    age int
    
    constraint pk_userinfo 
    primary key(username, pathid)

    constraint fk_userinfo 
    foreign key(username)
    references users(username)
) 

create table movies
(
    id varchar(10),
    movie_name varchar(100)

    constraint pk_movies
    primary key(id)
)

create table genres(
    id varchar(10),
    genre_name varchar(100)

    constraint pk_genre
    primary key(id)
)

create table movieInfo
(
    id varchar(10),
    release date,
    source varchar(1000),
    imagesource varchar(1000)

    constraint pk_moviesinfo
    primary key(id)

    constraint fk_moviesinfo
    foreign key(id)
    references movies(id)
)

create table genreMoviesList(
    genre_id varchar(10),
    list_id varchar (10),
    movie_id varchar(10)
    
    constraint pk_genremovielist
    primary key(genre_id, list_id)

    constraint fk_genre_movielist_movies
    foreign key(movie_id)
    references movies(id),

    constraint fk_genre_movielist
    foreign key(genre_id)
    references genres(id)

)


insert users(username, password, utype)
values ('khoildm@gmail.com' , '1123', 'viewer'),
       ('nguyennt@gmail.com', '1233', 'viewer'),
       ('thinhphc@gmail.com', '1223', 'viewer'),
       ('lamnbh@gmail.com'  , '1012', 'viewer'),
       ('khanhnp@gmail.com' , '1001', 'viewer'),
       ('admin_01'          , '0001', 'admin'),
       ('admin_02'          , '0002', 'admin')

insert userInfo(username, pathid, fullname, genders, age, cells)
values ('khoildm@gmail.com' , '0001', 'Le Dang Minh Khoi'   , 'Nam', 20  , '1012312323'),
       ('nguyennt@gmail.com', '0002', 'Nguyen Trung Nguyen' , 'Nam', 20  , '1231234335'),
       ('thinhphc@gmail.com', '0003', 'Pham Huy Cuong Thinh', 'Nam', 20  , '1231231232'),
       ('lamnbh@gmail.com'  , '0004', 'Nguyen Bui Hoai Lam' , 'Nu' , 20  , '1231483443'),
       ('khanhnp@gmail.com' , '0005', 'Nguyen Phuong Khanh' , 'Nu' , 20  , '1231234323'),
       ('admin_01'          , 'ad01', null                  , null , null, null),
       ('admin_02'          , 'ad02', null                  , null , null, null)

insert movies(id, movie_name)
values ('001', 'Pirate of the Caribbean: At the World End'),
       ('002', 'Forrest Gump'),
       ('003', 'Minions: The Rise of Gru'),
       ('004', 'The Mask')

insert movieInfo(id, release)
values ('001', '2007-5-25'),
       ('002', '1994-7-6' ),
       ('003', '2022-7-1' ),
       ('004', '1994-7-29')

insert genres(id, genre_name)
values ('001', 'Fantasy'),
       ('002', 'Comedy'),
       ('003', 'Adventure'),
       ('004', 'Action'),
       ('005', 'Cartoon'),
       ('006', 'Romance'),
       ('007', 'Drama')

insert genreMoviesList(genre_id, list_id, movie_id)
values ('001', '1', '001'),
       ('001', '2', '004'),
       ('002', '1', '001'),
       ('002', '2', '002'),
       ('002', '3', '003'),
       ('002', '4', '004'),
       ('003', '1', '001'),
       ('004', '1', '001'),
       ('004', '2', '004'),
       ('005', '1', '003'),
       ('006', '1', '002'),
       ('006', '2', '004'),
       ('007', '1', '002')
