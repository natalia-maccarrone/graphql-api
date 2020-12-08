export const { gql } = require('apollo-server');

module.exports = gql`
  # queries
  extend type Query {
    getCategories: [Category]!
    getOneCategory(categoryId: ID!): Category
  }

  # object types
  type Category {
    id: ID!
    name: String!
  }

  # mutations
  extend type Mutation {
    createCategory(name: String!): Category
    updateCategory(categoryId: ID!, name: String!): Category
    deleteCategory(categoryId: ID!): String
  }
`;
