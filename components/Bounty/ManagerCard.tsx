"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ethers } from "ethers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import protocolAbi from "@/abi/protocol-v0.json";
import { ZKEVM_USDC_DECIMALS, ZKEVM_PROTOCOL_ADDRESS } from "@/lib/constants";

export default function ManagerCard() {
	const [contractId, setContractId] = useState<number>(0);
	const [worker, setWorker] = useState<string>("");

	const [contractBounty, setContractBounty] = useState<any>(null);
	const [dbBounty, setDbBounty] = useState<any>(null);

	async function handleClaim() {
		//@ts-ignore
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(ZKEVM_PROTOCOL_ADDRESS, protocolAbi, signer);
		const tx = await contract.claimBounty(contractId, worker);
		await tx.wait();
		await fetch("/api/claim-bounty", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ contractId, worker })
		}).then((res) => res.json());
	}

	async function handleRefund() {
		//@ts-ignore
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(ZKEVM_PROTOCOL_ADDRESS, protocolAbi, signer);
		const tx = await contract.refundBounty(contractId);
		await tx.wait();
		await fetch("/api/refund-bounty", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ contractId })
		}).then((res) => res.json());
	}

	async function handleGetBounty() {
		//@ts-ignore
		const provider = new ethers.BrowserProvider(window.ethereum);
		const contract = new ethers.Contract(ZKEVM_PROTOCOL_ADDRESS, protocolAbi, provider);
		const bounty = await contract.getBounty(contractId);

		const realBounty = {
			id: Number(bounty.id),
			creator: bounty.creator,
			manager: bounty.manager,
			metadataUrl: bounty.metadataUrl,
			reward: ethers.formatUnits(bounty.reward, ZKEVM_USDC_DECIMALS),
			commission: ethers.formatUnits(bounty.commission, ZKEVM_USDC_DECIMALS),
			emission: ethers.formatUnits(bounty.emission, 18),
			winner: bounty.winner,
			status: bounty.status === 0 ? "active" : bounty.status === 1 ? "claim" : "refund"
		};
		setContractBounty(realBounty);
		const bountyID = bounty.metadataUrl.split("?id=")[1];

		// Get DB bounty based on metadata
		const response = await fetch(`/api/get-bounty?id=${bountyID}`).then((res) => res.json());
		setDbBounty(response);
	}

	return (
		<div>
			<Card>
				<CardContent>
					<CardHeader>
						<CardTitle>Manager Operations</CardTitle>
					</CardHeader>
					<CardDescription>Manage bounty claims and refunds from this panel.</CardDescription>
					<div className="flex flex-col gap-4">
						<Input
							type="number"
							placeholder="Enter Contract ID"
							value={contractId}
							//@ts-ignore
							onChange={(e) => setContractId(e.target.value)}
						/>
						<Input type="text" placeholder="Enter Worker Address" value={worker} onChange={(e) => setWorker(e.target.value)} />
						<Button onClick={handleGetBounty}>Get Bounty</Button>
						<Button onClick={handleClaim}>Claim Bounty</Button>
						<Button onClick={handleRefund}>Refund Bounty</Button>
					</div>
					<div className="flex flex-col gap-4">
						<div>
							<span>Contract Bounty</span>
							<pre className="whitespace-pre-wrap overflow-auto">{JSON.stringify(contractBounty, null, 2)}</pre>
						</div>
						<div>
							<span>DB Bounty</span>
							<pre className="whitespace-pre-wrap overflow-auto">{JSON.stringify(dbBounty, null, 2)}</pre>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
