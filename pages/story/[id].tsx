import { Center, Container, Group, Text } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import ChapterCard from "../../components/ChapterCards";
import { fetcherSSR } from "../../helpers/request-helper-ssr";
import { Title } from "@mantine/core";
import { Chapter } from "../../types/interfaces";
import { Story } from "../../types/interfaces";
import ChaptersManager from "../../components/ChaptersManager";
const Story = ({ chapters, story }: { chapters: Chapter[]; story: Story }) => {
  return (
    <div>
      <Container mt="xs">
        <Center>
          <Title color="dark">{story.title}</Title>
        </Center>

        <Center>
          <Text>{story.description}</Text>
        </Center>
        <Container mt="xl">
          <ChaptersManager chapters={chapters} />
        </Container>
      </Container>
    </div>
  );
};

export default Story;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const storyId = context.params?.id;

  const [error, chapters] = await fetcherSSR<Chapter[]>(
    context.req,
    context.res,
    `http://localhost:8000/api/chapter/story/${storyId}`
  );

  if (error && !chapters) {
    return { redirect: { statusCode: 307, destination: "/" } };
  }

  const [err, story] = await fetcherSSR<Story>(
    context.req,
    context.res,
    `http://localhost:8000/api/story/${storyId}`
  );

  if (error && !story) {
    return { redirect: { statusCode: 307, destination: "/" } };
  }

  return {
    props: {
      chapters: chapters,
      story: story,
    },
  };
}
