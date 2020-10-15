# Microservice of my personal website

## How to start
To start the server just use `node`.

```shell
node index.js
```

If you are a developer, you can use `nodemon` to restart the server whenever
you save a file.

```shell
nodemon index.js
```

You also could use the provided script to start the server with
`nodemon`.

```shell
yarn start
```

## Setup
Before you can use the server, you need to be sure that you've created all the
requred files. First you need to create the `postgres.json` file, which
contains all the information about the database.

```json
{
  "database": "database name",
  "user": "username",
  "password": "password",
  "host": "localhost",
  "port": 5432
}
```

Next you need to create an RSA256 key pair, which will be used to sign and
verify json web tokens. To create a key pair, enter the following
command in the terminal.

```shell
ssh-keygen -t rsa -b 4096 -m PEM -f private.key
```

This will generate a new private key in PEM format and a public key.  The next
step is to rewrite the public key in PEM format.

```shell
openssl rsa -in private.key -pubout -outform PEM -out private.key.pub
```

The last step is to rename the public key file.

```shell
mv private.key.pub public.key
```
