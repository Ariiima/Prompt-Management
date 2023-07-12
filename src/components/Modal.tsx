import React, { MouseEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalName: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, modalName }) => {
  
  if (!isOpen) {
    return null;
  }

  const handleOutsideClick = (e: MouseEvent) => {
    onClose();
  }

  const handleContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" onClick={handleOutsideClick}>
      <div className="fixed inset-0 z-100 bg-black opacity-50"></div>
      <div className="relative z-200 w-[45%] max-w-md mx-auto my-6 bg-white border-0 rounded-lg shadow-lg animate-fade-in" onClick={handleContentClick}>
        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
          <div className="text-lg font-bold pt-2">{modalName}</div>
          <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 text-3xl leading-none font-semibold" onClick={onClose}>
            <span className="bg-transparent text-black h-6 w-6 text-2xl block">×</span>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
