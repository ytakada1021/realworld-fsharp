import type { Meta, StoryObj } from "@storybook/react";
import { CommentCard } from "./commentCard";

const meta: Meta<typeof CommentCard> = {
  component: CommentCard,
};

export default meta;

type Story = StoryObj<typeof CommentCard>;

export const Sample: Story = {
  args: {
    comment: {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      body: "Sample comment.",
      author: {
        image: "https://picsum.photos/200",
        username: "Foo Bar",
        bio: "sample bio",
        following: true,
      },
    },
    showTrash: true,
  },
};
