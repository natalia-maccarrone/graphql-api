import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Recipe, (recipe: Recipe) => recipe.user)
  recipes!: Recipe[];
}
