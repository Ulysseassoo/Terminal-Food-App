import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { State } from "./State"
import { Terminal } from "./Terminal"
import { User } from "./User"

@Entity()
export class Order extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "datetime" })
	createdAt: Date

	@Column({ type: "int" })
	totalAmount: number

	@ManyToOne(() => User, (user) => user.orders)
	user: User

	@ManyToOne(() => Terminal, (terminal) => terminal.orders)
	terminal: Terminal

	@OneToOne(() => State)
	@JoinColumn()
	state: State
}
