import React from "react";
import Button from "../../../components/ui/Button";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000]">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg w-full lg:w-4/6 shadow-lg p-4 lg:p-8 z-10 h-5/6">
        <div>
          <h1 className="text-3xl font-medium">{title}</h1>
        </div>
        <div className="h-5/6 overflow-y-scroll mt-4">{children}</div>
        <Button
          text="Close"
          onClick={onClose}
          className="mt-4 bg-danger px-4 py-2 rounded-lg text-white font-normal"
        />
      </div>
    </div>
  );
};

export default Modal;
