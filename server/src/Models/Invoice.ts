import { BaseEntity, Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./Order"

@Entity()
export class Invoice extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "datetime" })
	createdAt: Date

	@OneToOne(() => Order)
	@JoinColumn()
	order: Order
}
