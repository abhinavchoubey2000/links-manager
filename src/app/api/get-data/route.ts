import { NextResponse } from "next/server";
import { connection } from "@/app/db";

export async function GET() {
	try {
		const res = await connection.query("SELECT * FROM links_data");
		return NextResponse.json({
			success: true,
			message: "Fetched data successfully",
			data: res[0],
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
