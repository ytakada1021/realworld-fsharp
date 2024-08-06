import type { Meta, StoryObj } from "@storybook/react";
import { Pagination, PaginationItem } from "./pagination";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Sample: Story = {
  render: () => (
    <Pagination>
      <PaginationItem active={true} href="#">
        1
      </PaginationItem>
      <PaginationItem href="#">2</PaginationItem>
      <PaginationItem href="#">3</PaginationItem>
    </Pagination>
  ),
};
