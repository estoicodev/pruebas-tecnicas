import { createContext, useState, useEffect, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'

const BookAppContext = createContext()

const BookAppProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const { item: readingList, saveItem: setReadingList } = useLocalStorage('readingList', [])
  const [readingFilteredData, setReadingFilteredData] = useState([])
  const [countBookList, setCountBookList] = useState(0)
  const [countReadingList, setCountReadingList] = useState(0)
  const [bookGenres, setBookGenres] = useState([])
  const [bookAuthors, setBookAuthors] = useState([])
  const [filterText, setFilterText] = useState('')
  const [filterBy, setFilterBy] = useState('genre')
  const [selectedValue, setSelectedValue] = useState('')
  const [readingSelectedValue, setReadingSelectedValue] = useState('')
  const textPriority = {
    P1: 'Alta',
    P2: 'Media',
    P3: 'Baja'
  }

  const applyFilter = (data, filterBy, filterText, selectedValue) => {
    return data.filter(item => {
      const titleMatch = item.book.title.toLowerCase().includes(filterText.toLowerCase())
      const genreMatch = item.book.genre.toLowerCase().includes(selectedValue.toLowerCase())
      const authorMatch = item.book.author.name.toLowerCase().includes(selectedValue.toLowerCase())

      if (filterBy === 'genre') {
        return genreMatch && titleMatch
      } else if (filterBy === 'author') {
        return authorMatch && titleMatch
      } else {
        return titleMatch
      }
    })
  }

  useEffect(() => {
    if (filterText !== '' || selectedValue !== '') {
      const filteredData = applyFilter(data, filterBy, filterText, selectedValue)
      setFilteredData(filteredData)
    } else {
      setFilteredData(data)
    }
  }, [filterText, data, filterBy, selectedValue])

  useEffect(() => {
    if (readingSelectedValue !== '') {
      const readingFilteredData = readingList.filter(item => item.priority === readingSelectedValue)
      setReadingFilteredData(readingFilteredData)
    } else {
      setReadingFilteredData(readingList)
    }
  }, [readingList, readingSelectedValue])

  const addToReadingList = (title, priority) => {
    if (readingList.find(item => item.book.title === title)) return
    const item = data.find(item => item.book.title === title)
    setReadingList([...readingList, { ...item, priority }])
    setCountReadingList(countReadingList + 1)
    setCountBookList(countBookList - 1)
  }

  const deleteFromReadingList = title => {
    const item = readingList.find(item => item.book.title === title)
    if (!item) return
    const index = readingList.indexOf(item)
    readingList.splice(index, 1)
    setReadingList([...readingList])
    setCountReadingList(countReadingList - 1)
    setCountBookList(countBookList + 1)
  }

  return (
    <BookAppContext.Provider
      value={{
        data,
        setData,
        readingList,
        setReadingList,
        countBookList,
        setCountBookList,
        countReadingList,
        setCountReadingList,
        addToReadingList,
        deleteFromReadingList,
        bookGenres,
        setBookGenres,
        bookAuthors,
        setBookAuthors,
        filteredData,
        setFilteredData,
        filterText,
        setFilterText,
        filterBy,
        setFilterBy,
        selectedValue,
        setSelectedValue,
        readingSelectedValue,
        setReadingSelectedValue,
        readingFilteredData,
        setReadingFilteredData,
        textPriority
      }}>
      {children}
    </BookAppContext.Provider>
  )
}

const useBookAppContext = () => {
  const context = useContext(BookAppContext)
  if (!context) {
    throw new Error('useBookAppContext debe utilizarse dentro de BookAppProvider')
  }
  return context
}

export { BookAppProvider, useBookAppContext }
