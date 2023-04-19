import { Meta, StoryObj } from "@storybook/react";
import { cloneElement, useRef, useState } from "react";
import Modal from "react-modal";
import { ResolverCallback, Scenario } from ".";

Modal.setAppElement("#storybook-root");

const MockWrapper: React.FC<{ story: any }> = ({ story }) => {
  const modalRef = useRef<React.ElementRef<typeof Scenario>>(null);
  const component = story();

  return (
    <div>
      <button onClick={() => modalRef.current?.createModal()}>open scenario</button>
      {cloneElement(component, { ref: modalRef })}
    </div>
  );
};

const meta = {
  title: "Components/Scenario",
  component: Scenario,
  decorators: [story => <MockWrapper story={story} />]
} satisfies Meta<typeof Scenario>;
export default meta;

type Story = StoryObj<typeof meta>;

const PasswordConfirmationPage: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");

  const idkFunc = async (pass1: string, pass2: string) => {
    return pass1 === pass2;
  };

  return (
    <div>
      <input value={input1} onChange={e => setInput1(e.target.value)} />
      <input value={input2} onChange={e => setInput2(e.target.value)} />
      <button onClick={() => cb(idkFunc(input1, input2))}>отправить</button>
    </div>
  );
};

const SuccessPage: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  return (
    <div>
      <span>Пароли сходятся</span>
      <button onClick={() => cb(Promise.resolve(true))}>на главную</button>
    </div>
  );
};

export const SchenarioDefault: Story = {
  args: {
    modalName: "PasswordConfirmation",
    script: {
      0: {
        content: PasswordConfirmationPage,
        onSuccess: 1,
        onFailure: -1
      },
      1: {
        content: SuccessPage,
        onSuccess: -1,
        onFailure: -1
      }
    }
  }
};
