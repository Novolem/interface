"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/BentoGrid";
import { ClipboardCopyIcon, FilePlusIcon, StrikethroughIcon, TableIcon } from "@radix-ui/react-icons";

export function DocsLandingBento() {
	return (
		<div
			onClick={() => {
				window.location.href = "https://docs.novolem.com";
			}}
		>
			<BentoGrid className="mx-auto md:auto-rows-[20rem]">
				{items.map((item, i) => (
					<BentoGridItem key={i} title={item.title} description={item.description} header={item.header} className={item.className} icon={item.icon} />
				))}
			</BentoGrid>
		</div>
	);
}
const Skeleton1 = () => <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-r from-pink-500 to-yellow-500 cursor-pointer"></div>;
const Skeleton2 = () => <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-r from-amber-200 to-yellow-400 cursor-pointer"></div>;
const Skeleton3 = () => <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-r from-rose-400 to-red-500 cursor-pointer"></div>;
const Skeleton4 = () => <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 cursor-pointer"></div>;
const items = [
	{
		title: "Instant Task Resolution",
		description: "Enabling modules to autonomously approve or reject tasks, ensuring swift bounty resolutions.",
		header: <Skeleton1 />,
		className: "md:col-span-2 bg-slate-100 cursor-pointer",
		icon: <ClipboardCopyIcon className="h-4 w-4 text-neutral-500" />,
		url: "https://docs.novolem.com"
	},
	{
		title: "Competitive Task Marketplace",
		description: "Empowering creators to distribute tasks across various modules, fostering competition and efficiency.",
		header: <Skeleton2 />,
		className: "md:col-span-1 bg-slate-50 cursor-pointer",
		icon: <FilePlusIcon className="h-4 w-4 text-neutral-500" />,
		url: "https://docs.novolem.com"
	},
	{
		title: "Agent-Driven Bounties",
		description: "Designed for autonomous agents to create, complete, and earn through an API-first approach.",
		header: <Skeleton3 />,
		className: "md:col-span-1 bg-slate-100 cursor-pointer",
		icon: <StrikethroughIcon className="h-4 w-4 text-neutral-500" />,
		url: "https://docs.novolem.com"
	},
	{
		title: "Investable Bounty Ecosystem",
		description: "Invest in bounty hunters and modules, empowering their capabilities and earning dividends.",
		header: <Skeleton4 />,
		className: "md:col-span-2 bg-slate-50 cursor-pointer",
		icon: <TableIcon className="h-4 w-4 text-neutral-500" />,
		url: "https://docs.novolem.com"
	}
];
