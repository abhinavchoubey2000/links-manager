import { NextResponse } from "next/server";
import { connection } from "@/app/db";

interface UpdateDataRequestInterface {
	id: number;
	fullname: string;
	url: string;
}

export async function PUT(request: Request) {
	try {
		const { id, fullname, url }: UpdateDataRequestInterface =
			await request.json();
		console.log({ id, fullname, url });

		if (!id || !fullname || !url) {
			return NextResponse.json({
				success: false,
				message: "Link ID and Fullname are required",
			});
		}
		const shortname =
			fullname.length > 12 ? fullname.slice(0, 12) + "..." : fullname;
		await connection.query(
			"UPDATE links_data SET fullname = ?, shortname = ?, url = ? WHERE id = ?",
			[fullname, shortname, url, id]
		);

		return NextResponse.json({
			success: true,
			message: "Name updated successfully",
			data: { fullname, id, url, shortname },
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
