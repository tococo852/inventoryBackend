const { Client } = require("pg");

const SQL = `

CREATE TABLE IF NOT EXISTS item_family(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(255)
)

CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255)
);


CREATE TABLE IF NOT EXISTS measures (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  measure VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  family_id INTEGER REFERENCES item_family(id) ON DELETE SET NULL,
  measure_id INTEGER REFERENCES measures(id) ON DELETE SET NULL,
  barcode VARCHAR(255),
  price INTEGER,
  description VARCHAR(255),
  image_url VARCHAR(255),
  quantity NUMERIC,
  stock NUMERIC
);

CREATE TABLE IF NOT EXISTS variant_groups (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(255)

);

CREATE TABLE IF NOT EXISTS items_categories(
item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS variant_names (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
variant_group_id INTEGER REFERENCES variant_groups(id) ON DELETE CASCADE,
name VARCHAR(255)

);

CREATE TABLE IF NOT EXISTS items_variants (
variant_id INTEGER REFERENCES variant_names (id) ON DELETE CASCADE,
item_id INTEGER REFERENCES items(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ) UNIQUE,
   password VARCHAR ( 255 )
);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();