import { createElement, forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal"

type Script = {
  [page: number]: {
    content: any;
    onSuccess: number;
    onFailure: number;
  };
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

type ScenarioModalHandle = {
  createModal: () => void;
  closeModal: () => void;
};

type ScenarioProps = {
  modalName: string;
  script: Script;
};

export type ResolverCallback = (promise: Promise<any>) => void;

export const Scenario = forwardRef<ScenarioModalHandle, ScenarioProps>(({ modalName, script }, ref) => {
  const [page, setPage] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  const createModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    createModal,
    closeModal
  }));

  const resolveCallback: ResolverCallback = async (promise: Promise<Boolean>) => {
    const response = await promise;
    const currentPage = script[page];

    if (response === true) {
      if (currentPage.onSuccess === -1) {
        setIsOpen(false);
        setPage(0);
      } else setPage(script[page].onSuccess);
    } else {
      if (currentPage.onFailure === -1) {
        setIsOpen(false);
        setPage(0);
      } else setPage(script[page].onFailure);
    }
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} contentLabel={modalName}>
      <div>{createElement(script[page].content, { cb: resolveCallback })}</div>
      {/* <p>sad</p> */}
    </Modal>
  );
});

Scenario.displayName = "Scenario";
