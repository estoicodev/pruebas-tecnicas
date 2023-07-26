import { useState, useEffect } from 'react'

const useLocalStorage = (itemName, initialValue) => {
  const [item, setItem] = useState(initialValue)

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem(itemName))
    if (item) {
      setItem(item)
    } else {
      localStorage.setItem(itemName, JSON.stringify(initialValue))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveItem = item => {
    localStorage.setItem(itemName, JSON.stringify(item))
    setItem(item)
  }

  return {
    item,
    saveItem
  }
}

export { useLocalStorage }
