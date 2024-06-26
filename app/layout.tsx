import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import IntercomComponent from "@/components/Embed/Intercom";

export const metadata = {
	title: {
		default: "Novolem | Earn anywhere, anytime",
		template: "%s | Novolem"
	},
	description: "Pay, earn & ship with Novolem",
	keywords: ["Novolem", "Crypto", "Gig work"],
	openGraph: {
		title: "Novolem | Earn anywhere, anytime",
		description: "Pay, earn & ship with Novolem",
		url: "https://novolem.com",
		type: "website",
		images: [
			{
				url: "https://res.cloudinary.com/dkpry5cup/image/upload/f_auto,q_auto/v1/novolem-assets/gf0uvia1dj19dbrxc1ma",
				width: 1920,
				height: 1080,
				alt: "Novolem | Earn anywhere, anytime"
			}
		]
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<TooltipProvider>{children}</TooltipProvider>
				<Toaster />
				<IntercomComponent />
			</body>
		</html>
	);
}
