import React, { useState } from "react";
import {
	FaHeadset,
	FaPaperPlane,
	FaArrowLeft,
	FaVolumeUp,
} from "react-icons/fa";
import { motion } from "framer-motion";

export const Avatar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{ text: "你好吗?", sender: "agent" },
	]);

	const toggleOverlay = () => {
		setIsOpen(!isOpen);
	};

	const sendMessage = (e) => {
		if (e.key === "Enter" && e.target.value.trim() !== "") {
			setMessages([
				...messages,
				{ text: e.target.value, sender: "user" },
			]);
			e.target.value = "";
		}
	};

	const speakMessage = (message) => {
		const speech = new SpeechSynthesisUtterance(message);
		speech.lang = "zh-CN";
		window.speechSynthesis.speak(speech);
	};

	return (
		<div className="fixed bottom-4 right-4 rounded-full p-4 shadow-md bg-violet-600">
			<div className="p-2" onClick={toggleOverlay}>
				<FaHeadset size={32} color="white" />
			</div>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed inset-0 bg-white z-50"
				>
					<div className="my-4 p-4">
						<FaArrowLeft
							size={32}
							onClick={toggleOverlay}
							className="cursor-pointer"
						/>
					</div>
					<div
						className="p-4 overflow-y-auto flex flex-col space-y-4"
						style={{ height: "calc(100% - 104px)" }}
					>
						{messages.map((message, index) => (
							<div
								key={index}
								className={`flex ${
									message.sender === "agent"
										? "justify-start"
										: "justify-end"
								}`}
							>
								<div
									className={`p-3 rounded-lg max-w-xs break-words ${
										message.sender === "agent"
											? "bg-gray-200 rounded-bl-none text-left"
											: "bg-blue-500 text-white rounded-br-none text-right"
									}`}
								>
									{message.text}
									<FaVolumeUp
										className="inline ml-2"
										onClick={() =>
											speakMessage(message.text)
										}
									/>
								</div>
							</div>
						))}
					</div>
					<div className="fixed bottom-0 w-full p-4 flex items-center bg-white">
						<input
							type="text"
							placeholder="Type a message..."
							className="border rounded p-2 flex-grow"
							onKeyDown={sendMessage}
						/>
						<FaPaperPlane className="ml-4 cursor-pointer" />
					</div>
				</motion.div>
			)}
		</div>
	);
};
