import React from "react";
import './index.css';
interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Slider(props: SliderProps) {
  return <input type="range" {...props} />;
}
