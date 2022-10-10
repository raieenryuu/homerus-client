import Login from "../../components/login";
import { Tabs, Container, Paper } from "@mantine/core";
import { IconLogin, IconUserCircle } from "@tabler/icons";
import Register from "../../components/register";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/router";

const AuthPage = () => {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    router.push("/");
  }
  return (
    <Paper
      shadow="sm"
      style={{
        maxWidth: 500,
        margin: "100px auto",
        maxHeight: 700,
        minHeight: 350,
      }}
    >
      <Container>
        <Tabs defaultValue="login">
          <Tabs.List>
            <Tabs.Tab value="login" icon={<IconLogin size={14} />}>
              SignIn
            </Tabs.Tab>
            <Tabs.Tab value="register" icon={<IconUserCircle size={14} />}>
              Register
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="login" mt="md">
            <Login />
          </Tabs.Panel>

          <Tabs.Panel value="register" mt="md">
            <Register />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Paper>
  );
};

export default AuthPage;
