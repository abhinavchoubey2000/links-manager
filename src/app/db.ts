import mysql from "mysql2/promise";

export const connection = mysql.createPool({
	host: String(process.env.SQL_HOST_NAME),
	port: Number(process.env.SQL_PORT_NUMBER),
	user: String(process.env.SQL_USER_NAME),
	password: String(process.env.SQL_PASSWORD),
	database: String(process.env.SQL_DATABASE_NAME),
});
