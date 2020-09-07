import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import bcrypt from "bcryptjs";
import { Recipe } from "../recipe/recipe.entity";
import { Category } from "../category/category.entity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field((type) => [Recipe])
  @OneToMany((type) => Recipe, (recipe) => recipe.user, { eager: true })
  recipes: Recipe[];

  @Field((type) => [Category])
  @OneToMany((type) => Category, (category) => category.user, {
    eager: true,
  })
  categories: Category[];

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
