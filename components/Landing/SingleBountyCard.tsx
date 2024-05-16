"use client";
import { GitHubLogoIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import { BountyData } from "@/types";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import ConfirmationInput from "@/components/Bounty/ConfirmationInput";

const BountyTags: React.FC<{ tags: string[] }> = ({ tags }) => (
	<div className="flex flex-row pt-5 gap-4">
		{tags.map((tag, index) => (
			<div key={index} className="bg-slate-200 text-black px-2 py-1 rounded-md">
				{tag}
			</div>
		))}
	</div>
);

const BountyCard: React.FC<{ bounty: BountyData }> = ({ bounty }) => (
	<Card>
		<CardHeader className="flex flex-row justify-between items-center">
			<CardDescription className="p-1">{bounty.description.substring(0, 80)}...</CardDescription>
			<span className="text-black text-sm p-2 rounded-md bg-green-200">${bounty.reward}</span>
		</CardHeader>
		<CardContent>
			<img src={bounty.image_url} alt={bounty.name} className="w-full h-full object-cover" />
			<ConfirmationInput />
			<div className="flex justify-between items-end">
				<BountyTags tags={bounty.metadata.tags} />
				<div className="flex flex-row gap-2">
					<span className="text-xs text-gray-500">#{bounty.contract_id}</span>
					<ArrowTopRightIcon
						onClick={() => window.open(`/bounty/${bounty.metadata.github_path}`, "_blank")}
						className="h-6 w-6 cursor-pointer hover:bg-slate-200 rounded-md"
					/>
					<GitHubLogoIcon
						onClick={() => window.open(bounty.metadata.github_issue_url, "_blank")}
						className="h-6 w-6 cursor-pointer hover:bg-slate-200 rounded-md"
					/>
				</div>
			</div>
		</CardContent>
	</Card>
);

export { BountyCard, BountyTags };
