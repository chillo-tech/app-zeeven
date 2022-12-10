import React from 'react'

function Tablist() {
  const handleItemClick = () => {

  }
  return (
    <ul className="hidden text-md font-medium text-center text-gray-500 divide-x divide-gray-200 shadow sm:flex">
      <li className="w-full">
          <button type='button' value="0" onClick={handleItemClick} className="inline-block p-4 w-full text-gray-900 bg-gray-100 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Programme</button>
      </li>
      <li className="w-full">
          <button type='button' value="1" onClick={handleItemClick} className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Invités</button>
      </li>
      <li className="w-full">
          <button type='button' value="2" onClick={handleItemClick} className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Statistisques</button>
      </li>
  </ul>
  )
}

export default Tablist