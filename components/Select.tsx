import { NativeSelect } from "@mantine/core";

import { Story } from "../pages/my-stories";

const Select = ({
  stories,
  props,
}: {
  stories: Story[];
  props: () => (value: string) => Object;
}) => {
  return (
    <NativeSelect
      {...props()}
      data={stories.map((story) => story.title)}
      placeholder="Pick one"
      label="Pick one of your stories to add your new chapter to"
      radius="lg"
      size="sm"
      withAsterisk
    />
  );
};

export default Select;
