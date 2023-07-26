import { useBookAppContext } from '../../context/useBookApp'
import BookCard from '../BookCard'

function BookList() {
  const { filteredData, selectedValue } = useBookAppContext()

  return (
    <>
      {selectedValue !== '' ? (
        <p>
          {filteredData.length} {filteredData.length > 1 ? 'libros' : 'libro'} de {selectedValue}
        </p>
      ) : null}
      <section className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 place-items-center py-5">
        {filteredData.map((item, idx) => (
          <BookCard key={idx} title={item.book.title} cover={item.book.cover} />
        ))}
      </section>
    </>
  )
}

export default BookList
