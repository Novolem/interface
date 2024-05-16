import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const GET = async (req: NextRequest) => {
	const supabase = createClient(cookies());

	// There can be the following parameters
	/*
		github_path: string | null = null
		id: string | null = null
		start: number | null = 0
		end: number | null = 100
	*/
	// If both are null, return all bounties
	// If github_path is not null, return all bounties with that github_path
	// If id is not null, return the bounty with that id
	// If start and end are not null, return all bounties sorted by latest date_created

	const githubPath = req.nextUrl.searchParams.get("github_path");
	const id = req.nextUrl.searchParams.get("id");
	const start_ = req.nextUrl.searchParams.get("start") ?? "0";
	const end_ = req.nextUrl.searchParams.get("end") ?? "100";

	if (githubPath) {
		const cleanedPath = githubPath.replaceAll(" ", "").replaceAll("/", "").toLowerCase();
		const { data, error } = await supabase.from("bounty").select("*").eq("readable_id", cleanedPath);

		// If there is an error, return the error
		if (error) {
			return NextResponse.json(error);
		}
		return NextResponse.json(data[0]);
	}
	if (id) {
		const { data, error } = await supabase.from("bounty").select("*").eq("id", id);
		if (error) {
			return NextResponse.json(error);
		}
		return NextResponse.json(data[0]);
	}

	const start = parseInt(start_);
	const end = parseInt(end_);

	const { data, error } = await supabase.from("bounty").select("*").order("date_created", { ascending: false }).range(start, end);

	if (error) {
		return NextResponse.json(error);
	}
	return NextResponse.json(data);
};
