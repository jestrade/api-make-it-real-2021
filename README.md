# Node APIRest

## Prerequisites

- [Node](https://nodejs.org/)
- NPM, built into Node.
- [Yarn](https://yarnpkg.com/getting-started/install)
- [MongoDB](https://www.mongodb.com/try/download/community) or [MondoDB Atlas](https://www.mongodb.com/cloud/atlas2)
- [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) or any client api rest.

## Before starting

Make sure you have yarn installed, run on console.

```sh
> yarn --version
```

If it return an error, please install [yarn](https://yarnpkg.com/getting-started/install).

```sh
> npm install -g yarn
```

## Clone the repo

```sh
> git clone https://github.com/jestrade/api-make-it-real-2021.git
```

## Enter to folder project

```sh
> cd api-make-it-real-2021
```

## Install the app

```sh
> yarn
```

## Create .env file

- Configuration Example:
  - HTTP_HOST -> IP of server, default is 127.0.0.1.
  - HTTP_PORT -> Node listening port, default is 3000.
  - LOG_ACCESS -> Path where the logs will be stored, don't specify the path, just the file name, default `access.log`.
  - JWTKEY -> Is used by [JWT](https://www.npmjs.com/package/jsonwebtoken) to sign the token.
  - APIWEATHERKEY -> Is used to consume the [API](https://openweathermap.org/api).
  - DB_CONNECTION_STRING -> Connection string to connect [mongodb](https://mongoosejs.com/docs/connections.html) database
  - SALT_ROUNDS -> Controls how much time is needed to calculate a single BCrypt hash, default is 10.

Example connection string local, more info. [MongoDB](https://www.mongodb.com/try/download/community).

```sh
mongodb://username:password@host:port/database
```

Example connection string in cloud, more info [MondoDB Atlas](https://www.mongodb.com/cloud/atlas2).

```sh
mongodb+srv://<username>:<password>@cluster0.rwp0b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

Rename .env.example to .env, and set parameters required, please dont include `env:`.

```yaml
env:

# This is parameters required.
HTTP_HOST=
HTTP_PORT=
LOG_ACCESS=
JWTKEY=
APIWEATHERKEY=
DB_CONNECTION_STRING=
SALT_ROUNDS=
```

## Install nodemon as development dependency

```sh
> yarn add -D nodemon
```

## Run the seeds

```sh
> yarn run seeds
```

## Run the app

### Without nodemon

Run project without nodemon

```sh
> yarn start
```

### With nodemon

Run project with nodemon

```sh
> yarn run dev
```

### Run tests

```sh
> yarn run test
```
