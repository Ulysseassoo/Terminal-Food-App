import { BaseEntity, Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./Order"

@Entity()
export class Terminal extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	@Generated("uuid")
	unique_id: string

	@OneToMany(() => Order, (order) => order.terminal)
	orders: Order[]
}
