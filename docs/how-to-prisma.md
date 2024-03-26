###  Use case 1: You want to update the schema of your database

1. Update the schema in `prisma/schema.prisma`
2. Run the following command to migrate the database locally
```bash
# Migrate the database locally to reflect the changes in the schema 
# This command will apply the changes in the schema to the database
$ npm run prisma:migrate:dev
```
3. Run the following command to generate the prisma client
```bash
# Generate updated prisma client to reflect the changes in the schema
# This command will generate the prisma client in the `node_modules/.prisma/client` directory
# The generated client will be used by the app to interact with the database
$ npm run prisma:generate
```
