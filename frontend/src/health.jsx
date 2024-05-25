import FullCalendar from "@fullcalendar/react"; // Import the FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Import the dayGridPlugin
import { Link } from 'react-router-dom';

export default function Calendar() {
	const events = [
		{ title: "Dialysis Treatment", start: "2024-05-27", end: "2024-05-27" },
		{
			title: "Kidney Surgery",
			start: "2024-05-28",
			end: "2024-05-28",
		},
		// Add more events as needed
	];

	return (
        <>
        <h1 className="text-2xl font-bold text-blue-500 mb-10">Upcoming Consult and Medication</h1>
        <div className="flex justify-center">
            <Link to="/health-hub">
                <img src="https://mysweetretirement.com/wp-content/uploads/2015/10/HealthHub-Logo.jpg" alt="healthhub" className="shadow-md hover:shadow-xl"/>
            </Link>
        </div>
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			events={events}
		/>
        </>
	);
}
