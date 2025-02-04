import React from 'react'

function HamburgerMenu({ isOpen, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="fixed top-4 left-4 z-[60] lg:hidden text-white p-2 rounded-md hover:bg-gray-800"
      aria-label="Toggle Sidebar"
    >
      <div className="w-6 h-5 flex flex-col justify-between relative">
        <span 
          className={`
            block h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out
            ${isOpen ? 'rotate-45 translate-y-2' : ''}
          `}
        />
        <span 
          className={`
            block h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}
        />
        <span 
          className={`
            block h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out
            ${isOpen ? '-rotate-45 -translate-y-2' : ''}
          `}
        />
      </div>
    </button>
  )
}

export default HamburgerMenu 