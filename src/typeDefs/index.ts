export const { gql } = require('apollo-server');

const userTypeDefs = require('./user');
const recipeTypeDefs = require('./recipe');
const categoryTypeDef = require('./category');

const typeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, userTypeDefs, recipeTypeDefs, categoryTypeDef];
