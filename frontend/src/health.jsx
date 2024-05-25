import FullCalendar from "@fullcalendar/react"; // Import the FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Import the dayGridPlugin

export default function Calendar() {
	const events = [
		{ title: "Marcus's Funeral", start: "2024-05-27", end: "2024-05-27" },
		{ title: "Marcus's Funeral", start: "2024-05-28", end: "2024-05-28" },
		// Add more events as needed
	];

	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			events={events}
		/>
	);
}