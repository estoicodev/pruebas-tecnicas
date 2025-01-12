import BookList from '../../components/BookList'
import BookSearcher from '../../components/BookSearcher'
import BookAppInfo from '../../components/BookAppInfo'
import ReadingList from '../../components/ReadingList'
import ReadingFilter from '../../components/ReadingFilter'
import { useBookAppContext } from '../../context/useBookApp'
import { useEffect } from 'react'

function BookApp() {
  const {
    setData,
    setFilteredData,
    setCountBookList,
    setCountReadingList,
    setBookGenres,
    setBookAuthors,
    readingList,
    readingFilteredData,
    readingSelectedValue,
    textPriority
  } = useBookAppContext()

  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then(data => {
        const { library } = data
        setData(library)
        setFilteredData(library)
        setCountBookList(library.length - readingList.length)
        setCountReadingList(readingList.length)
        setBookGenres([...new Set(library.map(item => item.book.genre))])
        setBookAuthors([...new Set(library.map(item => item.book.author.name))])
        console.log(library)
      })
      .catch(err => console.log(err))
  }, [
    readingList,
    setData,
    setFilteredData,
    setCountBookList,
    setCountReadingList,
    setBookGenres,
    setBookAuthors
  ])

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-5">
      <div className="w-full h-full md:col-span-3 p-5">
        <BookAppInfo />
        <BookSearcher />
        <BookList />
      </div>
      <div className="w-full h-full md:col-span-2">
        <div className="min-h-screen flex flex-col my-4 md:my-10 mx-8 p-6 items-center border-2 rounded-lg">
          <h2 className="text-2xl mb-6">Lista de Lectura</h2>
          <ReadingFilter />
          {readingList.length ? (
            <ReadingList />
          ) : (
            <p className="text-gray-500 text-lg mt-8 order-2">
              No hay libros en la lista de lectura...
            </p>
          )}
          {readingFilteredData.length === 0 && readingList.length > 0 && (
            <p className="text-gray-500 text-lg mt-8 order-2">
              No hay libros con prioridad {textPriority[readingSelectedValue]}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookApp
