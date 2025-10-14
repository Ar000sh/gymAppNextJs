import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const NormalButton = ({ children, onClick }: Props) => {
  return (
    <button
      className="bg-gray-600  rounded-md px-10 py-2 text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default NormalButton;
