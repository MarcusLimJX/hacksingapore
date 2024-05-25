import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "./avatar";

export const LandingHero = () => {
	return (
		<section className="hero min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
				Welcome to APEX
			</h1>
			<p className="text-xl mb-5 font-bold">Your Gateway To</p>
			<VanishText />
			<Avatar />
		</section>
	);
};

const ONE_SECOND = 1000;
const WAIT_TIME = ONE_SECOND * 3;

const VanishText = () => {
	const phrases = [
		"Better Investment",
		"Better Insurance",
		"Financial Security",
	];
	const [active, setActive] = useState(0);

	useEffect(() => {
		const intervalRef = setInterval(() => {
			setActive((pv) => (pv + 1) % phrases.length);
		}, WAIT_TIME);

		return () => clearInterval(intervalRef);
	}, [phrases]);

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={phrases[active]}
				initial={{ opacity: 0, scale: 1.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ ease: "easeInOut", duration: 0.5 }}
				className="whitespace-nowrap text-black-500 text-xl"
			>
				{phrases[active]}
			</motion.div>
		</AnimatePresence>
	);
};
