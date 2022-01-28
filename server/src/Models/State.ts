import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class State extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string
}
