import { Card, Title, Text, Box } from "@mantine/core";
import Link from "next/link";

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
  return (
    <Link href={`story/${id}`}>
      <a>
        <div>
          <Box
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              borderRadius: theme.radius.md,
              cursor: "pointer",
              maxWidth: 400,
            })}
          >
            <Card shadow="sm" p="xl" radius="md" withBorder>
              <Card.Section p="lg">
                <Title>{title}</Title>
                <Text size="sm" color="dimmed">
                  By: {author}
                </Text>
              </Card.Section>

              <Text size="md">{description}</Text>
            </Card>
          </Box>
        </div>
      </a>
    </Link>
  );
};

export default StoryCard;
