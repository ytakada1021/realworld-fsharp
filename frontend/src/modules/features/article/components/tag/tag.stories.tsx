import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./tag";

const meta: Meta<typeof Tag> = {
  component: Tag,
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Sample: Story = {
  args: {
    as: "span",
    variant: "filled",
    children: "Tag",
  },
};
