import { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import Header from ".";

const meta = {
  title: "Components/Header",
  component: Header,
  decorators: [withRouter]
} satisfies Meta<typeof Header>;
export default meta;

type Story = StoryObj<typeof meta>;

export const HeaderDefault: Story = {};
