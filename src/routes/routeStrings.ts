export const ROUTES = {
	GLOBAL_ROOT: "/",
	CATCH_ALL: "*",
	AUTH: {
		ROOT: "/auth",
		LOGIN: "/auth/login",
		SIGNUP: "/auth/signup",
	},
	PRODUCT: {
		ROOT: "/products",
		INDIVIDUAL: "/products/:id",
	},
} as const;
