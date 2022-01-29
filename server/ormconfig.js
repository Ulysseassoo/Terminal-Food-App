module.exports = {
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "",
	database: "food-terminal",
	synchronize: true,
	logging: false,
	entities: ["src/Models/**/*.ts"],
	migrations: ["src/migration/**/*.ts"],
	subscribers: ["src/subscriber/**/*.ts"]
}
