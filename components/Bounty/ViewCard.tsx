"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BountyData } from "@/types";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { BountyTags } from "@/components/Landing/SingleBountyCard";
import ConfirmationInput from "@/components/Bounty/ConfirmationInput";

const IssueCard = ({ bounty }: { bounty: BountyData }) => {
	return (
		<Card>
			<CardContent className="flex relative">
				<img src={bounty.image_url} alt={bounty.name} className="w-1/2 h-full object-fill p-3" />
				<div className="w-1/2 px-8 flex flex-col justify-between">
					<div>
						<CardTitle>
							<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-4 my-4">{bounty.name.substring(0, 20)}...</h1>
						</CardTitle>
						<CardDescription>{bounty.description.substring(0, 80)}...</CardDescription>
						<div className="flex flex-row gap-4 mt-4">
							<ConfirmationInput />
						</div>
						<p className="text-xs italic text-gray-500 mt-1">
							Please make sure a payable address is available in the PR or its comments. You can learn more about this{" "}
							<a
								href="https://docs.novolem.com/quick-start#claiming-a-bounty"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 underline"
							>
								here
							</a>
							.
						</p>
					</div>
					<div className="flex justify-between items-end">
						<div className="">
							<BountyTags tags={bounty.metadata.tags} />
						</div>
						<span className="text-black text-xl p-2 rounded-md bg-green-200">${bounty.reward}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const ViewCard = () => {
	const pathname = usePathname();
	const [bounty, setBounty] = useState<BountyData | null>(null);

	const getIssue = async () => {
		let loc_path = pathname.replace("/bounty/", "").replaceAll("/", "").toLowerCase();
		loc_path = loc_path.split("?")[0].replace("%20", " ");
		const resp = await fetch(`/api/get-bounty?readable_id=${loc_path}`);
		const data = await resp.json();
		setBounty(data[0]);
	};

	useEffect(() => {
		getIssue();
	}, [pathname]);

	return <div>{bounty && <IssueCard bounty={bounty} />}</div>;
};

export default ViewCard;
