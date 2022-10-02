import {
  Card,
  Title,
  Text,
  Box,
  Group,
  Button,
  Divider,
  Modal,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { deleteResource, post, put } from "../helpers/requests-helper";

const StoryCard = ({
  title,
  description,
  author,
  id,
}: {
  title: string;
  description: string;
  author: string;
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isWarning, setIsWarning] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      title: title,
      description: description,
    },
  });

  async function handlePublish(id: string) {
    const [error, data] = await put(`http://localhost:8000/api/story/${id}`, {
      isPublished: true,
    });

    console.log(data);
  }

  async function handleDelete(id: string) {
    const [error, data] = await deleteResource(`/story/${id}`);

    if (error) {
      console.log(error);
    }
    console.log(data);
  }

  async function onSubmit() {
    const values = form.values;

    const response = await put(`http://localhost:8000/api/story/${id}`, values);

    console.log(response);
  }

  return (
    <div>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          borderRadius: theme.radius.md,
        })}
      >
        <Card shadow="sm" p="xl" radius="md" withBorder>
          <Card.Section p="lg">
            <Group position="apart">
              <div>
                <Link href={`story/${id}`}>
                  <a style={{ textDecoration: "none" }}>
                    <Title size="lg" color={"indigo"}>
                      {title}
                    </Title>
                  </a>
                </Link>

                <Text size="sm" color="dimmed">
                  By: {author}
                </Text>
              </div>
              <Button radius="xl" variant="subtle" size="xs">
                <IoIosArrowDropdown size={30} onClick={() => setIsOpen(true)} />
              </Button>

              <Modal
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                title="Story Settings"
              >
                <Group noWrap>
                  <Button color="red" onClick={() => setIsWarning(true)}>
                    Delete story
                  </Button>
                  <Text size="xs" color="dimmed">
                    This will permanently delete the story and all its chapters
                  </Text>
                </Group>

                {isWarning && (
                  <div>
                    <Text color="red" size="xs">
                      Are you sure you want to delete?
                    </Text>
                    <form onSubmit={() => handleDelete(id)}>
                      <TextInput
                        style={{
                          outlineColor: "red",
                        }}
                        placeholder="type 'delete' and press enter to confirm"
                        size="xs"
                      />
                      <Button type="submit" variant="subtle" hidden></Button>
                    </form>
                  </div>
                )}

                <Divider my="sm" variant="dashed" />

                <Group noWrap>
                  <Button onClick={() => handlePublish(id)} color="cyan">
                    Publish story
                  </Button>
                  <Text size="xs" color="dimmed">
                    This will make the story and all its chapters public
                  </Text>
                </Group>

                <Divider my="sm" variant="solid" />
                <Text>Update Story</Text>
                <form onSubmit={form.onSubmit(() => onSubmit())}>
                  <TextInput
                    {...form.getInputProps("title")}
                    label="New Title"
                  />

                  <TextInput
                    {...form.getInputProps("description")}
                    label="New Description"
                  />
                  <Button type="submit" mt="md">
                    Send Update
                  </Button>
                </form>
              </Modal>
            </Group>
          </Card.Section>

          <Text size="md">{description}</Text>
        </Card>
      </Box>
    </div>
  );
};

export default StoryCard;
