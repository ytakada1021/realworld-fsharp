import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const SampleButton: Story = {
  args: {
    component: "button",
    children: "Button",
    size: "lg",
    color: "primary",
    variant: "filled",
  },
};

export const SampleAnchor: Story = {
  args: {
    component: "a",
    href: "#",
    children: "Anchor",
    size: "lg",
    color: "primary",
    variant: "filled",
  },
};
