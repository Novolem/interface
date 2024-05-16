import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
	// Body will have the following parameters
	/*
		url: string | null = null
	*/
	const body = await req.json();
	await fetch(process.env.INTERNAL_API_HOST + "/api/send-notification", {
		method: "POST",
		body: JSON.stringify(body)
	});
	return NextResponse.json(body);
};
