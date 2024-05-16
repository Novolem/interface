import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({ params }: { params: { issue: string[] } }): Promise<Metadata> {
	const supabase = createClient(cookies());
	const readableId = params.issue.join("/").toLowerCase().replace("/bounty/", "").replaceAll("/", "").toLowerCase();
	const { data: bounty } = await supabase.from("bounty").select("*").eq("readable_id", readableId).single();
	const title = `Earn $${bounty?.reward} by completing this bounty | Novolem`;
	const description = `Earn instantly when you fix issues on GitHub with Novolem. Complete ${bounty?.name.substring(0, 20)}... and earn $${bounty?.reward}`;
	return {
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			images: [
				{
					url: bounty?.image_url,
					width: 1200,
					height: 630,
					alt: title
				}
			]
		}
	};
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}
