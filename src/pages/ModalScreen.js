import React from 'react'

export const ModalScreen = ({handleCloseClick, children}) => {
  
  return (
  <div className="h-3/4 w-3/4 fixed flex flex-col items-center justify-center rounded-2xl bg-[#FFDCD8]/90 text-[#0D0708] p-4 top-[12.5%] left-[12.5%]">
    <button type="button" onClick={handleCloseClick}>Close</button>
      {children}
  </div>
  )
}