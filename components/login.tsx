import {
  Container,
  Center,
  TextInput,
  Group,
  Title,
  Button,
  Paper,
  Notification,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useRouter } from "next/router";
import { post } from "../helpers/requests-helper";
const Login = () => {
  const router = useRouter();

  const [serverError, setServerError] = useState<string>("");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        value.length != 0
          ? /^\S+@\S+$/.test(value)
            ? value.length < 64 && value.length > 8
              ? null
              : "The length should be between 8 and 64 characters"
            : "Invalid email"
          : "This field should not be empty",

      password: (value) =>
        value.length != 0
          ? value.length < 64 && value.length > 8
            ? null
            : "The length of your password should be between 8 and 64 characters"
          : "This field should not be empty",
    },
  });

  async function onSubmit(values: { email: string; password: string }) {
    form.validate();

    const errors = form.errors;
    if (Object.keys(errors).length === 0) {
      try {
        const [error, response] = await post<{ message: string }>(
          "/user/login",
          values
        );

        if (error) {
          //@ts-ignore
          setServerError(error.response?.data.message);
          return;
        }
      } catch (error: any) {
        console.log(error.message);
      }

      router.push("/");
    }
  }
  return (
    <Paper shadow="xs" style={{ maxWidth: 700, margin: "auto" }}>
      <Center>
        <Container>
          <Title color="dark">Login</Title>
        </Container>
      </Center>
      <Container size="xs">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="example@example.com"
            withAsterisk
            size="lg"
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Password"
            placeholder="**********"
            type="password"
            withAsterisk
            size="lg"
            mt="md"
            {...form.getInputProps("password")}
          />
          <Center mt="md">
            <Group>
              <Button radius="xl" type="submit" size="md" color={"indigo"}>
                Enter
              </Button>
            </Group>
          </Center>
        </form>
      </Container>

      {serverError.length > 0 && (
        <Notification
          mt="xs"
          title="Error"
          color="red"
          onClose={() => setServerError("")}
        >
          {serverError}
        </Notification>
      )}
    </Paper>
  );
};

export default Login;
