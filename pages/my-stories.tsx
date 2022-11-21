import {
  Group,
  Button,
  TextInput,
  Stack,
  Divider,
  Container,
  Center,
  Textarea,
  Badge,
  Text,
  ScrollArea,
} from "@mantine/core";
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
import { handleApiError } from "../helpers/error";
import Tag from "../components/Tag";

export interface Story {
  id: string;
  title: string;
  tags: string;
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
  const [tags, setTags] = useState("");
  const [stories, setStories] = useState<Story[]>(props.storiesFromServer);

  const router = useRouter();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      tags: "",
    },
    validate: {
      title: (value) =>
        value.length != 0
          ? value.length >= 4 && value.length <= 64
            ? null
            : "Your title needs to have between 4 and 64 characters"
          : "Your story should have a title",

      description: (value) =>
        value.length != 0
          ? value.length >= 64 && value.length <= 512
            ? null
            : "Your description needs to have between 64 and 512 characters"
          : "Your story should have a description",

      tags: (value) =>
        value.split(",").length >= 2 && value.split(",").length <= 5
          ? null
          : "Select between 2 and 5 tags",
    },
  });

  async function onSubmit() {
    console.log(form.values);
    const [error, data] = await post<Story>("http://localhost:8000/api/story", {
      ...form.values,
      tags,
    });

    form.validate();

    if (error && !data) {
      console.log(error);
    }

    setStories([
      ...stories,
      {
        id: Math.random().toString(),
        title: form.values.title,
        description: form.values.description,
        isPublished: false,
        tags: tags,
      },
    ]);
    form.reset();
    setIsOpened(false);
  }

  function onClickTag(newText: string) {
    if (tags.includes(newText)) {
      setTags((value) => value.replace(`,${newText}`, ""));
      return;
    }

    if (tags.length === 0) {
      setTags((value) => value + `${newText}`);
      return;
    }
    setTags((value) => value + `,${newText}`);
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
        <form onSubmit={onSubmit}>
          <TextInput label="Title" {...form.getInputProps("title")} size="md" />
          <Textarea
            label="Description"
            size="md"
            {...form.getInputProps("description")}
          />
          <Divider />
          <div>
            <Text>Select the up to five tags:</Text>

            {tags.split(",").length >= 2 &&
            tags.split(",").length <= 5 ? null : (
              <Text color="red" size="sm">
                Select between 2 and 5 tags
              </Text>
            )}

            <Container mt="lg">
              <ScrollArea style={{ height: 250 }}>
                <Group>
                  <Tag text="Fantasy" onClick={onClickTag} />
                  <Tag text="Sci-fi" onClick={onClickTag} />
                  <Tag text="Romance" onClick={onClickTag} />
                  <Tag text="Fictional History" onClick={onClickTag} />
                  <Tag text="Alternative History" onClick={onClickTag} />
                  <Tag text="Time Travel" onClick={onClickTag} />
                  <Tag text="Dystopia" onClick={onClickTag} />
                  <Tag text="Pulp" onClick={onClickTag} />
                  <Tag text="Space Opera" onClick={onClickTag} />
                  <Tag text="SteamPunk" onClick={onClickTag} />
                  <Tag text="CyberPunk" onClick={onClickTag} />
                  <Tag text="Biography" onClick={onClickTag} />
                </Group>
              </ScrollArea>
            </Container>
          </div>

          <Group position="right" mt="md">
            <Button type="submit" color="indigo">
              Create Story
            </Button>
          </Group>
        </form>
      </Modal>

      <Container>
        {stories.length > 0 ? (
          <Stack mt="lg" align="stretch" justify="center">
            {stories.map((story) => {
              return (
                <StoryCard
                  tags={story.tags}
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  description={story.description}
                  author={props.user.username}
                  isProfile={false}
                />
              );
            })}
          </Stack>
        ) : (
          <Center>
            <Text>You still haven't created any stories 😅</Text>
          </Center>
        )}
      </Container>
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
  if (error || !user) {
    return { redirect: { statusCode: 307, destination: "/" } };
  }
  const [nerror, stories] = await fetcherSSR<Story[]>(
    context.req,
    context.res,
    `http://localhost:8000/api/story/author/${user.id}`
  );

  if (nerror || !stories) {
    return { redirect: { statusCode: 307, destination: "/" } };
  }
  return {
    props: {
      user: user,
      storiesFromServer: stories,
    },
  };
}

export default MyStories;
