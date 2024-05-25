import "./App.css";
import { Outlet } from "react-router-dom";
import { NavBar } from "./navbar";
import { LandingHero } from "./LandingHero";

function App() {
	return (
		<div>
			<NavBar />
			<LandingHero />
			<Outlet />
		</div>
	);
}

export default App;
