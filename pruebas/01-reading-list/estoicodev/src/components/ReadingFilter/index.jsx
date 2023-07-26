import { FlagIcon } from '@heroicons/react/24/solid'
import { useBookAppContext } from '../../context/useBookApp'

function ReadingFilter() {
  const bookPriorities = ['P1', 'P2', 'P3']
  const { readingSelectedValue, setReadingSelectedValue } = useBookAppContext()

  const handleSelectChange = event => {
    setReadingSelectedValue(event.target.value)
  }

  const clearFilter = () => {
    setReadingSelectedValue('')
  }

  return (
    <div className="w-full order-1 flex relative mb-4">
      <label
        htmlFor="priorities"
        className="flex-shrink-0 z-10 inline-flex items-center justify-center py-2.5 pl-9 pr-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg focus:outline-none">
        <FlagIcon className="w-4 h-4 absolute left-5 minxs:left-3.5 top-3.5" />
        <span className="hidden minxs:inline-block">By priority</span>
      </label>
      <select
        id="priorities"
        value={readingSelectedValue}
        onChange={e => handleSelectChange(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 border-l-2 block w-full p-2.5 outline-none">
        <option value="">Select priority</option>
        {bookPriorities.map((priority, index) => (
          <option key={index} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      <button
        onClick={clearFilter}
        className="absolute -top-5 right-1 text-xs md:text-sm text-slate-500 hover:underline font-medium cursor-pointer">
        Clear
      </button>
    </div>
  )
}

export default ReadingFilter
