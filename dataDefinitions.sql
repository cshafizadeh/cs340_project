---- Part A ----

create table if not exists customer (
    customerId int(11) auto_increment not null primary key unique,
    customerFirstName varchar(255) not null,
    customerLastName varchar(255) not null
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table if not exists `order` (
    orderId int(11) auto_increment not null primary key unique,
    orderDate date not null,
    customerId int(11),
    foreign key (customerId) references customer(customerId) on delete cascade 
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table if not exists item (
    itemId int(11) auto_increment not null primary key unique,
    itemTitle varchar(255) unique not null,
    itemDesc text
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table if not exists orderItem (
    quantity int(11) not null,
    itemId int(11),
    orderId int(11),
    foreign key (itemId) references item(itemId) on delete cascade 
    foreign key (orderId) references `order`(orderId) on delete cascade 
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

------------------------------------

---- Part B ----

insert into customer(customerFirstName, customerLastName) 
    values('Bob', 'Smith');

insert into customer(customerFirstName, customerLastName)
    values('Mary', 'Jane');

insert into customer(customerFirstName, customerLastName)
    values('Doug', 'Johnson');

insert into customer(customerFirstName, customerLastName)
    values('Sally', 'Thompson');

insert into `order`(orderDate, customerId)
    values('2021-10-13', (select customerId from customer where customerFirstName='Bob' and customerLastName='Smith'));

insert into `order`(orderDate, customerId)
    values('2020-04-02', (select customerId from customer where customerFirstName='Bob' and customerLastName='Smith'));

insert into `order`(orderDate, customerId)
    values('2022-07-14', (select customerId from customer where customerFirstName='Mary' and customerLastName='Jane'));

insert into `order`(orderDate, customerId)
    values('2019-09-01', (select customerId from customer where customerFirstName='Mary' and customerLastName='Jane'));

insert into `order`(orderDate, customerId)
    values('2020-02-28', (select customerId from customer where customerFirstName='Doug' and customerLastName='Johnson'));

insert into `order`(orderDate, customerId)
    values('2022-04-28', (select customerId from customer where customerFirstName='Doug' and customerLastName='Johnson'));

insert into `order`(orderDate, customerId)
    values('2021-06-07', (select customerId from customer where customerFirstName='Sally' and customerLastName='Thompson'));

insert into `order`(orderDate, customerId)
    values('2020-12-13', (select customerId from customer where customerFirstName='Sally' and customerLastName='Thompson'));

insert into item(itemTitle, itemDesc)
    values('Beaver Hoodie', 'Black Beaver Clothing Hoodie');

insert into item(itemTitle, itemDesc)
    values('Beaver Polo', 'Grey Beaver Clothing Polo');

insert into item(itemTitle, itemDesc)
    values('Beaver Cap', 'White Beaver Clothing Baseball Cap');

insert into item(itemTitle, itemDesc)
    values('Beaver Stickers', 'Various Beaver Clothing Co stickers');

insert into orderItem(quantity, itemId, orderId)
    values(2, (select itemId from item where itemTitle='Beaver Hoodie'), (select orderId from `order` where orderId=1));

insert into orderItem(quantity, itemId, orderId)
    values(1, (select itemId from item where itemTitle='Beaver Polo'), (select orderId from `order` where orderId=5));

insert into orderItem(quantity, itemId, orderId)
    values(1, (select itemId from item where itemTitle='Beaver Hoodie'), (select orderId from `order` where orderId=1));

insert into orderItem(quantity, itemId, orderId)
    values(3, (select itemId from item where itemTitle='Beaver Stickers'), (select orderId from `order` where orderId=7));

insert into orderItem(quantity, itemId, orderId)
    values(11, (select itemId from item where itemTitle='Beaver Cap'), (select orderId from `order` where orderId=4));

------------------------------------
--================================

