import { User } from '../entity/User';
import { getRepository, getConnection } from 'typeorm';
const jwt = require('jsonwebtoken');

module.exports = {
  Mutation: {
    signUp: async (
      _: any,
      { input }: { input: { name: string; email: string; password: string } }
    ) => {
      try {
        // finds user by email. If email is already in use throws an error.
        const userRepository = await getRepository(User);
        const user = await userRepository.findOne({
          where: { email: input.email }
        });

        // input email checks
        if (user) throw new Error('Email is already in use.');
        const re = /\S+@\S+\.\S+/;
        if (!re.test(input.email)) throw new Error('Invalid email.');

        // input password checks
        if (!input.password) throw new Error('Missing password.');

        // if email is not in use and is valid, creates a new user.
        const newUser = await userRepository
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            name: input.name,
            email: input.email,
            password: input.password
          })
          .execute();

        // returns the new user
        return await userRepository.findOne({
          where: { id: newUser.identifiers[0].id }
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    login: async (
      _: any,
      { input }: { input: { email: string; password: string } }
    ) => {
      try {
        // checks if email exists
        const user = await getRepository(User).findOne({
          where: { email: input.email }
        });
        if (!user) throw new Error('User not found.');

        // checks if password is valid
        const isValidPassword = user.password === input.password;
        if (!isValidPassword) throw new Error('Invalid password.');

        // generates token
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1d' }
        );

        return { token };
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
