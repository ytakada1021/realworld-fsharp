import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";

const meta: Meta<typeof Header> = {
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
    activeMenu: "home",
    profile: {
      username: "Foo Bar",
      image: "https://picsum.photos/200",
    },
  },
};

export const Unauthenticated: Story = {
  args: {
    isAuthenticated: false,
    activeMenu: "home",
  },
};
