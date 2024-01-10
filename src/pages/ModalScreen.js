import React from 'react'

export const ModalScreen = ({handleCloseClick, children}) => {
  
  return (
  <div className="h-1/2 w-1/2 fixed flex flex-col items-center justify-center rounded-2xl bg-[#FFDCD8]/90 text-[#0D0708] p-10 top-0">
    <button type="button" onClick={handleCloseClick}>Close</button>
      {children}
  </div>
  )
}