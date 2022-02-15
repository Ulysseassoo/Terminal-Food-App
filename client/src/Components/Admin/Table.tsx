import { motion } from "framer-motion"
import React, { useContext } from "react"
import { useTable } from "react-table"
import styled from "styled-components"
import { OrdersContext } from "../../Context/OrdersProvider"

const Table = () => {
	const { orders } = useContext(OrdersContext)
	const getColumns = (orders: Order[]) => {
		if (orders.length > 0) {
			const columns = Object.keys(orders[0])
			columns.splice(3, 1)
			const formattedColumns = columns.map((column) => {
				return { Header: column, accessor: column }
			})
			return formattedColumns
		}
		return []
	}

	const getFormattedData = (orders: Order[]) => {
		if (orders.length > 0 && orders !== undefined) {
			const filteredOrders = orders.slice(0, 10)
			const data = filteredOrders.map((order: { [key: string]: Order }) => {
				const objectData: { [key: string]: any } = {}
				const keys = Object.keys(order)
				keys.forEach((key) => {
					if (key !== "productToOrders") {
						switch (key) {
							case "terminal":
								objectData[key] = order[key].unique_id
								break
							case "state":
								objectData[key] = order[key].name
								break
							case "createdAt":
								objectData[key] = new Date(order[key].toString()).toDateString()
								break
							case "totalAmount":
								objectData[key] = `${order[key]} $`
								break
							default:
								objectData[key] = order[key]
								break
						}
					}
				})
				return objectData
			})
			return data
		}
		return []
	}

	const data = React.useMemo(
		() => getFormattedData(orders),

		[orders]
	)

	const columns = React.useMemo(
		() => getColumns(orders),

		[orders]
	)

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

	return (
		<Container>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render("Header")}</th>
							))}
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row)

						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</Container>
	)
}
const Container = styled(motion.div)`
	width: 100%;
	height: calc(100% - 50px);
	padding: 1rem 0;
`
export default Table
