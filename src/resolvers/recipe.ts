import { Recipe } from '../entity/Recipe';
import { getRepository, getConnection } from 'typeorm';

module.exports = {
  Query: {
    getRecipes: async (_: any, __: any, { id }: { id: number }) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const recipeRepository = await getRepository(Recipe);
          const recipes = await recipeRepository.find();
          return recipes;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    getOneRecipe: async (
      _: any,
      { recipeId }: { recipeId: number },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const recipe = await getRepository(Recipe)
            .createQueryBuilder('recipe')
            .where('recipe.id = :id', { id: recipeId })
            .getOne();
          return recipe;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    getMyRecipes: async (_: any, __: any, { id }: { id: number }) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const recipeRepository = await getRepository(Recipe);
          const recipes = await recipeRepository.find({
            where: { userId: id }
          });
          return recipes;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Mutation: {
    createRecipe: async (
      _: any,
      {
        input
      }: {
        input: {
          name: string;
          description: string;
          ingredients: string[];
          categoryId: number;
        };
      },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const recipeRepository = await getRepository(Recipe);
          const newRecipe = await recipeRepository
            .createQueryBuilder()
            .insert()
            .into(Recipe)
            .values({
              name: input.name,
              description: input.description,
              ingredients: input.ingredients,
              categoryId: input.categoryId,
              userId: id
            })
            .execute();
          return await recipeRepository.findOne({
            where: { id: newRecipe.identifiers[0].id }
          });
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    updateRecipe: async (
      _: any,
      {
        recipeId,
        input
      }: {
        recipeId: number;
        input: {
          name: string;
          description: string;
          ingredients: string[];
          categoryId: number;
        };
      },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const recipe = await getRepository(Recipe).findOne({
            where: { id: recipeId }
          });
          if (!recipe)
            throw new Error('The recipe ID provided does not exist.');
          await getConnection()
            .createQueryBuilder()
            .update(Recipe)
            .set({
              name: input.name,
              description: input.description,
              ingredients: input.ingredients,
              categoryId: input.categoryId
            })
            .where('id = :id', { id: recipeId })
            .execute();
          return await getRepository(Recipe).findOne(recipeId);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    deleteRecipe: async (
      _: any,
      { recipeId }: { recipeId: number },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const recipe = await getRepository(Recipe).findOne({
            where: { id: recipeId }
          });
          if (!recipe)
            throw new Error('The recipe ID provided does not exist.');
          const userId = recipe.userId;
          if (userId != id)
            throw new Error(`You don't have permission to delete this recipe`);
          await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Recipe)
            .where('id = :id', { id: recipeId })
            .execute();
        }
        return 'Recipe deleted successfully.';
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
