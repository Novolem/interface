import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ethers } from "ethers";
import erc20Abi from "@/abi/erc-20.json";
import protocolAbi from "@/abi/protocol-v0.json";
import { v4 as uuidV4 } from "uuid";
import { ZKEVM_USDC_ADDRESS, ZKEVM_USDC_DECIMALS, ZKEVM_PROTOCOL_ADDRESS, ZKEVM_MANAGER_ADDRESS } from "@/lib/constants";
import debounce from "lodash.debounce";
import { BountyData } from "@/types";

export default function CreateBountyCard() {
	const [open, setOpen] = useState(false);
	const [githubUrl, setGithubUrl] = useState("");
	const [reward, setReward] = useState("");
	const [loading, setLoading] = useState(false);
	const [hasEnoughBalance, setHasEnoughBalance] = useState(false);
	const [githubURLIsValid, setGithubURLIsValid] = useState(false);

	const handleOpenModal = async () => {
		// Check if the user has connected their wallet
		//@ts-ignore
		if (window.ethereum) {
			//@ts-ignore
			const provider = new ethers.BrowserProvider(window.ethereum);
			await provider.getSigner();
			setOpen(true);
		}
	};

	const checkBalance = async (reward: string) => {
		//@ts-ignore
		if (window.ethereum) {
			//@ts-ignore
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const tokenContract = new ethers.Contract(ZKEVM_USDC_ADDRESS, erc20Abi, signer);
			const balance = await tokenContract.balanceOf(await signer.getAddress());
			const formattedReward = ethers.parseUnits(reward, ZKEVM_USDC_DECIMALS);
			setHasEnoughBalance(balance > formattedReward);
		}
	};
	const debouncedCheckBalance = debounce((newReward) => checkBalance(newReward), 500);

	function updateReward(e: React.ChangeEvent<HTMLInputElement>) {
		const newReward = e.target.value;
		setReward(newReward);
		debouncedCheckBalance(newReward);
	}

	function validateGithubURL() {
		if (githubUrl.includes("github.com") && githubUrl.includes("issues")) {
			setGithubURLIsValid(true);
		} else {
			setGithubURLIsValid(false);
		}
	}
	useEffect(() => {
		validateGithubURL();
	}, [githubUrl]);

	const createBounty = async () => {
		setLoading(true);
		try {
			//@ts-ignore
			if (window.ethereum) {
				//@ts-ignore
				await window.ethereum.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: "0x44d" }] // Chain ID 1101 in hexadecimal
				});
				//@ts-ignore
				const provider = new ethers.BrowserProvider(window.ethereum);
				const signer = await provider.getSigner();
				const protocolContract = new ethers.Contract(ZKEVM_PROTOCOL_ADDRESS, protocolAbi, signer);
				const tokenContract = new ethers.Contract(ZKEVM_USDC_ADDRESS, erc20Abi, signer);
				const formattedReward = ethers.parseUnits(reward, ZKEVM_USDC_DECIMALS);
				const signerAddress = await signer.getAddress();
				// Check allowance
				const allowance = await tokenContract.allowance(signerAddress, ZKEVM_PROTOCOL_ADDRESS);
				if (allowance < formattedReward) {
					// Ask for 10x
					const tx = await tokenContract.approve(ZKEVM_PROTOCOL_ADDRESS, ethers.parseUnits(String(Number(reward) * 10), ZKEVM_USDC_DECIMALS));
					await tx.wait();
				}

				const id = uuidV4();
				const tx = await protocolContract.createBounty(
					ZKEVM_MANAGER_ADDRESS,
					`https://novolem.com/api/get-bounty?id=${id}`,
					formattedReward,
					ethers.parseUnits("0", ZKEVM_USDC_DECIMALS)
				);
				await tx.wait();
				const contract_id = Number(await protocolContract.getBountyCount()) - 1;
				const response = await fetch("/api/create-bounty", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ id, reward: Number(reward), github_url: githubUrl, creator: signerAddress, contract_id })
				});
				const data = await response.json();
				if (data?.data) {
					const newBounty: BountyData = data.data;
					window.location.href = `/bounty/${newBounty.metadata.github_path}`;
				}
			}
		} catch (error) {
			console.error("Error creating bounty:", error);
		}
		setLoading(false);
	};

	return (
		<>
			<Button onClick={handleOpenModal}>Create Bounty</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create Bounty</DialogTitle>
						<DialogDescription>Enter the details to create a new bounty.</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="githubUrl">Github Issue URL</Label>
							<Input id="githubUrl" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="reward">Reward Amount</Label>
							<Input id="reward" value={reward} onChange={updateReward} type="number" />
						</div>
						<Button onClick={createBounty} disabled={!hasEnoughBalance || loading || !githubURLIsValid}>
							{loading ? "Creating..." : "Confirm"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
