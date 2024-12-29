import React from 'react';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'>
    <div className='p-6 rounded shadow-lg w-1/3 bg-background-light'>
      {children}
      <button
        className='absolute top-2 right-2 text-gray-500'
        onClick={onClose}
      >
        ×
      </button>
    </div>
  </div>
);
