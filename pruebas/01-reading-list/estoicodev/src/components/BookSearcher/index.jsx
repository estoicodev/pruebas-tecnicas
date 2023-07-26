import { useBookAppContext } from '../../context/useBookApp'
import { useState } from 'react'
import { UserIcon, BookOpenIcon } from '@heroicons/react/24/solid'

function BookSearcher() {
  const {
    setFilterText,
    filterText,
    bookGenres,
    bookAuthors,
    filterBy,
    setFilterBy,
    selectedValue,
    setSelectedValue
  } = useBookAppContext()
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  const chooseFilter = filterBy => {
    setFilterBy(filterBy)
    setIsFilterMenuOpen(false)
    setSelectedValue('')
    setFilterText('')
  }

  const handleSelectChange = event => {
    setSelectedValue(event.target.value)
    setFilterText('')
  }

  const clearFilter = () => {
    setFilterText('')
    setSelectedValue('')
  }

  return (
    <div className="flex flex-col gap-y-4 lg:grid lg:grid-cols-5 gap-x-4 items-center mb-4">
      <input
        placeholder="Search by title"
        type="search"
        value={filterText}
        onChange={e => {
          setFilterText(e.target.value)
          console.log(e.target.value)
        }}
        className="w-full order-2 lg:order-1 lg:col-span-3 px-3 text-base text-slate-800 outline-0 h-10 bg-slate-100"
      />
      <div className="w-full order-1 lg:order-2 flex lg:col-span-2 relative">
        <button
          type="button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
          By {filterBy}
        </button>
        <div
          className={`z-10 ${
            isFilterMenuOpen ? 'absolute' : 'hidden'
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 top-11`}>
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="genres-button">
            <li className="flex relative">
              <BookOpenIcon className="w-4 h-4 absolute left-2.5 top-2.5" />
              <button
                type="button"
                className="inline-flex w-full pl-9 pr-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => chooseFilter('genre')}>
                <div className="inline-flex items-center">By genre</div>
              </button>
            </li>
            <li className="flex relative">
              <UserIcon className="w-4 h-4 absolute left-2.5 top-2.5" />
              <button
                type="button"
                className="inline-flex w-full pl-9 pr-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => chooseFilter('author')}>
                <div className="inline-flex items-center">By author</div>
              </button>
            </li>
          </ul>
        </div>
        <select
          value={selectedValue}
          onChange={e => handleSelectChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="">Select {filterBy}</option>
          {filterBy === 'genre' &&
            bookGenres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          {filterBy === 'author' &&
            bookAuthors.map((author, index) => (
              <option key={index} value={author}>
                {author}
              </option>
            ))}
        </select>
        <button
          onClick={clearFilter}
          className="absolute -top-5 right-1 text-xs md:text-sm text-slate-500 hover:underline font-medium cursor-pointer">
          Clear filter
        </button>
      </div>
    </div>
  )
}

export default BookSearcher
