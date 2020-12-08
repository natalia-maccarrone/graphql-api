import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Category } from './Category';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('simple-array')
  ingredients!: string[];

  @ManyToOne(() => User, (user: User) => user.recipes)
  user!: User;

  @ManyToOne(() => Category, (category: Category) => category.recipes)
  category!: Category;

  @Column()
  userId!: number;

  @Column()
  categoryId!: number;
}
