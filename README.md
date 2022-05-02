# Fidelity card system

> Nextjs, PWA, Prisma, MySQL

# Start dev mode

```bash
yarn
yarn dev
```

# Start production mode

```bash
yarn server
```

# Configuration

## .env

```dotenv
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
PASSWORD=""
```

# MySQL databases on Linux server

## Launch docker image named mysql-server

```bash
$ docker pull mysql

$ mkdir /var/lib/mysql -p

$ docker run -d --name mysql-server -p 3306:3306 -v /var/lib/mysql:/var/lib/mysql -e "MYSQL_ROOT_PASSWORD=my_password" mysql
```

## Access to dockerized MySQL on server

```bash
$ mysql -h 127.0.0.1 -u root -p
```

# Helpers

## Prisma

- [Seed Prisma DB and Nextjs](https://planetscale.com/blog/how-to-seed-a-database-with-prisma-and-next-js)
