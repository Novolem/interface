"use client";

import React from "react";
import Link from "next/link";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

const Header = () => {
	return (
		<header className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
			<div className="w-full mx-auto px-6 md:px-12">
				<div className="flex justify-between items-center py-4 sm:py-6 md:justify-start md:space-x-10">
					<div className="flex justify-start md:w-0 md:flex-1">
						<a href="/">
							<span className="sr-only">Novolem</span>
							<img className="h-8 w-auto sm:h-10" src="/novolem.png" alt="" />
						</a>
					</div>
					<nav className="hidden md:flex items-center space-x-6 sm:space-x-10 [&>:not(a)]:hidden sm:[&>:not(a)]:block">
						<Link href="/docs" className="text-base font-medium text-slate-500 hover:text-black">
							Docs
						</Link>
						<DiscordLogoIcon
							className="text-base font-medium text-slate-500 hover:text-black cursor-pointer"
							style={{ height: "24px", width: "24px" }}
							onClick={() => window.open("/discord", "_blank")}
						/>
						<GitHubLogoIcon
							className="text-base font-medium text-slate-500 hover:text-black cursor-pointer"
							style={{ height: "24px", width: "24px" }}
							onClick={() => window.open("https://github.com/novolem", "_blank")}
						/>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
