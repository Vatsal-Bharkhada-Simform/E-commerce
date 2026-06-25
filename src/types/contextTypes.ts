import type {
	ProductListState,
	ProductWithAdditionalData,
} from "./productTypes";
import type { LoginType, SignUpType } from "./formDataTypes";

export type ProductContextType = {
	products: ProductListState;
	getProductById: (
		id: number
	) => Promise<ProductWithAdditionalData | undefined>;
};

export type AuthenticationType =
	| {
			status: false;
	  }
	| {
			status: true;
			userEmail: string;
	  };

export type LoginReturnType =
	| {
			status: "success";
	  }
	| {
			status: "failed";
			errorField: string;
			message: string;
	  };

export type AuthContextType = {
	isAuthenticated: AuthenticationType;
	handleSignUp: (data: SignUpType) => Promise<boolean>;
	handleLogin: (data: LoginType) => LoginReturnType;
	handleLogout: () => void;
	userExists: (email: string) => boolean;
};
