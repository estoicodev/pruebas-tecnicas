import BookCard from '../BookCard'
import { useBookAppContext } from '../../context/useBookApp'

function ReadingList() {
  const { setReadingList, readingSelectedValue, readingFilteredData, textPriority } =
    useBookAppContext()

  const deleteAllReadingList = () => {
    localStorage.removeItem('readingList')
    setReadingList([])
  }

  return (
    <section className="flex flex-col order-2">
      {readingSelectedValue !== '' && readingFilteredData.length > 0 ? (
        <p className="order-1 self-start px-2 pt-2">
          {readingFilteredData.length} {readingFilteredData.length === 1 ? 'libro' : 'libros'} de
          prioridad {textPriority[readingSelectedValue]}
        </p>
      ) : null}
      <div className="relative grid order-3 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-1 ml:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center px-10 pt-9 pb-5">
        {readingFilteredData.map((item, idx) => (
          <BookCard
            key={idx}
            title={item.book.title}
            cover={item.book.cover}
            priority={item.priority}
            type="readingList"
          />
        ))}
        <button
          onClick={deleteAllReadingList}
          className={`${
            readingSelectedValue !== '' ? 'hidden' : ''
          } absolute top-0 right-0 text-xs md:text-sm text-slate-500 hover:underline font-medium cursor-pointer`}>
          Delete all
        </button>
      </div>
    </section>
  )
}

export default ReadingList
