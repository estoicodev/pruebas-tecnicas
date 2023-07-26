import { useBookAppContext } from '../../context/useBookApp'

function BookAppInfo() {
  const { countBookList, countReadingList } = useBookAppContext()
  return (
    <div className="mb-6 lg:mb-5">
      <h2 className="text-2xl">
        {countBookList === 0 ? 'No hay' : countBookList}{' '}
        {countBookList === 1 ? 'libro disponible' : 'libros disponibles'}{' '}
      </h2>
      <h3 className="text-lg">{countReadingList} en la lista de lectura</h3>
    </div>
  )
}

export default BookAppInfo
