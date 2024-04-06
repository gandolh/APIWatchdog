import {
	Paper,
	TextInput,
	PasswordInput,
	Checkbox,
	Button,
	Title,
	Text,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
 import { GoogleLoginCall, LoginCall } from "../../apiCallers/AuthApiCaller";

import { useGoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "./AuthContext";

export default function Login() {
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
			loggedIn: false,
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : "Invalid email",
			password: (value) =>
				value.length >= 8 ? null : "Password is too short",
		},
	});

	const navigate = useNavigate();
	const { setCurentUser } = useAuthContext();

	const handleLoginConfirmed = (user: User) => {
		window.localStorage.setItem("authenticatedUser", JSON.stringify(user));
		setCurentUser(user);
	};

	const HandleLogin = () => {
		const output = form.validate();
		if (output.hasErrors == true) return;
		LoginCall(
			form.values.email,
			form.values.password,
			handleLoginConfirmed
		).then((ok) => {
			console.log(ok);
			if (ok != -1) {
				navigate("/");
			}
		});
	};

	// Google Login
	const [user, setUser] = useState<any>([]);

	const HandleGoogleLogin = () => {
		login();
	};

	const login = useGoogleLogin({
		onSuccess: (codeResponse) => {
			setUser(codeResponse);
			console.log(codeResponse);
		},
		onError: (error) => console.log("Login Failed:", error),
	});

	useEffect(() => {
		if (user) {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${user.access_token}`,
							Accept: "application/json",
						},
					}
				)
				.then((res) => {
					GoogleLoginCall(
						res.data.email,
						res.data.given_name,
						res.data.family_name
					).then((user) => {
						if (user != null) {
							handleLoginConfirmed(user);
							navigate("/");
						} else {
							toast("Google login failed la salvarea in API.");
						}
					});
				})
				.catch((err) => console.log(err));
		}
	}, [user]);

	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form} radius={0} p={30}>
				<Title
					order={2}
					className={classes.title}
					ta="center"
					mt="md"
					mb={50}
				>
					Welcome back to Nutrisha!
				</Title>

				<TextInput
					label="Email address"
					placeholder="hello@gmail.com"
					size="md"
					{...form.getInputProps("email")}
				/>
				<PasswordInput
					label="Password"
					placeholder="Your password"
					mt="md"
					size="md"
					{...form.getInputProps("password")}
				/>
				<Checkbox
					label="Keep me logged in"
					mt="xl"
					size="md"
					{...form.getInputProps("loggedIn")}
				/>
				<Button
					fullWidth
					mt="xl"
					size="md"
					onClick={HandleLogin}
					type="button"
				>
					Login
				</Button>

				<Text ta="center" mt="md">
					Don&apos;t have an account?{" "}
					<Link
						to="/register"
						style={{
							fontWeight: "700",
							color: "var(--mantine-color-anchor)",
						}}
					>
						Register
					</Link>
				</Text>

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						height: "40px",
						marginTop: "40px",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center",
							width: "200px",
							height: "40px",
							backgroundColor: "#ebebeb",
							color: "black",
							borderRadius: "20px",
							cursor: "pointer",
						}}
						onClick={HandleGoogleLogin}
					>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
							style={{
								width: "30px",
								height: "30px",
							}}
						/>
						Sign in with Google
					</div>
				</div>
			</Paper>
		</div>
	);
}
