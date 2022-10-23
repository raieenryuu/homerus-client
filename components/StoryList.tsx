import { Story } from "../types/interfaces";
import { Container } from "@mantine/core";
import StoryCard from "./StoryCard";

const StoryList = ({ stories }: { stories: Story[] }) => {
  return (
    <div style={{ marginTop: 10 }}>
      <StoryCard
        title="The Lord of The rings"
        description="Some dudes decide stealing a ring from a dark lord is a good idea and now they tried to make up some reasons for the deficiencies of their own minds"
        author="JRR Tolkien"
        id="mamas"
        isProfile={false}
      />
      <StoryCard
        title="The Lord of The rings"
        description="Some dudes decide stealing a ring from a dark lord is a good idea"
        author="JRR Tolkien"
        id="mamas"
        isProfile={false}
      />
      <StoryCard
        title="The Lord of The rings"
        description="Some dudes decide stealing a ring from a dark lord is a good idea"
        author="JRR Tolkien"
        id="mamas"
        isProfile={false}
      />
    </div>
  );
};

export default StoryList;
