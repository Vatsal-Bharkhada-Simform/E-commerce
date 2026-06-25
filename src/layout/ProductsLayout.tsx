import { Outlet } from "react-router";
import Button from "../UI/Button";
import { Container } from "./Container";
import { SideBar } from "./Sidebar";

export function ProductsLayout() {
	return (
		<Container type="ROW" className="w-full flex-1 overflow-hidden">
			<SideBar />
			<main className="flex-1 flex flex-col overflow-hidden">
				<section className="flex-1 flex flex-col overflow-hidden bg-card">
					<div className="flex-1 overflow-y-auto p-8">
						<div>
							<div className="p-8 flex flex-col gap-8 bg-white border border-border rounded-4xl">
								<h2 className="text-3xl">
									Explore our vast range of products
								</h2>
								<div className="flex gap-4">
									<Button variant="PRIMARY">
										View Catalog
									</Button>
									<Button variant="SECONDARY">
										Explore products
									</Button>
								</div>
							</div>
						</div>
						<div>
							<Outlet />
						</div>
					</div>
				</section>
			</main>
		</Container>
	);
}
