import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./Order"

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	role: string

	@Column()
	email: string

	@Column()
	password: string

	@OneToMany(() => Order, (order) => order.user)
	orders: Order[]
}
