import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Recipe, (recipe: Recipe) => recipe.category)
  recipes!: Recipe[];
}
