import { NextResponse } from "next/server";
import { connection } from "@/app/db";


export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: number }> }
) {
	try {
		const id = Number((await params).id);
		if (!id) {
			return NextResponse.json({
				success: false,
				message: "ID is required",
			});
		}
		await connection.query(
			"DELETE FROM links_data WHERE id = ?",
			[id]
		);

		return NextResponse.json({
			success: true,
			message: "Link deleted successfully",
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
