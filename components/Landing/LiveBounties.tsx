import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { BountyCard } from "@/components/Landing/SingleBountyCard";

export default async function LiveBounties() {
	const supabase = createClient(cookies());
	async function fetchBounties() {
		const { data: bounties, error } = await supabase.from("bounty").select("*").eq("status", "active");
		if (error) throw error;
		return bounties;
	}
	const bounties = await fetchBounties();

	return (
		<div className="w-full  z-10 mt-12 ">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Live Bounties</h1>
			<div className="grid grid-cols-3 gap-8 py-10 items-center justify-center antialiased w-full">
				{bounties?.map((bounty, index) => <BountyCard key={index} bounty={bounty} />)}
			</div>
		</div>
	);
}
