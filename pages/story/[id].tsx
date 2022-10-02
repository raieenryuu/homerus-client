import { Container, Group } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import ChapterCard from "../../components/ChapterCards";
import { fetcherSSR } from "../../helpers/request-helper-ssr";

export interface Chapter {
  id: string;
  title: string;
  description: string;
  story: {
    author: {
      username: string;
    };
  };
}

const Story = ({ chapters }: { chapters: Chapter[] }) => {
  return (
    <div>
      <Container>
        <h1>Chapters</h1>
        <div>
          <Group>
            {chapters.map((chapter) => {
              return (
                <ChapterCard
                  id={chapter.id}
                  key={chapter.id}
                  title={chapter.title}
                  author={chapter.story.author.username}
                  description={chapter.description}
                />
              );
            })}
          </Group>
        </div>
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

  return {
    props: {
      chapters: chapters,
    },
  };
}
