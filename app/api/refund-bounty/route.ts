import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
	const supabase = createClient(cookies());

	// We will get the folling items in the body of the request
	/*
		id
	*/
	const { contractId } = await req.json();
	await supabase
		.from("bounty")
		.update({
			status: "refund"
		})
		.eq("contract_id", contractId);
	return NextResponse.json({ success: true });
};
