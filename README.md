# graphql-recipes-api

A GraphQL API for food recipes management, written in TypeScript.

The main goal of this API is to provide a flexible and efficient backend service that allows to easily develop user interfaces for creating, sharing, and modifying food recipes; taking advantage of GraphQL's benefits. The API was built in TypeScript, using Express, Apollo Server, and the TypeGraphQL framework to efficiently integrate TypeScript patterns and functionality with GraphQL. PostgreSQL was used as database engine. Both the API and the database were deployed to Heroku. Please refer to the [API reference](#api-reference) section for technical and usage details.

## Technologies
- [Express](https://www.npmjs.com/package/express)
- [GraphQL](https://www.npmjs.com/package/graphql)
- [Apollo Server Express](https://www.npmjs.com/package/apollo-server-express)
- [TypeGraphQL](https://www.npmjs.com/package/type-graphql)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://www.npmjs.com/package/typeorm)
- [DataLoader](https://www.npmjs.com/package/dataloader)
- [TypeDI](https://www.npmjs.com/package/typedi)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)

## Local setup

- Clone the repo: `git clone https://github.com/TulioMolina/ts-graphql-recipes-api.git`
- Install dependencies: `npm install`
- Appropriately configure your development environment by creating a local Postgres database and `/.env` file with the following environment variables:
```
PORT=<chosen port>
JWT_SECRET=<chosen secret>
JWT_EXPIRES_IN=<jsonwebtoken expiration time format, for instance: 24h>
DATABASE_URL=<local database url following this pattern: postgres://<user>:<password>@localhost/<dbname>>
```
- Run locally on `PORT`: `npm run dev`

Deployed GraphQL API at this [link](https://tm-graphql-recipes-api.herokuapp.com/).

## API reference

### Arquitecture
This project was structured keeping in mind the dependency injection pattern to develop scalable, easy to test, and highly decoupled components. Moreover, three layers with clearly delimited responsibilities were implemented: resolvers (controllers), services (business logic), and repositories (persistence layer).

Data loaders were implemented to batch and, thus, drastically minimize to one the number of database queries per field resolver. Also, the TypeORM's QueryBuilder API was used in cases where more complex queries were required, like filtering recipes over several criteria.  

### Usage
The API consists of three main Object Types: ```Recipe```, ```Category```, and ```User```. Clients, represented through user objects, are authorized to mutate (create, update, delete) only their associated category and recipe objects. On the other hand, client authentication provides authorization to query any category or recipe. In that sense, First of all, a client must use the ```signUp``` mutation to create a new user and then authenticate to start querying and mutating the API.

### Authentication
The authentication mechanism is token-based with JWT tokens. These tokens solely contain user identification data as payload and are issued as return value to a ```login``` mutation. Therefore, to authenticate, the `Authorization: Bearer <token>` header must be included for any other query/mutation.

### Types definition

#### Object types:
```graphql
# Recipe object type. It has a many to one relation with both User and Category types
type Recipe {
  id: ID!
  name: String!
  description: String!
  ingredients: String!
  user: User!
  category: Category!
  createdAt: DateTime!
  updatedAt: DateTime!
}

# Category object type. It has a many to one relation with User type and one to many relation with Recipe type
type Category {
  id: ID!
  name: String!
  recipes: [Recipe!]!
  user: User!
  createdAt: DateTime!
  updatedAt: DateTime!
}

# User object type. It has one to many relation with both Category and Recipe types.
# A user is authorized to mutate only its related recipe and category objects
type User {
  id: ID!
  name: String!
  email: String!
  createdAt: DateTime!
  recipes: [Recipe!]!
  categories: [Category!]!
}

# JWT token object type. Used for client authentication. Span of 24h
type AuthToken {
  token: String!
}
```

#### Queries:
```graphql
type Query {
  # Returns an array of all existing recipes
  getRecipes: [Recipe!]!
  
  # Returns one recipe given either its name or id
  getOneRecipe(nameOrIdInput: NameOrIdInput!): Recipe!
  
  # Returns an array of all existing recipes belonging to the current user
  getMyRecipes: [Recipe!]!
  
  # Filters amongst all recipes matching the following criteria: array of recipe names, description,
  # ingredient, array of category names. Each criterion is optional, and they are
  # combined using AND logical operators. Returns an array of recipes
  getFilteredRecipes(filterInput: FilterInput!): [Recipe!]!
  
  # Returns an array of all existing categories
  getCategories: [Category!]!
  
  # Returns one category given either its name or id
  getOneCategory(nameOrIdInput: NameOrIdInput!): Category!
}
```

#### Mutations:
```graphql
type Mutation {
  # New user creation, returns the newly created user object
  signUp(userInput: UserInput!): User!
  
  # User login, returns JWT auth token
  login(loginInput: LoginInput!): AuthToken!
  
  # Creates a new recipe belonging to the current user and linked to an existing category provided
  # with either name or id. Returns the newly created recipe
  createRecipe(createRecipeInput: CreateRecipeInput!): Recipe!
  
  # Updates a recipe identified by either name or id. This operation may only be performed by the 
  # recipe's owner user. Returns the updated recipe
  updateRecipe(updateRecipeInput: UpdateRecipeInput!): Recipe!
  
  # Deletes a recipe identified by id. This operation may only be performed by the recipe's owner user.
  # Returns true if the operation was successful
  deleteRecipe(id: Int!): Boolean!
  
  # Creates a new category belonging to the current user. Returns the newly created category
  createCategory(createCategoryInput: CreateCategoryInput!): Category!
  
  # Updates a category identified by either name or id. This operation may only be performed by the 
  # category's owner user. Returns the updated category
  updateCategory(updateCategoryInput: UpdateCategoryInput!): Category!
  
  # Deletes a category identified by id. This operation may only be performed by the category's
  # owner user. All recipes related to this category object are also deleted on cascade.
  # Returns true if the operation was successful
  deleteCategory(id: Int!): Boolean!
}
```

#### Input types:
```graphql
# Type for defining and validating Recipe creation input data
input CreateRecipeInput {
  name: String!
  description: String!
  ingredients: String!
  categoryNameOrId: NameOrIdInput!
}

# Type for defining and validating Recipe update input data
input UpdateRecipeInput {
  recipeNameOrId: NameOrIdInput!
  name: String
  description: String
  ingredients: String
  categoryNameOrId: NameOrIdInput
}

# Type for defining and validating Category creation input data
input CreateCategoryInput {
  name: String!
}

# Type for defining and validating Category update input data
input UpdateCategoryInput {
  categoryNameOrId: NameOrIdInput!
  name: String!
}

# Type for defining and validating User creation input data
input UserInput {
  name: String!
  email: String!
  password: String!
}

# Type for defining and validating User login input data
input LoginInput {
  email: String!
  password: String!
}

# Input to uniquely find an object by either name or id. Only one of the fields is accepted.
input NameOrIdInput {
  id: Int
  name: String
}

# Type for defining and validating Recipe filtering input data
input FilterInput {
  nameList: [String!]
  descriptionTerm: String
  ingredient: String
  categoryNameList: [String!]
}
```
Please notice that this [deployed API's GraphQL playground](https://tm-graphql-recipes-api.herokuapp.com/) provides an interface that shows, on the **DOCS** tab, schema and definitions in a more readable and friendly way.
