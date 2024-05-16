import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
	const supabase = createClient(cookies());

	// Extract the bounty ID and worker from the request body
	const { id, worker } = await req.json();

	// Update the bounty status to "claim" and set the worker in the database
	await supabase
		.from("bounty")
		.update({
			status: "claim",
			worker: worker.toLowerCase()
		})
		.eq("id", id);

	// Return a success response
	return NextResponse.json({ success: true });
};
