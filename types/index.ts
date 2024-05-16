type BountyData = {
	id: string;
	date_created: string;
	name: string;
	status: "active" | "refund" | "claim";
	description: string;
	image_url: string;
	reward: number;
	readable_id: string;
	metadata: {
		tags: string[];
		issue_number: number;
		repo_owner_name: string;
		github_issue_url: string;
		github_path: string;
		date_issue_created: number;
		repo_owner_image_url: string;
	};
	contract_id: number;
};
export type { BountyData };
