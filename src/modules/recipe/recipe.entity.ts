import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field } from "type-graphql";

export class RecipeEntity extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  ingredients: string;

  @Field()
  @Column()
  category;
}
