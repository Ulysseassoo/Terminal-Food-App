import { motion } from "framer-motion"
import React, { useContext } from "react"
import { useTable } from "react-table"
import styled, { css } from "styled-components"
import { OrdersContext } from "../../Context/OrdersProvider"

interface CellProps {
	cellProps: any
}
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
			<Tab {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
							))}
						</Tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row)

						return (
							<Tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<Td {...cell.getCellProps()} cellProps={cell.value}>
											{cell.render("Cell")}
										</Td>
									)
								})}
							</Tr>
						)
					})}
				</tbody>
			</Tab>
		</Container>
	)
}
const Container = styled(motion.div)`
	width: 100%;
	height: calc(100% - 50px);
	padding: 1rem 0;
`

const Tab = styled(motion.table)`
	width: 100%;
	padding: 1rem;
	box-shadow: ${({ theme }) => theme.shadow.box};
	border-radius: 0.5rem;
	height: 100%;
	border-collapse: collapse;
`

const Th = styled(motion.th)`
	padding: 0.5rem;
	font-family: ${({ theme }) => theme.fonts.sub};
	font-size: ${({ theme }) => theme.size.s};
	text-transform: capitalize;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.text};
`

const Tr = styled(motion.tr)`
	padding: 0.5rem;
	font-family: ${({ theme }) => theme.fonts.sub};
	font-size: ${({ theme }) => theme.size.s};
	text-transform: capitalize;
	font-weight: initial;
	text-align: center;
	color: ${({ theme }) => theme.colors.text};
	opacity: 0.75;
	border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundShadow};
	& td:last-child {
		padding: 0.15rem;
		display: table-cell;
	}
	&:last-child {
		border: none;
		& td:last-child {
			border-radius: 0 0 0.5rem 0;
		}
	}
`

const Td = styled(motion.td)<CellProps>`
	background-color: ${({ cellProps, theme }) => (cellProps === "Done" ? theme.colors.success : cellProps === "Not done" ? theme.colors.error : "")};
	color: ${({ cellProps, theme }) => (cellProps === "Done" ? theme.colors.white : cellProps === "Not done" ? theme.colors.white : "")};
`
export default Table
