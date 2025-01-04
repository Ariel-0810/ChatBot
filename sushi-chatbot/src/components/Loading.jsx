import React, { useState, useEffect } from 'react'

const Loading = ({ message = 'Cargando...', minDisplayTime = 2000 }) => {
    const [show, setShow] = useState(true)
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShow(false)
      }, minDisplayTime)
  
      return () => clearTimeout(timer)
    }, [minDisplayTime])
  
    if (!show) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500 mb-4"></div>
        <p className="text-gray-700 text-lg font-semibold">{message}</p>
      </div>
    </div>
  )
}

export default Loading