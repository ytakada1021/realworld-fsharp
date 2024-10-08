import type { Meta, StoryObj } from "@storybook/react";
import { ErrorMessage } from "./errorMessage";

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage,
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Sample: Story = {
  args: {
    errors: ["Email is required.", "Password is required."],
  },
};
