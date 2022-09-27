import { Button, Container, Group, Text } from "@mantine/core";
import React from "react";
import Link from "next/link";
interface NavbarItemProps {
  title: string;
  iconComponent: React.ReactNode;
  link: string;
}

const NavbarItem = (props: NavbarItemProps) => {
  return (
    <Link href={props.link}>
      <a>
        <Button radius="xl" variant="subtle" color={"gray"}>
          <Container>
            <Group noWrap>
              {props.iconComponent}
              <Text size={"lg"}>{props.title}</Text>
            </Group>
          </Container>
        </Button>
      </a>
    </Link>
  );
};

export default NavbarItem;
