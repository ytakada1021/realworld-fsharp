import type { Meta, StoryObj } from "@storybook/react";
import { CommentForm } from "./commentForm";

const meta: Meta<typeof CommentForm> = {
  component: CommentForm,
};

export default meta;

type Story = StoryObj<typeof CommentForm>;

export const Sample: Story = {
  args: {
    authorImage: "https://picsum.photos/200",
  },
};
