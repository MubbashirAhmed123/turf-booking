import React from 'react'

function Pagination({handlePageChange,currentPage,totalPage}) {
  return (
    <div className="flex justify-center mt-4">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-800 text-white'}`}
    >
      Previous
    </button>
    {Array.from({ length: totalPage }, (_, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(index + 1)}
        className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPage}
      className={`px-4 py-2 mx-1 rounded ${currentPage === totalPage ? 'bg-gray-300' : 'bg-gray-800 text-white'}`}
    >
      Next
    </button>
  </div>
  )
}

export default Pagination