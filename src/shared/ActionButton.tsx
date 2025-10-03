import React from "react";
import { SelectedPage } from "./types";

type Props = {
  children: React.ReactNode;
  targetPage?: SelectedPage;
  setSelectedPage?: (value: SelectedPage) => void;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};


const ActionButton = ({ children, setSelectedPage, targetPage, onClick }: Props) => {

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    console.log("handleClick of action button was called")
    onClick?.(e);
    setSelectedPage?.(
      targetPage ? 
      targetPage :
      SelectedPage.ContactUs
    ) 
  };
  
  return (
    {/*<AnchorLink
      className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
      onClick={handleClick}
      href={`#${SelectedPage.ContactUs}`}
    >
      {children}
    </AnchorLink> */}
  );
};

export default ActionButton;
