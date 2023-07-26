import { BookAppProvider } from './context/useBookApp'
import BookApp from './pages/BookApp'

function App() {
  return (
    <BookAppProvider>
      <BookApp />
    </BookAppProvider>
  )
}

export default App
