import { NextResponse } from "next/server";
import { connection } from "@/app/db";
import {ResultSetHeader} from "mysql2/promise";

interface GetDataRequestInterface {
	url: string;
	fullname: string;
}

export async function POST(request: Request) {
	try {
		const { url, fullname }: GetDataRequestInterface = await request.json();

		const getIconUrl = (url: string): string => {
			const protocol = url.split("/")[0];
			const hostname = new URL(url).hostname;
			const iconUrl = `${protocol}//${hostname}/favicon.ico`;
			return iconUrl;
		};

		if (!url || !fullname) {
			return NextResponse.json({
				success: false,
				message: "All fields are required",
			});
		}

		const icon_Url = getIconUrl(url);
		const shortname =
			fullname.length > 12 ? fullname.slice(0, 12) + "..." : fullname;
		const [result] = await connection.query<ResultSetHeader>(
			"INSERT INTO links_data (fullname, shortname, icon_url, url) VALUES (?, ?, ?, ?)",
			[fullname, shortname, icon_Url, url]
		);
		const data = {
			id: result.insertId,
			fullname,
			shortname,
			icon_Url,
			url,
		};

		return NextResponse.json({
			success: true,
			message: "Data added successfully",
			data,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
