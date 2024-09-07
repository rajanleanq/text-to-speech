import React from "react";
import "./index.css";
interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function TextArea(props: InputProps) {
  return <textarea {...props} className="input" />;
}
