import { FlagIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { useBookAppContext } from '../../context/useBookApp'
import { useEffect, useState } from 'react'

function BookCard({ title, cover, type, priority }) {
  const { addToReadingList, deleteFromReadingList, readingList } = useBookAppContext()
  const [showDetails, setShowDetails] = useState(false)
  const [hoveredStylesButtonP1, setHoveredStylesButtonP1] = useState(false)
  const [hoveredStylesButtonP2, setHoveredStylesButtonP2] = useState(false)
  const [hoveredStylesButtonP3, setHoveredStylesButtonP3] = useState(false)
  const [disabledHoveredStyles, setDisabledHoveredStyles] = useState(false)
  const priorityStyles = {
    P1: 'text-red-600',
    P2: 'text-orange-400',
    P3: 'text-green-500'
  }

  useEffect(() => {
    readingList.find(item => item.book.title === title)
      ? setDisabledHoveredStyles(true)
      : setDisabledHoveredStyles(false)
  }, [readingList, title])

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }
  const handleMouseEnterP1 = () => {
    setHoveredStylesButtonP1(true)
  }
  const handleMouseLeaveP1 = () => {
    setHoveredStylesButtonP1(false)
  }
  const handleMouseEnterP2 = () => {
    setHoveredStylesButtonP2(true)
  }
  const handleMouseLeaveP2 = () => {
    setHoveredStylesButtonP2(false)
  }
  const handleMouseEnterP3 = () => {
    setHoveredStylesButtonP3(true)
  }
  const handleMouseLeaveP3 = () => {
    setHoveredStylesButtonP3(false)
  }

  const handleAddToReadingList = (title, priority) => {
    addToReadingList(title, priority)
    setDisabledHoveredStyles(true)
  }

  const readingCard = (
    <article className="w-full flex flex-col gap-y-1 items-start justify-center relative group">
      <img src={cover} alt={title} className="w-36 h-42 object-cover rounded-md" />
      <XCircleIcon
        className="h-10 w-10 text-gray-200 absolute -top-3 -right-3 cursor-pointer"
        onClick={() => deleteFromReadingList(title)}
      />
      <span className="absolute bottom-0 left-0 bg-gray-500 pt-4 pr-4 rounded-tr-full">
        <FlagIcon
          className={`relative left-1 -top-1.5 h-4 w-4 pointer-events-none ${priorityStyles[priority]}`}
        />
      </span>
    </article>
  )
  const availableCard = (
    <article
      className="w-48 flex flex-col gap-y-1 items-center justify-center relative group"
      onClick={() => handleShowDetails()}>
      <img src={cover} alt={title} className={`w-48 h-64 object-cover rounded-md`} />
      <div
        className={`${
          disabledHoveredStyles ? 'bg-opacity-60 pointer-events-none' : 'group-hover:bg-opacity-50'
        } absolute inset-0 rounded-md bg-gray-800 bg-opacity-0 transition-opacity duration-300 ease-in-out`}></div>
      <div
        className={`${
          disabledHoveredStyles ? 'hidden' : 'group-hover:opacity-100 opacity-0'
        } w-full px-8 sm:px-6 absolute inset-0 flex flex-col items-center justify-evenly transition-opacity duration-300 ease-in-out`}>
        <button
          className="w-full h-10 flex justify-center items-center px-6 py-2 bg-gray-400 hover:bg-gray-100 text-white hover:text-red-600 rounded"
          onMouseEnter={handleMouseEnterP1}
          onMouseLeave={handleMouseLeaveP1}
          onClick={() => handleAddToReadingList(title, 'P1')}>
          <FlagIcon
            className={`h-5 w-5 relative top-0.5 transform transition-transform duration-500 ease-in-out ${
              hoveredStylesButtonP1 ? 'scale-150' : ''
            }`}
          />
          {!hoveredStylesButtonP1 && <span className="ml-2 font-medium">P1</span>}
        </button>
        <button
          className="w-full h-10 flex justify-center items-center px-6 py-2 bg-gray-400 hover:bg-gray-100 text-white hover:text-orange-400 rounded"
          onMouseEnter={handleMouseEnterP2}
          onMouseLeave={handleMouseLeaveP2}
          onClick={() => handleAddToReadingList(title, 'P2')}>
          <FlagIcon
            className={`h-5 w-5 relative top-0.5 transition-transform duration-500 ease-in-out ${
              hoveredStylesButtonP2 ? 'scale-150' : ''
            }`}
          />
          {!hoveredStylesButtonP2 && <span className="ml-2 font-medium">P2</span>}
        </button>
        <button
          className="w-full h-10 flex justify-center items-center px-6 py-2 bg-gray-400 hover:bg-gray-100 text-white hover:text-green-500 rounded"
          onMouseEnter={handleMouseEnterP3}
          onMouseLeave={handleMouseLeaveP3}
          onClick={() => handleAddToReadingList(title, 'P3')}>
          <FlagIcon
            className={`h-5 w-5 relative top-0.5 transition-transform duration-500 ease-in-out ${
              hoveredStylesButtonP3 ? 'scale-150' : ''
            }`}
          />
          {!hoveredStylesButtonP3 && <span className="ml-2 font-medium">P3</span>}
        </button>
      </div>
    </article>
  )

  const card = type === 'readingList' ? readingCard : availableCard

  return card
}

export default BookCard
