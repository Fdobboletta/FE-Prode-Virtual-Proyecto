import { useState } from 'react';

type UseModalReturnType = {
  modalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
};

const useModal = (): UseModalReturnType => {
  const [modalOpen, setModalOpen] = useState(false);

  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

  return {
    modalOpen,
    onOpenModal,
    onCloseModal,
  };
};

export { useModal };
