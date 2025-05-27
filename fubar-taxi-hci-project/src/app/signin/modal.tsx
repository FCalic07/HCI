// Modal.tsx
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[15000] backdrop-blur-sm bg-black/50 flex items-center justify-center">
      <div className="bg-gradient-to-r from-[#274240] to-[#23d4ef] p-6 rounded-lg max-w-[550px] w-[90%] text-white relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default modal;
