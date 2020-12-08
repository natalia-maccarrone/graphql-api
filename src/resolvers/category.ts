import { Recipe } from '../entity/Recipe';
import { Category } from '../entity/Category';
import { getRepository, getConnection } from 'typeorm';

module.exports = {
  Query: {
    getCategories: async (_: null, __: null, { id }: { id: number }) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const categoryRepository = await getRepository(Category);
          const categories = await categoryRepository.find();
          return categories;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    getOneCategory: async (
      _: null,
      { categoryId }: { categoryId: number },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const category = await getRepository(Category)
            .createQueryBuilder('category')
            .where('category.id = :id', { id: categoryId })
            .getOne();
          return category;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Mutation: {
    createCategory: async (
      _: null,
      { name }: { name: string },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const categoryRepository = await getRepository(Category);
          const category = await categoryRepository.findOne({
            where: { name }
          });
          if (category) throw new Error('This category was already created.');
          const newCategory = await categoryRepository
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values({ name })
            .execute();
          return await categoryRepository.findOne({
            where: { id: newCategory.identifiers[0].id }
          });
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    updateCategory: async (
      _: null,
      { categoryId, name }: { categoryId: number; name: string },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const category = await getRepository(Category).findOne({
            where: { id: categoryId }
          });
          if (!category)
            throw new Error('The category ID provided does not exist.');
          await getConnection()
            .createQueryBuilder()
            .update(Category)
            .set({ name })
            .where('id = :id', { id: categoryId })
            .execute();
          return await getRepository(Category).findOne(categoryId);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    deleteCategory: async (
      _: null,
      { categoryId }: { categoryId: number },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new Error('User is not authenticated.');
        } else {
          const category = await getRepository(Category).findOne({
            where: { id: categoryId }
          });
          const recipe = await getRepository(Recipe).findOne({
            where: { categoryId }
          });

          if (!category) throw new Error('Category provided does not Exist.');
          if (recipe)
            throw new Error('The category is being used by a recipe.');

          await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where('id = :id', { id: categoryId })
            .execute();
          return 'Category deleted successfully.';
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
