import {
  Center,
  Container,
  HoverCard,
  Text,
  Title,
  List,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { fetcherSSR } from "../../../helpers/request-helper-ssr";
import { useState } from "react";
import { Chapter, Story } from "../../../types/interfaces";
import ChapterViewer from "../../../components/ChapterViewer";
import DownloadButton from "../../../components/buttons/DownloadButton";
import BookmarkButton from "../../../components/buttons/BookmarkButton";
import LikeButton from "../../../components/buttons/LikeButton";
import { IconArchive, IconArrowRight, IconArrowLeft } from "@tabler/icons";

const Chapter = ({ chapters }: { chapters: Chapter[] }) => {
  const [selectedChapter, setSelectedChapter] = useState<{
    title: string;
    description: string;
    id: string;
  }>(chapters[0]);
  return (
    <div style={{ marginTop: 50 }}>
      <Container>
        <div>
          <Title>{selectedChapter.title}</Title>
          <Text size="sm" color="dimmed">
            {selectedChapter.description}
          </Text>
        </div>
        <Group position="apart" mt="md">
          <Group>
            <DownloadButton />
            <BookmarkButton />
            <LikeButton />
          </Group>

          <HoverCard width={280} shadow="md">
            <HoverCard.Target>
              <Button variant="subtle">
                <IconArchive /> Index
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Stack>
                {chapters.map((chapter) => (
                  <Button
                    onClick={() => {
                      setSelectedChapter({
                        id: chapter.id,
                        title: chapter.title,
                        description: chapter.description,
                      });
                    }}
                    variant="subtle"
                  >
                    {chapter.title}
                  </Button>
                ))}
              </Stack>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Container>

      <Center mt="xl">
        <ChapterViewer chapterId={selectedChapter.id} />
      </Center>

      <Container>
        <Group position="right">
          <IconArrowLeft />
          <IconArrowRight />
        </Group>
      </Container>
    </div>
  );
};

export default Chapter;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const storyId = context.params?.id;

  const [error, story] = await fetcherSSR<Story>(
    context.req,
    context.res,
    `http://localhost:8000/api/story/${storyId}`
  );

  if (error && !story) {
    return { redirect: { statusCode: 307, destination: "/" } };
  }

  return {
    props: {
      chapters: story?.chapters,
    },
  };
}
