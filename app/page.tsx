import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Landing/Hero";
import Footer from "@/components/Footer";
import LiveBounties from "@/components/Landing/LiveBounties";

export default function Home() {
	return (
		<div>
			<div className="min-h-screen">
				<Header />
				<main className="flex flex-col items-center justify-between p-10 sm:p-24">
					<Hero />
					<LiveBounties />
				</main>
			</div>
			<Footer />
		</div>
	);
}
