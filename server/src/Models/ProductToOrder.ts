import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product"
import { Order } from "./Order"

@Entity()
export class ProductToOrder {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	quantity: number

	@ManyToOne(() => Product, (product) => product.productToOrders)
	product: Product

	@ManyToOne(() => Order, (order) => order.productToOrders)
	order: Order
}
