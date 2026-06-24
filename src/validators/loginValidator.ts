import z from "zod";

export const loginValidator = z.object({
	email: z.email("Enter a valid email address"),

	password: z.string().min(1, "Please enter a password"),
});
