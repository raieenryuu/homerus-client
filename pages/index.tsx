import { Center, Container, TextInput } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import StoryList from "../components/StoryList";
import styles from "../styles/Home.module.css";
import { IconSearch } from "@tabler/icons";

const Home: NextPage = () => {
  return (
    <Container>
      <Center>Welcome to Homerus</Center>

      <Container mt="lg">
        <TextInput radius="xl" size="md" icon={<IconSearch />} />

        <StoryList stories={[]} />
      </Container>
    </Container>
  );
};

export default Home;
