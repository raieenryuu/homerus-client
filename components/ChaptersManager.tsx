import {
  Center,
  Container,
  Paper,
  Button,
  HoverCard,
  Text,
  TextInput,
} from "@mantine/core";
import { Table } from "@mantine/core";
import { useRouter } from "next/router";
import { deleteResource } from "../helpers/requests-helper";
import { useState } from "react";
import { Chapter } from "../types/interfaces";

interface ChaptersManagerProps {
  chapters: Chapter[];
}

const ChaptersManager = ({ chapters }: ChaptersManagerProps) => {
  const [stateChapters, setStateChapters] = useState<Chapter[]>(chapters);

  const [deleteForm, setDeleteForm] = useState("");

  async function handleChapterDelete(id: string) {
    if (deleteForm === "delete") {
      const [error, response] = await deleteResource<{ message: string }>(
        `/chapter/${id}`
      );
      if (!error) {
        chapters = chapters.filter((chapter) => chapter.id !== id);
        setStateChapters(chapters);
      }

      console.log(error?.response?.data.message);
    }
  }

  let rows = stateChapters.map((chapter) => (
    <tr key={chapter.id}>
      <td>{chapter.title}</td>
      <td>{chapter.description}</td>
      <td>{chapter.wordCount}</td>
      <td>
        <Button
          variant="subtle"
          onClick={() => router.push(`/chapter/${chapter.id}`)}
        >
          View
        </Button>
      </td>

      <td>
        <Button
          variant="subtle"
          color="green"
          onClick={() => router.push(`/chapter/edit/${chapter.id}`)}
        >
          Edit
        </Button>
      </td>
      <td>
        <HoverCard width={280} shadow="md">
          <form
            onClick={(e: any) => {
              e.preventDefault();
              handleChapterDelete(chapter.id);
            }}
          >
            <HoverCard.Target>
              <Button variant="subtle" color="red" type="submit">
                Delete
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm" color="red">
                Deleting will permanently delete the chapter from your story!
                Enter delete below to confirm the chapter deletion:
              </Text>
              <TextInput
                size="sm"
                placeholder="delete"
                onChange={(e: any) => {
                  e.preventDefault;
                  setDeleteForm(e.target.value);
                }}
              />
            </HoverCard.Dropdown>
          </form>
        </HoverCard>
      </td>
      <td>
        <Button variant="subtle" color="cyan">
          Publish
        </Button>
      </td>
    </tr>
  ));

  const router = useRouter();
  return (
    <>
      <Paper shadow="xl" style={{ minWidth: 300, minHeight: 400 }}>
        <Center>Chapters Manager</Center>

        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Short Description</th>
              <th>Word Count</th>
              <th>View your chapter</th>
              <th>Edit your chapter</th>
              <th>Delete your chapter</th>
              <th>Publish your chapter</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </Table>
        <Button variant="subtle">Add chapter +</Button>
      </Paper>
    </>
  );
};

export default ChaptersManager;
