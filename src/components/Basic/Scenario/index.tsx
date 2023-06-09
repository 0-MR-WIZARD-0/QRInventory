import { createElement, forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";
import styles from "./scenario.module.scss";

type ScriptParam = {
  content: any;
  onSuccess: number;
  onFailure: number;
  props?: any;
};

export type Script = {
  [page: number]: ScriptParam;
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
    <Modal className={styles.wrapper} isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} contentLabel={modalName}>
      {createElement(script[page].content, { ...script[page].props, cb: resolveCallback })}
    </Modal>
  );
});

Scenario.displayName = "Scenario";
