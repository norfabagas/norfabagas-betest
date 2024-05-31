# norfabagas-betest
BE test (create microservice for user authentication)

## Getting started
To run this repository, make sure you have npm & node installed (tested with node version 20.10.0 and npm version 10.7.0)

### Steps to run in local
- Create database (postgresql) in local environment
- Clone this repository
- Copy .env.example and paste it as .env file (for example `cp .env.example .env`)
- Fill in required environment values
- Run `npm install` to get all required dependencies
- Run `npm run migration:run` to migrate all database tables
- Run `npm run dev` for local deployment

### Build 
- Use `npm run build` to compile, and `npm run start` to run the compiled code (in dist/ folder)

### Docker build
- `docker-compose up --build`