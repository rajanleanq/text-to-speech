import React from 'react'
import './index.css'
interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{}
export default function Select({children, ...props}: ISelectProps) {
  return (
    <select {...props} className='select'>{children}</select>
  )
}
