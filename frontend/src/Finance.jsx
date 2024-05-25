import React, { useState, useEffect } from 'react';

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
                element_prompts: ["Day of the week", "Initiative", "Benefits", "Verification needed"],
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
            data.data.forEach(item => {
                newSelectorToText[item.selector] = item.results[0].text;
            });
            setSelectorToText(newSelectorToText);
        });
    }, []);

    // Get the keys from the object to use as headers
    const tableHeaders = Object.keys(tableData);

    // Get the maximum length of the arrays in the object to determine the number of rows
    const numRows = Math.max(...tableHeaders.map(header => tableData[header].length));

    return (
        <table className="table-auto">
            <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: numRows }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {tableHeaders.map((header, columnIndex) => (
                            <td key={columnIndex}>{selectorToText[tableData[header][rowIndex]]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}