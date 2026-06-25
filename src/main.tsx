import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { ProductsContextProvider } from "./context/ProductsContextProvider.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContextProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Toaster
			position="top-right"
			reverseOrder={false}
			gutter={8}
			toastOptions={{
				style: {
					padding: "1rem",
					borderRadius: "10rem",
				},
			}}
		/>
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<ProductsContextProvider>
					<App />
				</ProductsContextProvider>
			</AuthContextProvider>
		</QueryClientProvider>
	</StrictMode>
);
