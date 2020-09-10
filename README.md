# ts-graphql-recipes-api

A GraphQL API for food recipes management, written in TypeScript.

The main goal of this API is to provide their users with an interface to easily create, store, share and modify their favorite food recipes. The API was developed in TypeScript, using Express, Apollo Server and the TypeGraphQL framework to efficiently integrate TypeScript patterns and functionality with GraphQL. PostgreSQL was used as database engine. Both the API and the database were deployed to Heroku. Please refer to the [API reference](#api-reference) section for usage and technical details.

## Technologies
- [Express](https://www.npmjs.com/package/express)
- [GraphQL](https://www.npmjs.com/package/graphql)
- [Apollo Server Express](https://www.npmjs.com/package/apollo-server-express)
- [TypeGraphQL](https://www.npmjs.com/package/type-graphql)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://www.npmjs.com/package/typeorm)
- [DataLoader](https://www.npmjs.com/package/dataloader)
- [TypeDI](https://www.npmjs.com/package/typedi)
- [JWT](https://jwt.io/), [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)

## API reference

The API consists of three main Object Types: ```Recipe```, ```Category``` and ```User```. Clients, represented through user objects, are authorized to mutate (create, update, delete) only on their owned category and recipe objects. On the other hand, only authentication is required to query categories or recipes. 
