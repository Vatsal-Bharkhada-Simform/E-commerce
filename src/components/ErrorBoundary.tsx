import React, { type ReactNode } from "react";
import Button from "../UI/Button";

interface ErrorBoundaryProps {
	children: ReactNode;
	defaultMessage: string;
}

interface ErrorBoundaryState {
	hasError: boolean;
	errorMessage: string;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
	}

	state = {
		hasError: false,
		errorMessage: "",
	};

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			hasError: true,
			errorMessage: error.message,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error(error);
		console.error(errorInfo);
	}

	reset = () => {
		this.setState({
			hasError: false,
			errorMessage: "",
		});
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="w-full p-4 flex-1 flex justify-center items-center">
					<div className="p-4 w-lg bg-red-50 border-2 border-red-300 text-red-500 flex flex-col gap-4 items-start rounded-2xl">
						<h2 className="text-xl">
							{this.state.errorMessage ||
								this.props.defaultMessage ||
								"Unknown error occured"}
						</h2>
						<Button
							variant="SECONDARY"
							title="Retry"
							className="inline-block"
							onClick={this.reset}
						>
							Retry
						</Button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export { ErrorBoundary };
