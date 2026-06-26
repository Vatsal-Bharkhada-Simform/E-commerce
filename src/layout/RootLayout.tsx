import { useRef } from "react";
import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Container } from "./Container";
import { ErrorBoundary } from "../components/ErrorBoundary";

export function RootLayout() {
	const searchRef = useRef<HTMLInputElement | null>(null);

	function focusOnSearch() {
		if (!searchRef.current) return;
		searchRef.current.focus();
	}

	return (
		<>
			<Container
				type="COLUMN"
				className="w-screen h-screen overflow-hidden"
			>
				<Header searchRef={searchRef} />
				<ErrorBoundary defaultMessage="There was an error while loading the page">
					<Outlet />
				</ErrorBoundary>
				<Footer focusOnSearch={focusOnSearch} />
			</Container>
		</>
	);
}
