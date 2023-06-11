# CAT API APPLICATION

This project is composed with backend and frontend directories which are needed to run separately. Mongodb is needed tobe installed and running.

## Node version `14.20.0`
## MongoDB version `4.4.16`

## Setup backend
- go to into `cat-node` directory.
- copy `.env.example` and paste `.env`.
- update `PORT`, `MONGO_HOST`, `MONGO_DB` and `FRONT_END_URL` values as relevant.
- `FRONT_END_URL` value is the url to `cat-frontend` development server.
- run `npm install`
- run `npm run dev`

```sh
cd cat-node
cp .env.example .env
npm install
npm start
```

## Setup frontend

- go to into `cat-frontend` directory.
- copy `.env.example` and paste `.env`.
- update `REACT_APP_BACKEND_URL` value as relevant.
- this value is the url to `cat-node` server.
- run `npm install`
- run `npm start`

```sh
cd cat-frontend
cp .env.example .env
npm install
npm start
```