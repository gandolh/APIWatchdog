import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { LoginCall, RegisterCall } from "../../apiCallers/AuthApiCaller";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios, { AxiosError } from "axios";

function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 4
          ? "Password should include at least 4 characters"
          : null,
    },
  });

  const navigate = useNavigate();
  const { setCurentUser } = useAuthContext();

  const AuthConfirmed = (user: User) => {
    window.localStorage.setItem("authenticatedUser", JSON.stringify(user));
    setCurentUser(user);
  };

  // user pass
  const HandleLogin = () => {
    const output = form.validate();
    if (output.hasErrors == true) return;
    LoginCall(form.values.email, form.values.password, AuthConfirmed, setCurentUser).then(
      (ok) => {
        console.log(ok);
        if (ok != -1) {
          navigate("/");
        }
      }
    );
  };

  // Google login
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
        .then((res: any) => {
          const resp = res.data;
          const currentUser: User = {
            email: resp.email,
            username: resp.name,
          };
          AuthConfirmed(currentUser);
          navigate("/");
        })
        .catch((err: AxiosError) => console.log(err));
    }
  }, [user]);

  // register
  const HandleRegister = () => {
    const output = form.validate();
    if (output.hasErrors == true) return;
    // do call

    const user = {
      email: form.values.email,
      password: form.values.password,
      username: form.values.username,
    } as User;

    RegisterCall(user).then((ok) => {
      // console.log(ok);
      if (ok != -1) {
        HandleLogin();
      }
    });
  };

  const HandleSubmit = () => {
    if (type === "register") HandleRegister();
    else HandleLogin();
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={HandleGoogleLogin}>
          Google
        </GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(HandleSubmit)}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Username"
              placeholder="Your username"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="example@gmail.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 4 characters"
            }
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export default function Login() {
  return (
    <div className={"flex justify-center items-center " + classes.bglogin}>
      <AuthenticationForm />
    </div>
  );
}
