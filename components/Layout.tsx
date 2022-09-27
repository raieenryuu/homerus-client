import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Center,
  Container,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import { GiBrain } from "react-icons/gi";
import NavbarItem from "./NavbarItem";
import { GoPencil } from "react-icons/go";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useUser } from "../context/UserContext";
import { fetcher } from "../helpers/requests-helper";
import { useEffect } from "react";

import { GiOpenBook } from "react-icons/gi";

interface UserDocument {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  tokenVersion: number;
}

const Layout: React.FC<{ children?: JSX.Element }> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, setUser } = useUser();
  // const router = useRouter();

  const getMe = async () => {
    const [error, user] = await fetcher<UserDocument>(
      `http://localhost:8000/api/user/me`
    );

    console.log(error, user);
    if (!error && user) setUser(user);
  };

  useEffect(() => {
    if (!user) getMe();
  });
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Stack justify="center">
            {user && (
              <NavbarItem
                link="/write"
                title="Write"
                iconComponent={<GoPencil size={35} />}
              />
            )}
            {user && (
              <NavbarItem
                link="/bookmarks"
                title="Bookmarks"
                iconComponent={<BsFillBookmarkFill size={30} />}
              />
            )}

            {user && (
              <NavbarItem
                link="/my-stories"
                title="My Stories"
                iconComponent={<GiOpenBook size={45} />}
              />
            )}
          </Stack>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header
          height={70}
          p="md"
          style={{
            backgroundColor: "#270099",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <GiBrain size={80} />

            <Title>Homerus</Title>

            {user ? <Text>{user.username}</Text> : null}
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
