import { Group, Button, TextInput } from "@mantine/core";
import StoryCard from "../components/StoryCard";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Modal } from "@mantine/core";
import { useRouter } from "next/router";

import { fetcher, post } from "../helpers/requests-helper";
import { useUser } from "../context/UserContext";
import { AppContext } from "next/app";
import { GetServerSidePropsContext } from "next";
import { fetcherSSR } from "../helpers/request-helper-ssr";

export interface Story {
  id: string;
  title: string;
  description: string;
  isPublished: boolean;
}

const MyStories = (props: {
  storiesFromServer: Story[];
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    tokenVersion: number;
  };
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [stories, setStories] = useState<Story[]>(props.storiesFromServer);

  const router = useRouter();
  console.log(stories);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: (value) =>
        value.length != 0 ? null : "Your story should have a title",

      description: (value) =>
        value.length != 0 ? null : "Your story should have a description",
    },
  });

  async function onSubmit() {
    const response = await post("http://localhost:8000/api/story", form.values);

    setStories([
      ...stories,
      {
        id: Math.random().toString(),
        title: form.values.title,
        description: form.values.description,
        isPublished: false,
      },
    ]);
    form.reset();
    setIsOpened(false);
  }

  return (
    <div>
      <Group position="center">
        <h1>My Stories</h1>
        <Group position="right">
          <Button color="indigo" onClick={() => setIsOpened(true)}>
            Create a new Story
          </Button>
        </Group>
      </Group>

      <Modal
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        title="Create a new Story"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput label="TITLE" {...form.getInputProps("title")} />
          <TextInput
            label="DESCRIPTION"
            size="xl"
            {...form.getInputProps("description")}
          />
          <Group position="right" mt="md">
            <Button type="submit" color="indigo">
              Create Story
            </Button>
          </Group>
        </form>
      </Modal>
      <Group position="center">
        {stories.map((story) => {
          return (
            <StoryCard
              key={story.id}
              id={story.id}
              title={story.title}
              description={story.description}
              author={props.user.username}
            />
          );
        })}
      </Group>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const [error, user] = await fetcherSSR<{
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    tokenVersion: number;
  }>(context.req, context.res, "http://localhost:8000/api/user/me");
  if (error || !user)
    return { redirect: { statusCode: 307, destination: "/" } };

  const [nerror, stories] = await fetcherSSR<Story[]>(
    context.req,
    context.res,
    `http://localhost:8000/api/story/author/${user.id}`
  );

  if (nerror || !stories)
    return { redirect: { statusCode: 307, destination: "/" } };

  return {
    props: {
      user: user,
      storiesFromServer: stories,
    },
  };
}

export default MyStories;
