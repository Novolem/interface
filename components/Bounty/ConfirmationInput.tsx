import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ConfirmationInput = () => {
	const [confirmationUrl, setConfirmationUrl] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const { toast } = useToast();

	async function handleConfirmation() {
		setIsLoading(true);

		try {
			// URL has to be a PR or a comment on a PR
			if (!confirmationUrl || !confirmationUrl.includes("https://github.com/")) {
				toast({
					title: "Invalid URL",
					description: "The URL you entered is not a valid PR URL."
				});
				setIsLoading(false);
				return;
			}

			const resp = await fetch("/api/confirm-bounty", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ url: confirmationUrl })
			});

			if (resp.status === 200) {
				toast({
					title: "Bounty confirmation submitted",
					description: "Your bounty confirmation has been submitted. You will receive your reward post confirmation."
				});
				setIsSuccess(true);
			} else {
				toast({
					title: "Error",
					description: "There was an error confirming your bounty."
				});
			}
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	}
	return (
		<div className="flex flex-row gap-4 mt-4 w-full">
			<Input
				type="text"
				placeholder="Claim the bounty by entering the URL of the closed PR"
				value={confirmationUrl}
				onChange={(e) => setConfirmationUrl(e.target.value)}
			/>
			<Button onClick={() => handleConfirmation()} disabled={isLoading || isSuccess}>
				{isLoading ? "Submitting..." : isSuccess ? "Submitted" : "Claim"}
			</Button>
		</div>
	);
};

export default ConfirmationInput;
