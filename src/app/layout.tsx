import type { Metadata } from "next";
import "dotenv/config";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/soner";

export const metadata: Metadata = {
	title: "Links Manager",
	description: "Manage your links with ease. Links Manager is a free and open-source link management tool.",
	
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster/>
				</ThemeProvider>
			</body>
		</html>
	);
}
