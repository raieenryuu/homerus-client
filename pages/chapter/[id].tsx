import { Container, Group, Slider } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { fetcherSSR } from "../../helpers/request-helper-ssr";
import { TypographyStylesProvider } from "@mantine/core";

export interface Chapter {
  id: string;
  title: string;
  content: string;
  description: string;
}

const Chapter = ({ chapter }: { chapter: Chapter }) => {
  return (
    <div>
      <h1>Chapter page</h1>
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: `${chapter.content}` }} />
      </TypographyStylesProvider>
    </div>
  );
};

export default Chapter;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const chapterId = context.params?.id;

  const [error, chapter] = await fetcherSSR<Chapter>(
    context.req,
    context.res,
    `http://localhost:8000/api/chapter/${chapterId}`
  );

  console.log(chapter);

  if (error && !chapter) {
    return { redirect: { statusCode: 307, destination: "/" } };
  }

  return {
    props: {
      chapter: chapter,
    },
  };
}
