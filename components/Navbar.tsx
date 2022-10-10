import { Container, Text, Title, Group, Paper } from "@mantine/core";
import NavItem from "./NavItem";
import { IconUserCircle } from "@tabler/icons";
import Link from "next/link";
import { User } from "../types/interfaces";

interface NavbarProps {
  user: User | undefined;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <>
      <Paper shadow="sm">
        <Container size={1800} style={{ minHeight: 70 }} mt="md">
          <Group position="apart">
            <Link href="/">
              <a style={{ textDecoration: "none" }}>
                <Title color="dark">Homerus</Title>
              </a>
            </Link>

            <Group position="center">
              <NavItem text="My Profile" path="/my-stories" />
              <NavItem text="Boomarks" path="/bookmarks" />
              <NavItem text="Write" path="/write" />
            </Group>

            {user ? (
              <IconUserCircle size={30} />
            ) : (
              <NavItem text="Login/Register" path="/auth/auth-page" />
            )}
          </Group>
        </Container>
      </Paper>
    </>
  );
};

export default Navbar;
