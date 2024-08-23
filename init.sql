
drop table car;
drop table renting;

create table car (
    car_id uuid primary key,
    model text,
    type text,
    price numeric
);

create table renting (
    renting_id uuid primary key,
    car_id uuid,
    pickup_date timestamp,
    return_date timestamp,
    email text,
    price numeric,
    duration numeric,
    status text
);

insert into car (car_id, model, type, price) values ('8c0a59f4-64cb-436e-81c1-ae92f3c7be20', 'Gol', 'day', 100);
insert into car (car_id, model, type, price) values ('19af4f7a-f254-4e54-9365-f58a016e682a', 'Corsa', 'hour', 5);

