export const { gql } = require('apollo-server');

module.exports = gql`
  # object types
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    recipes: [Recipe]!
  }

  type Token {
    token: String!
  }

  # mutations
  extend type Mutation {
    signUp(input: signUpInput): User
    login(input: loginInput): Token
  }

  # inputs
  input signUpInput {
    name: String!
    email: String!
    password: String!
  }

  input loginInput {
    email: String!
    password: String!
  }
`;
