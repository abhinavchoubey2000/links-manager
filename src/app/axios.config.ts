import axios from "axios";

export const axiosConfig = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
