import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons";

const DownloadButton = () => {
  return (
    <Button variant="outline" radius="xl">
      <IconDownload size="24" /> Download
    </Button>
  );
};

export default DownloadButton;
