// ==========================================
//           SKIP THIS FILE
// ==========================================

import { Link } from "react-router";
import { LoginForm } from "../components/auth/LoginForm";
import { AuthFormComposition } from "../layout/AuthFormComposition";
import { ROUTES } from "../routes/routeStrings";

export function Login() {
	return (
		<AuthFormComposition
			header="Login"
			description="Login using your email and password"
			navigationOption={
				<>
					Don't have an account?{" "}
					<Link
						to={ROUTES.AUTH.SIGNUP}
						className="font-semibold text-blue-600"
					>
						Create a new account
					</Link>
				</>
			}
		>
			<LoginForm />
		</AuthFormComposition>
	);
}
