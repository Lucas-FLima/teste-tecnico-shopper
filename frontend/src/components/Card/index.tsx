import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  titulo: string;
  descricao: string;
}

export default function Card({children, titulo, descricao}: CardProps) {
  return (
    <>
      <div className="p-5 w-[900px] shadow-xl rounded-2xl">
        <div className="text-green_shooper flex flex-col">
          <h2 className="font-semibold text-3xl">{titulo}</h2>
          <span className="font-2xl">{descricao}</span>
          {children}
        </div>
      </div>
    </>
  );
}
