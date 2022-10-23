import { useEffect, useState } from "react";
import RichTextEditor from "../components/RichText";
import { post } from "../helpers/requests-helper";
import {
  Box,
  Text,
  TextInput,
  Stack,
  Group,
  Button,
  Container,
} from "@mantine/core";
import Select from "../components/Select";
import { useForm } from "@mantine/form";
import { fetcher } from "../helpers/requests-helper";
import { useUser } from "../context/UserContext";
import { Story } from "./my-stories";
import { useRef } from "react";

let regex = /(<([^>]+)>)/gi;
const Write = () => {
  const [wordCount, setWordCount] = useState(0);

  const [stories, setStories] = useState<Story[]>([]);

  const { user } = useUser();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      content: "",
      storyId: "",
    },
    validate: {
      title: (value) =>
        value.length != 0
          ? value.length >= 4 && value.length <= 64
            ? null
            : "The title should contain between 4 and 64 characters"
          : "This should not be empty",
      description: (value) =>
        value.length != 0
          ? value.length >= 64 && value.length <= 256
            ? null
            : "The title should contain between 64 and 256 characters"
          : "This should not be empty",
      content: (value) =>
        value.length != 0 ? null : "You cannot create an empty chapter",

      storyId: (value) =>
        value.length != 0 ? null : "You need to add your chapter to a story",
    },
  });

  async function onSubmit(values: {
    storyId: string;
    content: string;
    description: string;
    title: string;
    wordCount: number;
  }) {
    const selectedStory = stories.find(
      (story) => story.title === form.values.storyId
    );

    if (selectedStory) {
      values.storyId = selectedStory.id;

      console.log(values);
      const response = await post("http://localhost:8000/api/chapter/", values);

      console.log(response);

      form.reset();
    }
  }

  async function getStories() {
    const [error, stories] = await fetcher<Story[]>(
      `http://localhost:8000/api/story/author/${user?.id}`
    );

    if (stories) {
      setStories(stories);
    }
  }

  useEffect(() => {
    if (stories.length == 0) {
      getStories();
    }
  });

  return (
    <Container mt="xl">
      <form
        onSubmit={form.onSubmit(() => onSubmit({ ...form.values, wordCount }))}
      >
        <Group grow>
          <Stack>
            <TextInput
              label="Title of Chapter"
              placeholder="Enter the title of your chapter"
              {...form.getInputProps("title")}
            />

            <TextInput
              label="Chapter description"
              placeholder="A short sinopsis of your chapter"
              {...form.getInputProps("description")}
            />
          </Stack>

          <Stack>
            <Select
              props={() => form.getInputProps("storyId")}
              stories={stories}
            />
            <Container>
              <Button type="submit" radius="xl" size="md" color="indigo">
                Create
              </Button>
            </Container>
          </Stack>
        </Group>

        <Group>
          <Text size="md" mt="md">
            Word Count: {wordCount}
          </Text>

          <Text size="sm" mt="md" color="dimmed ">
            Your chapter must have at least 512 words in order for it to be
            published - you can still save it to work on it latter though
          </Text>
        </Group>

        <RichTextEditor
          {...form.getInputProps("content")}
          mt="md"
          value={form.values.content}
          onChange={(value) => {
            form.setFieldValue("content", value);

            let otherline = value.split("</p><p>").length;

            console.log(
              value
                .replace(regex, "")
                .trim()
                .split(" ")
                .filter((item) => item != "")
            );
            setWordCount(
              value.replace(regex, "").trim().split(" ").length - 1 + otherline
            );
          }}
          style={{
            minHeight: "780px",
          }}
          controls={[["italic", "underline", "bold", "h1", "h2", "h3"]]}
        />
      </form>
    </Container>
  );
};

export default Write;
