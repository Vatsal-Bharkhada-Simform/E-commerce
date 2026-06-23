import { ErrorBoundary } from "./components/ErrorBoundary";
import { useProducts } from "./context/useProducts";
import { Container } from "./layout/Container";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { ProductDetails } from "./layout/ProductDetails";
import { Products } from "./layout/Products";
import { SideBar } from "./layout/Sidebar";

function App() {
	const { selectedProduct } = useProducts();

	return (
		<>
			<Container
				type="COLUMN"
				className="w-screen h-screen overflow-hidden"
			>
				<Header />
				<ErrorBoundary defaultMessage="Error while loading products">
					{selectedProduct ? (
						<Container
							type="ROW"
							className="flex justify-center flex-1"
						>
							<div className="overflow-y-auto w-[70vw]">
								<ProductDetails />
							</div>
						</Container>
					) : (
						<Container
							type="ROW"
							className="w-full flex-1 overflow-hidden"
						>
							<SideBar />
							<main className="flex-1 flex flex-col overflow-hidden">
								<Products />
							</main>
						</Container>
					)}
				</ErrorBoundary>
				<Footer />
			</Container>
		</>
	);
}

export default App;
