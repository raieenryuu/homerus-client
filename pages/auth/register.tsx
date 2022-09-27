import {
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  TextInput,
  Title,
} from "@mantine/core";

const Register = () => {
  return (
    <div>
      <Center>
        <Container>
          <Title>Register</Title>
        </Container>
      </Center>
      <Container size="xs">
        <TextInput
          label="Username"
          placeholder="Insert your username here"
          withAsterisk
          size="md"
        />

        <TextInput
          label="Email"
          placeholder="example@example.com"
          withAsterisk
          size="md"
          mt="md"
        />

        <Center mt="lg">
          <Group position="center" noWrap>
            <TextInput
              label="Password"
              placeholder="******"
              withAsterisk
              size="md"
              type="password"
            />

            <TextInput
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
          <Checkbox label="I have read and agree with the terms of use" />
          <Button size="md" color={"indigo"}>
            {" "}
            Sign up
          </Button>
        </Group>
      </Center>
    </div>
  );
};

export default Register;
