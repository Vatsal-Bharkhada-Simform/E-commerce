import { useCallback, useMemo, type ReactElement } from "react";
import toast from "react-hot-toast";
import type {
	LoginType,
	SignUpType,
	UserDataType,
} from "../types/formDataTypes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type {
	AuthenticationType,
	LoginReturnType,
} from "../types/contextTypes";
import { getImageString } from "../utils/getImageString";
import { AuthContext } from "./AuthContext";

const LOCALSTORAGE_STORE = "USER_DETAILS";
const LOCALSTORAGE_AUTH_STORE = "USER_AUTH_DETAILS";

export function AuthContextProvider({ children }: { children: ReactElement }) {
	const [isAuthenticated, setIsAuthenticated] =
		useLocalStorage<AuthenticationType>(LOCALSTORAGE_AUTH_STORE, {
			status: false,
		});
	const [userData, setUserData] = useLocalStorage<Array<UserDataType>>(
		LOCALSTORAGE_STORE,
		[]
	);

	const handleSignUp = useCallback(
		async function handleSignUp(data: SignUpType) {
			let imageString: string;

			try {
				imageString = await getImageString(data.profileImage);
			} catch (err) {
				console.log(err);
				return false;
			}

			const combinedData = {
				...data,
				profileImageString: imageString,
			};

			setUserData((prev) => [...prev, combinedData]);

			toast.success("Signed up successfully!");
			return true;
		},
		[setUserData]
	);

	const handleLogin = useCallback(
		function handleLogin(data: LoginType): LoginReturnType {
			const user = userData.find((user) => user.email === data.email);
			if (!user) {
				return {
					status: "failed",
					errorField: "email",
					message: "User does not exist",
				};
			}
			// Passwords stored and compared as plain string only for practical purposes.
			// This is not a standard development approach and is not recommended for real applications.
			if (!(user.password === data.password)) {
				return {
					status: "failed",
					errorField: "password",
					message: "Incorrect password",
				};
			}

			setIsAuthenticated({
				status: true,
				userEmail: user.email,
			});
			toast.success("Logged in successfully!");
			return {
				status: "success",
			};
		},
		[setIsAuthenticated, userData]
	);

	const handleLogout = useCallback(
		function handleLogout() {
			setIsAuthenticated({
				status: false,
			});
		},
		[setIsAuthenticated]
	);

	const getUserData = useCallback(
		function getUserData() {
			if (isAuthenticated.status) {
				return (
					userData.find(
						(user) => user.email === isAuthenticated.userEmail
					) ?? null
				);
			}
			return null;
		},
		[isAuthenticated, userData]
	);

	const userExists = useCallback(
		function userExists(email: string) {
			return userData.findIndex((user) => user.email === email) !== -1;
		},
		[userData]
	);

	const ctxValue = useMemo(
		() => ({
			isAuthenticated,
			handleSignUp,
			handleLogin,
			handleLogout,
			getUserData,
			userExists,
		}),
		[
			getUserData,
			isAuthenticated,
			handleLogin,
			handleSignUp,
			handleLogout,
			userExists,
		]
	);

	return (
		<AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
	);
}
