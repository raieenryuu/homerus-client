import {
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  Text,
  Notification,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { post } from "../helpers/requests-helper";

const Register = () => {
  const [checkboxError, setCheckboxError] = useState(false);

  const [serverError, setServerError] = useState<string>("");

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfUse: false,
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
      confirmPassword: (value) =>
        value.length != 0
          ? value.length < 64 && value.length > 8
            ? null
            : "The length of your password should be between 8 and 64 characters"
          : "This field should not be empty",

      username: (value) =>
        value.length != 0
          ? value.length < 30 && value.length > 4
            ? null
            : "The length of your username should be between 4 and 30 characters"
          : "This field should not be empty",
    },
  });

  async function onSubmit() {
    if (form.values.password != form.values.confirmPassword) {
      form.setFieldError("confirmPassword", "Both passwords should match");
      return;
    }

    if (!form.values.termsOfUse) {
      console.log("here");
      setCheckboxError(true);
      return;
    }

    const { email, password, username } = { ...form.values };

    const [error, response] = await post<{ message: string }>(
      "/user/register",
      {
        email,
        password,
        username,
      }
    );

    if (error) {
      //@ts-ignore
      setServerError(error.response?.data.message);
      console.log(error.response?.data.message);
    }

    console.log(response);
  }

  return (
    <div>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Center>
          <Container>
            <Title color="dark">Register</Title>
          </Container>
        </Center>
        <Container size="xs">
          <TextInput
            {...form.getInputProps("username")}
            label="Username"
            placeholder="Insert your username here"
            withAsterisk
            size="md"
          />

          <TextInput
            {...form.getInputProps("email")}
            label="Email"
            placeholder="example@example.com"
            withAsterisk
            size="md"
            mt="md"
          />

          <Center mt="lg">
            <Group position="center" noWrap>
              <TextInput
                {...form.getInputProps("password")}
                label="Password"
                placeholder="******"
                withAsterisk
                size="md"
                type="password"
              />

              <TextInput
                {...form.getInputProps("confirmPassword")}
                label="Confirm Password"
                placeholder="******"
                withAsterisk
                size="md"
                type="password"
              />
            </Group>
          </Center>
        </Container>
        <Center mt="md">
          <Group>
            <div>
              <Checkbox
                {...form.getInputProps("termsOfUse")}
                label="I have read and agree with the terms of use"
              />

              {checkboxError && (
                <Text color="red">You need to accept the terms</Text>
              )}
            </div>

            <Button type="submit" radius="xl" size="md" color={"indigo"}>
              {" "}
              Sign up
            </Button>
          </Group>
        </Center>
      </form>
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
    </div>
  );
};

export default Register;
