import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { Recipe } from "../recipe/recipe.entity";
import { User } from "../user/user.entity";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field((type) => [Recipe])
  @OneToMany((type) => Recipe, (recipe) => recipe.category, {
    eager: true,
  })
  recipes: Recipe[];

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.categories, {
    eager: false,
  })
  user: User;

  @Column()
  userId: number;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
