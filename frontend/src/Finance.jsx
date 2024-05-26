import React, { useState, useEffect } from "react";

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
		</>
	);
}
