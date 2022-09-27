import {
  Container,
  Center,
  TextInput,
  Group,
  Checkbox,
  Title,
  Button,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const Login = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length != 0 ? null : "this field should not be empty",
    },
  });

  async function onSubmit(values: { email: string; password: string }) {
    form.validate();

    const errors = form.errors;

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/login",
          values,
          {
            withCredentials: true,
          }
        );

        console.log(response);
      } catch (error: any) {
        console.log(error.message);
      }

      router.push("/");
    }
  }
  return (
    <Box sx={{ maxWidth: 600 }} mx="auto">
      <Center>
        <Container>
          <Title>Login</Title>
        </Container>
      </Center>
      <Container size="xs">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Username or Email"
            placeholder="Insert your username or your email here"
            withAsterisk
            size="md"
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Password"
            placeholder="**********"
            type="password"
            withAsterisk
            size="md"
            mt="md"
            {...form.getInputProps("password")}
          />
          <Center mt="md">
            <Group>
              <Button type="submit" size="md" color={"indigo"}>
                Enter
              </Button>
            </Group>
          </Center>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
