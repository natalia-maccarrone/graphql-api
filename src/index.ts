import { Console } from 'console';
import { Url } from 'url';
require('dotenv').config();

// typeORM / database connection variables
require('reflect-metadata');
const { createConnection } = require('typeorm');

// Apollo server
const { ApolloServer } = require('apollo-server');

// typeORM schema and resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers/index');

// helpers
const { getUserId } = require('./helpers/index');

// creates connection to db
createConnection()
  .then(() => {
    console.log('Connected to database.');
  })
  .catch((error: Error) => console.log(error));

// initializes server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: { headers: { authorization: string } } }) => {
    const contextObj: { id?: number } = {};
    if (req.headers.authorization) {
      contextObj.id = getUserId(req);
    }
    return contextObj;
  },
  formatError: (error: Error) => {
    return {
      message: error.message
    };
  }
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }: { url: string }) => {
    console.log(`Server ready at ${url}`);
  });
