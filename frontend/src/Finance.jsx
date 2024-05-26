import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Finance() {
	const API_KEY = import.meta.env.VITE_JIGSAWSTACK_API_KEY;
	const [tableData, setTableData] = useState({});
	const [selectorToText, setSelectorToText] = useState({});

	const getData = async () => {
		const endpoint = "https://api.jigsawstack.com/v1/ai/scrape";
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": API_KEY,
			},
			body: JSON.stringify({
				url: "https://help.fairprice.com.sg/hc/en-us/articles/360034585731-Are-Pioneer-Generation-Merdeka-Generation-Seniors-CHAS-Blue-1-GST-discount-applicable-on-my-Scan-Go-purchases",
				element_prompts: [
					"Day of the week",
					"Initiative",
					"Benefits",
					"Verification needed",
				],
			}),
		};
		const result = await fetch(endpoint, options);
		const data = await result.json();
		return data;
	};

	useEffect(() => {
		getData().then((data) => {
			setTableData(data.selectors);

			// Create a mapping from selector to text
			const newSelectorToText = {};
			data.data.forEach((item) => {
				newSelectorToText[item.selector] = item.results[0].text;
			});
			setSelectorToText(newSelectorToText);
		});
	}, []);

	// Get the keys from the object to use as headers
	const tableHeaders = Object.keys(tableData);

	// Get the maximum length of the arrays in the object to determine the number of rows
	const numRows = Math.max(
		...tableHeaders.map((header) => tableData[header].length)
	);

	return (
		<>
			<h1 className="text-2xl font-bold text-blue-500">
				Discounts For You
			</h1>
			{Object.keys(tableData).length === 0 ? (
				<div className="flex justify-center">
					<img
						src="https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952fys6frty3nml3q32gthdzyr5ly0dgvyrcnfirvxx&ep=v1_gifs_search&rid=200w.gif&ct=g"
						alt="Loading..."
					/>
				</div>
			) : (
				<table className="table-auto w-full">
					<thead>
						<tr>
							{tableHeaders.map((header, index) => (
								<th
									key={index}
									className="px-2 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
								>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: numRows }).map((_, rowIndex) => (
							<tr
								key={rowIndex}
								className="text-xs leading-4 text-gray-900"
							>
								{tableHeaders.map((header, columnIndex) => (
									<td
										key={columnIndex}
										className="px-4 py-4 whitespace-no-wrap border-b border-gray-200"
									>
										{
											selectorToText[
											tableData[header][rowIndex]
											]
										}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}
			<div className="flex justify-center">
				<Link to="/dbs-planner">
					<img src="data:image/png;base64,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" alt="navplanner logo" className="shadow-md hover:shadow-xl" />
				</Link>
			</div>
		</>
	);
}
