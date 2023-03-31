import React from 'react'

export default function ButtonComponent({
    title,
    onClick,
    style,
    disabled,
    dataTestid
}) {
  return (
    <button 
        onClick={onClick} 
        disabled={disabled}
        className={`w-full py-2 font-semibold border-none rounded-md text-sm bg-[#f52421] hover:bg-[#ef3b39] text-white ${style} ${disabled ? "bg-[#ef3b39]" : ""}`}
        data-testid={dataTestid}
    >
        {title || 'Enter a title'}
    </button>
  )
}
