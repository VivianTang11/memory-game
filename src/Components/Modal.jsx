import React from 'react'
import Button from './Button'

export default function Modal({shuffleCards, children}) {
  return (
    <div className='modal'>
      <div className="modal-content">
        <h2>{children}</h2>
        <Button onClick={shuffleCards} className='playagain-btn'>Play again</Button>
      </div>
    </div>
  )
}
