import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ViewCard from "@/components/Bounty/ViewCard";

export default function Home() {
	return (
		<div>
			<div className="min-h-screen">
				<Header />
				<main className="flex flex-col items-center justify-between p-10 sm:p-12">
					<ViewCard />
				</main>
			</div>
			<Footer />
		</div>
	);
}
