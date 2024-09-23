import { tempo } from '@staleread/tempo';

type ModalProps = {
  isOpen: boolean;
  close: (value: boolean) => void;
};

export function Modal({ isOpen, close }: ModalProps) {
  const template = `
  <div
    class="modal"
    style="display: {modalDisplay}"
    @click={close}
  >
    <div :if={isOpen} class="modal-dialog" @click={handleInsideClick}>
      <div class="modal-content">
        <#children/>
      </div>
    </div>
  </div>`;

  const attach = {
    isOpen,
    close,
    modalDisplay: isOpen ? 'block' : 'none',
    handleInsideClick: (e: Event) => e.stopPropagation(),
  };

  return { template, attach };
}
