import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { State } from "./State"
import { Terminal } from "./Terminal"
import { User } from "./User"

@Entity()
export class Order extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "datetime", default: new Date() })
	createdAt: Date

	@Column({ type: "int" })
	totalAmount: number

	@ManyToOne(() => User, (user) => user.orders, {
		nullable: true
	})
	user: User

	@ManyToOne(() => Terminal, (terminal) => terminal.orders, {
		nullable: false
	})
	terminal: Terminal

	@OneToOne(() => State, {
		nullable: false
	})
	@JoinColumn()
	state: State
}
