# JevaBlog

## Installation
Before proceeding, you need to have the following intalled:
 - NodeJS 9.6.0 (https://nodejs.org/en/download/)
 - NPM 5.6.0 (this comes with nodejs)
 - PostgreSQL 9.6 (https://www.postgresql.org/download/)

### Backend
Now we need to install packages in server folder
```sh
npm install
sudo npm install -g knex
sudo npm install -g knex-migrations
```
Next we need to create database
```sh
PC:~$: sudo su - postgres
postgres@PC:̃$ psql
postgres=# CREATE ROLE $username WITH LOGIN PASSWORD '$password';
postgres=# CREATE DATABASE jevablog;
postgres=# GRANT ALL PRIVILEGES ON DATABASE jevablog TO $username;
```
Where $username and $password are your own values, which you will also specify inside server/.env file
After this we can init the database by running migrations.
In the server folder, run:
```sh
knex-migrations up
```
And now we just run the backend with the following
```sh
npm start
```
### Frontend
TODO
