import type { Meta, StoryObj } from "@storybook/react";
import { ArticlePreview } from "./articlePreview";

const meta: Meta<typeof ArticlePreview> = {
  component: ArticlePreview,
};

export default meta;

type Story = StoryObj<typeof ArticlePreview>;

export const Sample: Story = {
  args: {
    article: {
      slug: "sample-slug",
      title: "Sample Title",
      description: "sample description",
      body: "This is body.",
      tagList: ["foo", "bar"],
      createdAt: new Date(),
      updatedAt: new Date(),
      favorited: true,
      favoritesCount: 30,
      author: {
        image: "https://picsum.photos/200",
        username: "Foo Bar",
        bio: "sample bio",
        following: true,
      },
    },
  },
};
