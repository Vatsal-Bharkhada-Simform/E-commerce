import z from "zod";

const MAX_FILE_SIZE = 1_000_000;

export const signupValidator = z
	.object({
		firstName: z
			.string()
			.trim()
			.min(1, "First name cannot be empty")
			.max(30, "First name cannot exceed 30 characters")
			.regex(/^[a-zA-Z]+$/, "First name must only contain alphabets"),

		lastName: z
			.string()
			.trim()
			.min(1, "Last name cannot be empty")
			.max(30, "Last name cannot exceed 30 characters")
			.regex(/^[a-zA-Z]+$/, "Last name must only contain alphabets"),

		email: z
			.email("Please enter a valid email address")
			.max(200, "Email cannot exceed 200 characters"),

		city: z
			.string()
			.trim()
			.min(1, "City cannot be empty")
			.max(40, "City name cannot exceed 40 characters")
			.regex(/^[a-zA-Z]+$/, "City must only contain alphabets"),

		state: z
			.string()
			.trim()
			.min(1, "State cannot be empty")
			.max(40, "State name cannot exceed 40 characters")
			.regex(/^[a-zA-Z]+$/, "State must only contain alphabets"),

		address: z
			.string()
			.trim()
			.min(1, "Address cannot be empty")
			.max(200, "Address cannot exceed 200 characters"),

		age: z
			.number("Please enter a valid age")
			.int("Age must be a whole number")
			.min(1, "Age must be at least 1")
			.max(120, "Please enter a valid age under 120"),

		gender: z.enum(
			["Male", "Female", "Other"],
			"Please select your gender"
		),

		contact: z
			.string()
			.trim()
			.length(10, "Contact number must be exactly 10 digits")
			.regex(/^[0-9]+$/, "Contact number must contain only numbers"),

		profileImage: z
			.instanceof(FileList)
			.refine((files) => files.length > 0, {
				message: "Please select an image",
			})
			.refine(
				(file) =>
					["image/png", "image/jpeg", "image/jpg"].includes(
						file[0]?.type
					),
				{ message: "Only .jpeg, .jpg, and .png formats are accepted" }
			)
			.refine(
				(file) => {
					return file[0]?.size < MAX_FILE_SIZE;
				},
				{ message: "File size cannot be greater than 1MB" }
			),

		birthDate: z.coerce
			.date<Date>()
			.min(new Date("1900-01-01"), "Birth date cannot be before 1900")
			.max(new Date(), "Birth date cannot be in the future"),

		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.max(20, "Password cannot exceed 20 characters")
			.regex(
				/[A-Z]/,
				"Password must contain at least one uppercase letter"
			)
			.regex(
				/[a-z]/,
				"Password must contain at least one lowercase letter"
			)
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(
				/[^A-Za-z0-9]/,
				"Password must contain at least one special character"
			)
			.regex(/^[^<>]*$/, "Password contains invalid characters (< or >)"),

		confirmPassword: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.max(20, "Password cannot exceed 20 characters"),

		agreementConfirmation: z
			.boolean()
			.refine(
				(val) => val === true,
				"You must agree to the terms and privacy policy to sign up"
			),
	})
	.refine((obj) => obj.password === obj.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
