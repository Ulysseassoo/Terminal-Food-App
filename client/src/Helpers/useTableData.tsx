function instanceOfOrder(array: any): array is Order {
	return true
}

export const getColumns = (contextData: (Order | Product | Ingredient)[]) => {
	if (contextData.length > 0) {
		const columns = Object.keys(contextData[contextData.length - 2])
		columns.find((item) => item === "productToOrders") && columns.splice(3, 1)
		columns.find((item) => item === "available") && columns.splice(6, 4)
		columns.find((item) => item === "stock") && columns.splice(3, 1)
		const formattedColumns = columns
			.sort((a, b) => {
				if (a === b) {
					return 1
				}

				if (a !== b) {
					return -1
				}

				return 0
			})
			.map((column) => {
				return { Header: column, accessor: column }
			})
		console.log(columns)
		formattedColumns.push({ Header: "", accessor: "delete" })
		formattedColumns.push({ Header: "", accessor: "edit" })
		return formattedColumns
	}
	return []
}

export const getFormattedData = (contextData: (Order | Product | Ingredient)[]) => {
	if (contextData.length > 0 && contextData !== undefined) {
		const filteredOrders = contextData[0]?.productToOrders
			? contextData.slice(0, 10)
			: contextData.sort((a, b) => {
					a.id! > b.id!
					return 0
			  })
		const data = filteredOrders.map((item: { [key: string]: Order | Product | Ingredient }) => {
			const objectData: { [key: string]: any } = {}
			const keys = Object.keys(item)
			keys.forEach((key) => {
				if (key !== "productToOrders") {
					switch (key) {
						case "terminal":
							objectData[key] = item[key].unique_id
							break
						case "state":
							objectData[key] = item[key].name
							break
						case "important":
							objectData[key] = item[key] ? "Yes" : "No"
							break
						case "available":
							objectData[key] = item[key] ? "Yes" : "No"
							break
						case "custom":
							objectData[key] = item[key] ? "Yes" : "No"
							break
						case "createdAt":
							objectData[key] = new Date(item[key].toString()).toDateString()
							break
						case "totalAmount":
							objectData[key] = `${item[key]} $`
							break
						case "price":
							objectData[key] = `${item[key]} $`
							break
						default:
							objectData[key] = item[key]
							break
					}
				}
			})
			objectData.delete = item.id
			objectData.edit = item.id
			return objectData
		})
		return data
	}
	return []
}
