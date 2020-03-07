CREATE TABLE if NOT EXISTS record_cart(
  cart_id int primary key auto_increment,
  user_id int not null default 1,
  total_price int,
  total_quantity int
);

CREATE TABLE if NOT EXISTS record(
  record_id int primary key auto_increment,
  record_name varchar(25) not null,
  record_description varchar(250),
  record_price int default 20
);

CREATE TABLE if NOT EXISTS cart_item(
  cart_item_id int primary key auto_increment,
  cart_id int,
  quantity int not null default 1,
  record_id int
);

ALTER TABLE cart_item 
   ADD FOREIGN KEY (record_id) REFERENCES record (record_id);

ALTER TABLE cart_item 
   ADD FOREIGN KEY (cart_id) REFERENCES record_cart (cart_id);