import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";

const meta: Meta<typeof Header> = {
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Authenticated: Story = {
  args: {
    authUser: {
      username: "Foo Bar",
      image: "https://picsum.photos/200",
      email: "sample@example.com",
      bio: "Sample bio",
      token: "##########",
    },
  },
};

export const Unauthenticated: Story = {
  args: {},
};
