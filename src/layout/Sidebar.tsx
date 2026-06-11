import { NavList } from "../components/NavList";

export function SideBar() {
	return (
		<aside className="flex flex-col h-full min-w-2xs p-4 gap-4 border-r border-r-gray-300">
			{/* <h2>Sidebar</h2> */}

			<NavList />
		</aside>
	);
}
