dropdb ezxpress --if-exists

createdb ezxpress

knex migrate:latest --knexfile app/knexfile.js

knex seed:run --knexfile app/knexfile.js