INSERT INTO record(record_name, record_description, record_price)
VALUES 
  ('Pure Funk', 'All the classic jams for your perfect 70s theme party!', 18),
  ('Brutal Metal', 'Unleash the Beast!', 22),
  ('Groovy Goodness', 'The perfect soundtrack to your day!', 25);

INSERT INTO record_cart(user_id, total_price, total_quantity)
VALUES
  (1, 0, 0);
