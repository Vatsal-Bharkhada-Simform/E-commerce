// ==========================================
//           SKIP THIS FILE
// ==========================================

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidator } from "../../validators/loginValidator";
import type { LoginType } from "../../types/formDataTypes";
import { useAuth } from "../../context/useAuth";
import { Input } from "../../UI/Input";
import { PasswordInput } from "../../UI/PasswordInput";
import Button from "../../UI/Button";

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<LoginType>({
		resolver: zodResolver(loginValidator),
		mode: "onBlur",
	});

	const { handleLogin } = useAuth();
	const navigate = useNavigate();

	function loginUser(data: LoginType) {
		const res = handleLogin(data);
		if (res.status === "success") {
			navigate("/products");
		} else {
			setError(res.errorField as keyof LoginType, {
				message: res.message,
			});
		}
	}

	return (
		<form
			onSubmit={handleSubmit(loginUser)}
			className="flex flex-col gap-4 px-1"
		>
			<div className="flex flex-col gap-2">
				<Input
					type="text"
					{...register("email")}
					labelText="Email"
					placeholder="abc@gamil.com"
					errorText={errors?.email?.message ?? ""}
					disabled={isSubmitting}
				/>
				<PasswordInput
					{...register("password")}
					labelText="Password"
					placeholder="********"
					errorText={errors?.password?.message ?? ""}
					disabled={isSubmitting}
				/>
			</div>
			<Button variant="DISPLAY" disabled={isSubmitting}>
				Login
			</Button>
		</form>
	);
}
