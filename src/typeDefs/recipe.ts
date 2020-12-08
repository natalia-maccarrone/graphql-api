export const { gql } = require('apollo-server');

module.exports = gql`
  # queries
  extend type Query {
    getRecipes: [Recipe]!
    getOneRecipe(recipeId: ID!): Recipe
    getMyRecipes: [Recipe]!
  }

  # object types
  type Recipe {
    id: ID!
    name: String!
    description: String!
    ingredients: [String!]!
    category: Category!
  }

  # mutations
  extend type Mutation {
    createRecipe(input: recipeInput): Recipe
    updateRecipe(recipeId: ID!, input: recipeInput): Recipe
    deleteRecipe(recipeId: ID!): String
  }

  # inputs
  input recipeInput {
    name: String!
    description: String!
    ingredients: [String!]!
    categoryId: ID!
  }
`;
