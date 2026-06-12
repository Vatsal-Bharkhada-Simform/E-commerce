import { Container } from "./layout/Container";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { Products } from "./layout/Products";
import { SideBar } from "./layout/Sidebar";

function App() {
	return (
		<>
			<Container type="COLUMN" className="w-screen h-screen">
				<Container type="ROW" className="w-full flex-1 overflow-hidden">
					<SideBar />
					<main className="flex-1 flex flex-col overflow-hidden">
						<Header />
						<Products />
					</main>
				</Container>
				<Footer />
			</Container>
		</>
	);
}

export default App;
