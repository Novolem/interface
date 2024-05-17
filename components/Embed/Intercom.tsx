"use client";

import { useEffect } from "react";
import Intercom from "@intercom/messenger-js-sdk";

function IntercomComponent() {
	useEffect(() => {
		if (process.env.NEXT_PUBLIC_INTERCOM_APP_ID) {
			Intercom({ app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID });
		}
	}, []);

	return null;
}

export default IntercomComponent;
