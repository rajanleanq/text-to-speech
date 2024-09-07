import React from "react";
import './index.css';
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export default function Button({
  props,
  children,
}: {
  props?: IButtonProps;
  children: React.ReactNode;
}) {
  return (
    <button {...props} className="button">
      {children}
    </button>
  );
}
