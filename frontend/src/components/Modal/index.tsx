import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

export default function Modal({children }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white px-2 py-8 rounded-lg shadow-lg z-10 w-full max-w-md ">
        {children}

      </div>
    </div>
  );
}
