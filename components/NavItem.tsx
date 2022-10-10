import Link from "next/link";
import { Text } from "@mantine/core";

interface NavItemProps {
  text: string;
  path: string;
}

const NavItem = (props: NavItemProps) => {
  return (
    <Link href={props.path}>
      <a style={{ textDecoration: "none" }}>
        <Text color="dark" size="xl">
          {props.text}
        </Text>
      </a>
    </Link>
  );
};

export default NavItem;
