import { Container } from "./layout/Container";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { SideBar } from "./layout/Sidebar";

function App() {
	return (
		<>
			<Container>
				<Header />
				<main className="flex-1 flex w-full">
					<SideBar />
				</main>
				<Footer />
			</Container>
		</>
	);
}

export default App;
