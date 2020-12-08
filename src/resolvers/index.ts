const userResolvers = require('./user');
const recipeResolvers = require('./recipe');
const categoryResolvers = require('./category');

module.exports = [userResolvers, recipeResolvers, categoryResolvers];
