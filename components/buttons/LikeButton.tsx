import { Button } from "@mantine/core";

import { IconThumbUp } from "@tabler/icons";

const LikeButton = () => {
  return (
    <Button variant="outline" radius="xl">
      <IconThumbUp size="24" /> Like
    </Button>
  );
};

export default LikeButton;
