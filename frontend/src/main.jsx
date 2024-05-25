import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Finance from "./Finance.jsx";
import Health from "./Health.jsx";
import Login from "./Login.jsx";
import DBSPlanner from "./DBSPlanner.jsx";
import HealthHub from "./HealthHub.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				children: [
					{ path: "/finance", element: <Finance /> },
					{ path: "/health", element: <Health /> },
					{ path: "/login", element: <Login /> },
          { path: "/dbs-planner", element: <DBSPlanner /> },
          { path: "/health-hub", element: <HealthHub /> },
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
