import mysql from "mysql2/promise";

export const connection = mysql.createPool({
	host: "links-manager-links-manager.b.aivencloud.com",
	user: "avnadmin",
	password: "AVNS_2HrROsbae8jzr2Jso0f",
	database: "defaultdb",
	port: 24604,
});
console.log({
	host: String(process.env.SQL_HOSTNAME),
	user: String(process.env.SQL_USERNAME),
	password: String(process.env.SQL_PASSWORD),
	database: String(process.env.SQL_DATABASENAME),
	port: Number(process.env.SQL_PORT),
});
