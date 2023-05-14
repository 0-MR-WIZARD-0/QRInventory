import { createElement, forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";
import styles from "./scenario.module.scss";

export type Script = {
  [page: number]: {
    content: any;
    onSuccess: number;
    onFailure: number;
  };
};

type ScenarioModalHandle = {
  createModal: () => void;
  closeModal: () => void;
  // setPage: (n: number) => void;
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
    // setPage
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
    <Modal className={styles.wrapper} isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} contentLabel={modalName}>
      {createElement(script[page].content, { cb: resolveCallback })}
    </Modal>
  );
});

Scenario.displayName = "Scenario";

// export default 