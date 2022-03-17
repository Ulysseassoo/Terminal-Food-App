import { motion } from "framer-motion"
import React, { useContext } from "react"
import { useTable, usePagination } from "react-table"
import { toast } from "react-toastify"
import styled from "styled-components"
import { ProductsContext } from "../../Context/ProductsProvider"
import { getColumns, getFormattedData } from "../../Helpers/useTableData"
import { deleteIngredient, deleteProduct } from "../../Services/APIs"
import ProductImage from "../../assets/pizzaz.png"
import { IngredientsContext } from "../../Context/IngredientsProvider"

interface Props {
	contextData: (Order | Product | Ingredient)[]
	$product?: boolean
	$order?: boolean
	$ingredient?: boolean
}
interface CellProps {
	cellProps: any
}

const Table = ({ contextData, $product, $ingredient, $order }: Props) => {
	const { deleteProductFromContext, setShowForm, setSelectedProduct } = useContext(ProductsContext)
	const { deleteIngredientFromContext } = useContext(IngredientsContext)
	const urlImage = "http://localhost:3500/uploads/"

	const data = React.useMemo(
		() => getFormattedData(contextData),

		[contextData]
	)

	const columns = React.useMemo(
		() => getColumns(contextData),

		[contextData]
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows
		// @ts-ignore
	} = useTable({ columns, data })

	const deleteItem = async (id: number) => {
		const token = localStorage.getItem("token")
		const result = $product ? await deleteProduct(id, token!) : await deleteIngredient(id, token!)
		toast.success("Your item has been deleted")
		$product && deleteProductFromContext(id)
		!$product && deleteIngredientFromContext(id)
	}

	const editItem = async (id: number) => {
		setShowForm(true)
		setSelectedProduct(id)
	}

	return (
		<Container>
			<Tab {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup, headerIndex) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, columnIndex) => {
								if (column.id === "delete" && $order) return <Th {...column.getHeaderProps()}></Th>
								if (column.id === "edit" && $order) return <Th {...column.getHeaderProps()}></Th>
								return <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
							})}
						</Tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row)

						return (
							<Tr {...row.getRowProps()}>
								{row.cells.map((cell, cellIndex) => {
									if (cell.column.id === "delete" && $order === undefined) {
										return (
											<Td {...cell.getCellProps()} cellProps={cell.value}>
												<Button onClick={() => deleteItem(cell.value)}>Delete</Button>
											</Td>
										)
									}
									if (cell.column.id === "edit" && $order === undefined) {
										return (
											<Td {...cell.getCellProps()} cellProps={cell.value}>
												<EditButton onClick={() => editItem(cell.value)}>Edit</EditButton>
											</Td>
										)
									}
									if (cell.column.id === "delete" || (cell.column.id === "edit" && $order)) {
										return <Td {...cell.getCellProps()} cellProps={cell.value}></Td>
									}
									if (cell.column.id === "image") {
										return (
											<Td {...cell.getCellProps()} cellProps={cell.value}>
												<ImageContainer>
													<img src={cell.value !== "" ? `${urlImage}${cell.value}` : ProductImage} alt="product image" />
												</ImageContainer>
											</Td>
										)
									}
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
	overflow-y: scroll;
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

const Button = styled(motion.button)`
	padding: 0.2rem;
	background-color: ${({ theme }) => theme.colors.error};
	font-family: ${({ theme }) => theme.fonts.sub};
	font-size: ${({ theme }) => theme.size.s};
	color: ${({ theme }) => theme.colors.white};
	text-transform: uppercase;
	width: 100%;
	cursor: pointer;
	border: none;
	border-radius: 0.25rem;
`

const EditButton = styled(motion.button)`
	padding: 0.2rem;
	background-color: ${({ theme }) => theme.colors.success};
	font-family: ${({ theme }) => theme.fonts.sub};
	font-size: ${({ theme }) => theme.size.s};
	color: ${({ theme }) => theme.colors.white};
	text-transform: uppercase;
	width: 100%;
	cursor: pointer;
	border: none;
	border-radius: 0.25rem;
`

const ImageContainer = styled(motion.div)`
	padding: 0.2rem;
	width: 50px;
	height: 50px;
	& > img {
		height: 100%;
		width: 100%;
	}
`
export default Table
