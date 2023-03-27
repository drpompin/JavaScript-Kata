import React from 'react'

export default function ButtonComponent({
    title,
    onClick,
    style
}) {
  return (
    <button 
        onClick={onClick} 
        className={`w-full py-2 font-semibold border-none rounded-md text-sm bg-[#f52421] hover:bg-[#ef3b39] text-white ${style}`}
    >
        {title || 'Submit'}
    </button>
  )
}
