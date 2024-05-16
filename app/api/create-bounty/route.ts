import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
	const supabase = createClient(cookies());

	// We will get the folling items in the body of the request
	/*
		id
		github_url
		reward
		creator
	*/

	const { id, github_url, reward, creator, contract_id } = await req.json();

	const tailend = github_url.replaceAll("https://github.com/", "");
	const readable_id = tailend.replaceAll("/", "").replaceAll(" ", "").toLowerCase();
	const image_url = `https://opengraph.githubassets.com/${Math.random().toString(36).substring(2, 15)}/${tailend}`;
	const issueNumber = tailend.split("/")[tailend.split("/").length - 1];

	const issueDataURL = "https://api.github.com/repos/" + tailend;
	const issueData = await fetch(issueDataURL).then((res) => res.json());
	const name = issueData.title;
	const description = issueData.body;
	const tags = issueData.labels.map((label: { name: string }) => label.name);
	const data = {
		id,
		name,
		description,
		status: "active",
		reward: Number(reward),
		readable_id: readable_id,
		image_url: image_url,
		metadata: {
			tags,
			github_path: tailend,
			issue_number: issueNumber,
			repo_owner_name: tailend.split("/")[0],
			github_issue_url: github_url,
			date_issue_created: Math.floor(Date.now() / 1000),
			repo_owner_image_url: "https://github.com/" + tailend.split("/")[0] + ".png"
		},
		creator: creator.toLowerCase(),
		worker: null,
		contract_id
	};

	await supabase.from("bounty").insert(data);
	return NextResponse.json({ success: true, data });
};
