import { Card, Title, Text, Group, Button, Menu, Badge } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";
import { deleteResource, post, put } from "../helpers/requests-helper";
import LikeButton from "./buttons/LikeButton";
import DownloadButton from "./buttons/DownloadButton";
import {
  IconDots,
  IconDownload,
  IconBookmark,
  IconMessageCircle,
  IconShare,
  IconSearch,
  IconPhoto,
  IconArrowsLeftRight,
  IconTrash,
} from "@tabler/icons";

const StoryCard = ({
  title,
  description,
  author,
  id,
  isProfile,
}: {
  title: string;
  description: string;
  author: string;
  id: string;
  isProfile: boolean;
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

          <div>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="white">
                  <IconDots color="black" />
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item icon={<IconBookmark size={20} />}>
                  Bookmark
                </Menu.Item>
                <Menu.Item icon={<IconDownload size={20} />}>
                  Download
                </Menu.Item>
                <Menu.Item icon={<IconShare />}>Share</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </Group>
      </Card.Section>

      <Text size="sm" mb="xl">
        {description}
      </Text>
      <Group position="apart">
        <Group>
          <Badge size="sm">Adventure</Badge>
          <Badge size="sm">Adventure</Badge>
          <Badge size="sm">Adventure</Badge>
          <Badge size="sm">Adventure</Badge>
        </Group>

        <Group>
          <Text size="xs">Word Count: 100.000</Text>
          <Text size="xs">Chapters: 20</Text>
          <LikeButton />
        </Group>
      </Group>
    </Card>
  );
};

export default StoryCard;
