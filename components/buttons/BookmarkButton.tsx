import { Button } from "@mantine/core";
import { IconBookmark } from "@tabler/icons";

const BookmarkButton = () => {
  return (
    <Button variant="outline" radius="xl">
      <IconBookmark size="24" /> Bookmark
    </Button>
  );
};

export default BookmarkButton;
