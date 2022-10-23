import RichTextEditor from "../../../components/RichText";
import { post, put } from "../../../helpers/requests-helper";
import {
  TextInput,
  Stack,
  Group,
  Button,
  Container,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Chapter, Story } from "../../../types/interfaces";
import { GetServerSidePropsContext } from "next";
import { fetcherSSR } from "../../../helpers/request-helper-ssr";
import { useState } from "react";

let regex = /(<([^>]+)>)/gi;

const EditChapter = ({ chapter }: { chapter: Chapter }) => {
  const [wordCount, setWordCount] = useState(chapter.wordCount);
  const form = useForm({
    initialValues: {
      title: chapter.title,
      description: chapter.description,
      content: chapter.content,
    },
    validate: {
      title: (value) => (value.length != 0 ? null : "This should not be empty"),
      description: (value) =>
        value.length != 0 ? null : "This should not be empty",
      content: (value) =>
        value.length != 0 ? null : "You cannot create an empty chapter",
    },
  });

  async function onSubmit() {
    // console.log(response);

    const [error, response] = await put(`/chapter/${chapter.id}`, {
      ...form.values,
      wordCount,
    });

    console.log(response);

    if (error) {
      console.log(error);
    }
  }

  return (
    <Container mt="xl">
      <form onSubmit={form.onSubmit(() => onSubmit())}>
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
        </Group>

        <Button mt="xl" type="submit" radius="xl" size="sm" color="indigo">
          Update
        </Button>

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const chapterId = context.params?.id;

  const [error, chapter] = await fetcherSSR<Chapter>(
    context.req,
    context.res,
    `http://localhost:8000/api/chapter/${chapterId}`
  );

  if (error && !chapter) {
    return { redirect: { statusCode: 307, destination: "/" } };
  }

  return {
    props: {
      chapter: chapter,
    },
  };
}

export default EditChapter;
