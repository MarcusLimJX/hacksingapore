import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./navbar";
import { LandingHero } from "./LandingHero";

function App() {
	const location = useLocation();

	return (
		<div>
			<NavBar />
			{location.pathname === '/' && <LandingHero />}
			<Outlet />
		</div>
	);
}

export default App;
