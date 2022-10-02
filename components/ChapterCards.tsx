import { Card, Title, Text, Box, Button, Group, Menu } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons";
import Link from "next/link";

const ChapterCard = ({
  id,
  title,
  description,
  author,
}: {
  id: string;
  title: string;
  description: string;
  author: string;
}) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        borderRadius: theme.radius.md,
        maxWidth: 400,
        minWidth: 300,
      })}
    >
      <Card shadow="sm" p="xl" radius="md" withBorder>
        <Card.Section p="lg">
          <Group position="apart">
            <div>
              <Link href={`/chapter/${id}`}>
                <a style={{ textDecoration: "none" }}>
                  <Text color="indigo" size="xl">
                    {title}
                  </Text>
                </a>
              </Link>

              <Text size="sm" color="dimmed">
                By: {author}
              </Text>
            </div>

            <Button
              size="xs"
              style={{
                maxWidth: 30,
              }}
              radius="xl"
            >
              Open Drawer
            </Button>
          </Group>
        </Card.Section>

        <Text size="md">{description}</Text>
      </Card>
    </Box>
  );
};

export default ChapterCard;
