import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Ingredient } from "./Ingredient"

@Entity()
export class Stock extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "int" })
	quantity: number

	@OneToOne(() => Ingredient, (ingredient) => ingredient.stock, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
	@JoinColumn()
	ingredient: Ingredient
}
