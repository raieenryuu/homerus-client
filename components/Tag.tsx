import { Badge } from "@mantine/core";
import { useState } from "react";

interface TagProps {
  text: string;
  onClick: (newText: string) => void;
}

const Tag = (props: TagProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <Badge
      style={{ cursor: "pointer" }}
      variant={isSelected ? "filled" : "outline"}
      onClick={() => {
        props.onClick(props.text);
        setIsSelected((value) => !value);
      }}
    >
      {props.text}
    </Badge>
  );
};

export default Tag;
