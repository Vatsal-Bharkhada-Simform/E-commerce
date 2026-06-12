import { NavList } from "../components/NavList";

export function SideBar() {
	return (
		<aside className="flex flex-col h-full min-w-2xs p-4 gap-4 border-r border-r-gray-200">
			<div className="flex items-center gap-2 py-4">
				{/* <div className="w-10">
					<img src="/public/favicon.svg" alt="Ferio icon" />
				</div> */}
				<h1 className="text-text-main font-bold text-4xl">Ferio</h1>
			</div>

			<NavList />
		</aside>
	);
}
