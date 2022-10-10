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

const initialValue = "<p>Write your story here</p>";
const Write = () => {
  const [value, onChange] = useState(initialValue);

  const [stories, setStories] = useState<Story[]>([]);

  const [selectValue, setSelectValue] = useState<string>();

  const ref = useRef<HTMLSelectElement>(null);

  const { user } = useUser();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      content: "",
      storyId: "",
    },
    validate: {
      title: (value) => (value.length != 0 ? null : "This should not be empty"),
      description: (value) =>
        value.length != 0 ? null : "This should not be empty",
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
      <form onSubmit={form.onSubmit(() => onSubmit(form.values))}>
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

        <RichTextEditor
          {...form.getInputProps("content")}
          mt="md"
          value={form.values.content}
          onChange={(value) => {
            form.setFieldValue("content", value);
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
