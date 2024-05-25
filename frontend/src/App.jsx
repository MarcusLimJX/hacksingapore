import "./App.css";
import { Outlet } from 'react-router-dom';
import { NavBar } from "./navbar";
import { LandingHero } from "./LandingHero";
import { Avatar } from "./avatar";

function App() {
	return (
		<div>
			<NavBar />
			<LandingHero />
			<Outlet />
			<Avatar />
		</div>
	);
}

export default App;
