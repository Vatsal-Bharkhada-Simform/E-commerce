// ==========================================
//           SKIP THIS FILE
// ==========================================

import { useState } from "react";
import { Link } from "react-router";
import { SignUpForm } from "../components/auth/SignUpForm";
import { AuthFormComposition } from "../layout/AuthFormComposition";
import { ROUTES } from "../routes/routeStrings";

const stepMessages = [
	{
		heading: "Create a new account",
		description: "Tell us a bit about yourself and how we can reach you.",
	},
	{
		heading: "Address Details",
		description: "Let us know where you are currently located.",
	},
	{
		heading: "Profile Setup",
		description:
			"Add a photo and a few personal details to make your account yours.",
	},
	{
		heading: "Secure Your Account",
		description: "Create a strong password to keep your information safe.",
	},
];

const MAX_STEPS = 4;

function SignUp() {
	const [formStep, setFormStep] = useState(0);

	function generateIndicators() {
		return (
			<div className="flex gap-2 pt-4">
				{Array.from({ length: MAX_STEPS }).map((_, index) => {
					return (
						<div
							key={index}
							className={`flex-1 h-2 rounded-2xl ${index < formStep ? "bg-blue-500/90" : index === formStep ? "bg-blue-200" : "bg-gray-200/80"}`}
						></div>
					);
				})}
			</div>
		);
	}

	return (
		<AuthFormComposition
			header={stepMessages[formStep].heading}
			description={stepMessages[formStep].description}
			headerAddOn={generateIndicators()}
			navigationOption={
				<>
					Already have an account?{" "}
					<Link
						to={ROUTES.AUTH.LOGIN}
						className="font-semibold text-blue-600"
					>
						Login
					</Link>
				</>
			}
		>
			<SignUpForm formStep={formStep} setFormStep={setFormStep} />
		</AuthFormComposition>
	);
}

export { SignUp };
