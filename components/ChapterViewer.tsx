import { Center, Container, TypographyStylesProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetcher } from "../helpers/requests-helper";
import { Chapter } from "../types/interfaces";

interface ChapterViewerProps {
  chapterId: string;
}

const ChapterViewer = ({ chapterId }: ChapterViewerProps) => {
  const [content, setContent] = useState("");

  async function getChapter() {
    const [error, chapter] = await fetcher<Chapter>(`/chapter/${chapterId}`);

    if (chapter && !error) {
      setContent(chapter.content);
    }
  }

  useEffect(() => {
    getChapter();
  }, [chapterId]);

  return (
    <div>
      <Container>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </TypographyStylesProvider>
      </Container>
    </div>
  );
};

export default ChapterViewer;
