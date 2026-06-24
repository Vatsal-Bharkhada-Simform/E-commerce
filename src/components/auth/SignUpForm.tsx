import { useForm } from "react-hook-form";
import { type MouseEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import type { SignUpType } from "../../types/formDataTypes";
import { signupValidator } from "../../validators/signupValidator";
import { useAuth } from "../../context/useAuth";
import { Input } from "../../UI/Input";
import { Select } from "../../UI/Select";
import { PasswordInput } from "../../UI/PasswordInput";
import Button from "../../UI/Button";

type SignUpFormProps = {
	formStep: number;
	setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

// This array represents the input fields of each step of the form
const Fields: Array<Array<keyof SignUpType>> = [
	["firstName", "lastName", "email", "contact", "agreementConfirmation"],
	["city", "state", "address"],
	["age", "gender", "birthDate", "profileImage"],
	["password", "confirmPassword"],
];

export function SignUpForm({ formStep, setFormStep }: SignUpFormProps) {
	const {
		formState: { errors, isSubmitting },
		register,
		handleSubmit,
		trigger,
		setError,
		getValues,
	} = useForm<z.input<typeof signupValidator>>({
		resolver: zodResolver(signupValidator),
		mode: "onBlur",
	});

	const { handleSignUp, userExists } = useAuth();
	const navigate = useNavigate();

	async function signUpUser(data: SignUpType) {
		const res = await handleSignUp(data);
		if (res) {
			navigate("/auth/login");
		} else {
			toast.error("Something went wrong");
		}
	}

	async function incrementStep(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const isValid = await trigger(Fields[formStep]);
		if (formStep === 0 && isValid && userExists(getValues("email"))) {
			setError("email", {
				message: "User with this email already exists",
			});
			return;
		}

		if (isValid && formStep < Fields.length - 1) {
			setFormStep((prev) => prev + 1);
		}
	}

	function decrementStep() {
		setFormStep((prev) => prev - 1);
	}

	return (
		<form
			onSubmit={handleSubmit(signUpUser)}
			className="flex-1 flex flex-col gap-4 px-1"
		>
			<div className="w-full flex flex-col gap-2">
				{formStep === 0 && (
					<>
						<Input
							type="text"
							{...register("firstName")}
							labelText="First Name"
							placeholder="John"
							errorText={errors?.firstName?.message ?? ""}
							disabled={isSubmitting}
						/>
						<Input
							type="text"
							{...register("lastName")}
							labelText="Last Name"
							placeholder="Doe"
							errorText={errors?.lastName?.message ?? ""}
							disabled={isSubmitting}
						/>
						<Input
							type="email"
							{...register("email")}
							labelText="Email"
							placeholder="abc@gmail.com"
							errorText={errors?.email?.message ?? ""}
							disabled={isSubmitting}
						/>
						<Input
							type="tel"
							{...register("contact")}
							labelText="Contact"
							placeholder="123xxxxxx0"
							errorText={errors?.contact?.message ?? ""}
							disabled={isSubmitting}
						/>
					</>
				)}
				{formStep === 1 && (
					<>
						<Input
							type="text"
							{...register("city")}
							labelText="City"
							placeholder="e.g. Ahmedabad"
							errorText={errors?.city?.message ?? ""}
							disabled={isSubmitting}
						/>
						<Input
							type="text"
							{...register("state")}
							labelText="State"
							placeholder="e.g. Gujarat"
							errorText={errors?.state?.message ?? ""}
							disabled={isSubmitting}
						/>
						<Input
							type="text"
							{...register("address")}
							labelText="Address"
							placeholder="e.g. 123, XYZ street"
							errorText={errors?.address?.message ?? ""}
							disabled={isSubmitting}
						/>
					</>
				)}
				{formStep === 2 && (
					<>
						<Input
							type="number"
							{...register("age", { valueAsNumber: true })}
							labelText="Age"
							placeholder="e.g. 20"
							errorText={errors?.age?.message ?? ""}
							disabled={isSubmitting}
						/>
						<Select
							{...register("gender")}
							options={["Male", "Female", "Other"]}
							defaultOptionText="Select your gender"
							labelText="Gender"
							errorText={errors?.gender?.message ?? ""}
							disabled={isSubmitting}
						/>
						<Input
							type="file"
							accept="image/png, image/jpeg, image/jpg"
							{...register("profileImage")}
							labelText="Profile Image"
							placeholder="Upload a profile image"
							errorText={
								errors?.profileImage?.message?.toString() ?? ""
							}
							disabled={isSubmitting}
						/>
						<Input
							type="date"
							{...register("birthDate")}
							labelText="Birth Date"
							max={new Date().toISOString().split("T")[0]}
							errorText={errors?.birthDate?.message ?? ""}
							disabled={isSubmitting}
						/>
					</>
				)}
				{formStep === 3 && (
					<>
						<PasswordInput
							{...register("password")}
							labelText="Password"
							placeholder="********"
							errorText={errors?.password?.message ?? ""}
							disabled={isSubmitting}
						/>
						<PasswordInput
							{...register("confirmPassword")}
							labelText="Confirm Password"
							placeholder="********"
							errorText={errors?.confirmPassword?.message ?? ""}
							disabled={isSubmitting}
						/>
					</>
				)}
			</div>
			<div className="flex gap-4 justify-between">
				{formStep === 0 && (
					<div
						className={`flex gap-2 px-2 items-center relative rounded-xl ${errors.agreementConfirmation?.message && "border-2 border-red-400 bg-red-100"}`}
					>
						<Input
							type="checkbox"
							{...register("agreementConfirmation")}
							disabled={isSubmitting}
							id="agreementConfirmation"
						/>
						<label
							htmlFor="agreementConfirmation"
							className="text-sm"
						>
							I accept the Terms and Privacy Policy
						</label>
					</div>
				)}
				{formStep > 0 && (
					<Button
						type="button"
						variant="SECONDARY"
						disabled={isSubmitting}
						onClick={decrementStep}
						className="inline-flex items-center gap-2"
					>
						<ArrowLeft size={18} />
						Back
					</Button>
				)}
				{formStep < 3 ? (
					<Button
						type="button"
						variant="DISPLAY"
						disabled={isSubmitting}
						className="inline-flex items-center gap-2"
						onClick={incrementStep}
					>
						Next
						<ArrowRight size={18} />
					</Button>
				) : (
					<Button variant="DISPLAY" disabled={isSubmitting}>
						Submit
					</Button>
				)}
			</div>
		</form>
	);
}
