'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../ui/Button';
import { IconContext } from 'react-icons';
import { HiXCircle } from 'react-icons/hi';

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function Modal({ children, isOpen, onClose, title }: ModalProps) {
  const [mounted, setMounted] = useState(isOpen);

  useEffect(() => setMounted(isOpen), [isOpen]);

  const closeModal = () => {
    setMounted(false);
    onClose();
  };

  return mounted
    ? createPortal(
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-[#070000bb] outline-none focus:outline-none">
          <section className="flex max-w-lg flex-col items-center justify-center gap-2 rounded-lg bg-[#182138] p-8 shadow-md">
            <Button onClick={closeModal} className="w-auto self-end border-0 py-0">
              <IconContext.Provider value={{ color: 'aliceblue', size: '1.5rem' }}>
                <HiXCircle />
              </IconContext.Provider>
            </Button>
            <h3 className="text-3xl">{title}</h3>
            {children}
          </section>
        </div>,
        document.body,
      )
    : null;
}
