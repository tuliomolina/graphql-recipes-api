import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { User } from "../user/user.entity";
import { Category } from "../category/category.entity";

@ObjectType({
  description:
    "Recipe object type. It has a many to one relation with both User and Category types",
})
@Entity()
export class Recipe extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  ingredients: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.recipes, { eager: false })
  user: User;

  @Column()
  userId: number;

  @Field((type) => Category)
  @ManyToOne((type) => Category, (category) => category.recipes, {
    eager: false,
    onDelete: "CASCADE",
  })
  category: Category;

  @Column()
  categoryId: number;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
