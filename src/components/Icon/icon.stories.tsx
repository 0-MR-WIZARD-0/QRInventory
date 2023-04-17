import { Meta, StoryObj } from "@storybook/react";
import Icon from ".";

const meta = {
  title: "Components/Icon",
  component: Icon,
  decorators: [story => <div style={{ display: "flex", backgroundColor: "red" }}>{story()}</div>]
} satisfies Meta<typeof Icon>;
export default meta;

type Story = StoryObj<typeof meta>;

export const IconLogo: Story = {
  args: {
    icon: "logo",
    height: 50,
    width: 50
  }
};
