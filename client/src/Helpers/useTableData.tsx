function instanceOfOrder(array: any): array is Order {
	return true
}

export const getColumns = (contextData: (Order | Product | Ingredient)[]) => {
	if (contextData.length > 0) {
		let columns: String[] = []
		const contextArray = Object.keys(contextData[0])
		if (contextArray.find((item) => item === "productToOrders")) {
			columns = ["id", "createdAt", "totalAmount", "terminal", "state"]
		} else if (contextArray.find((item) => item === "available")) {
			columns = ["id", "image", "name", "description", "calories", "price", "custom"]
		} else {
			columns = ["id", "name", "important"]
		}
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
						case "image":
							objectData[key] = item[key] !== null ? item[key].name : ""
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
