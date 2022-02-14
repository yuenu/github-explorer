import { useEffect, useRef, useState } from 'react'
import { Item } from '@/types'
import { ResultList, Search } from '@/components'
import { useFetch } from '@/hooks'

const App = () => {
  const [data, setData] = useState<Item[]>([])
  const { response, isLoading, error, doFetch } = useFetch('react')
  const [element, setElement] = useState<HTMLElement | null>(null)

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (
          !isLoading &&
          first.intersectionRatio &&
          Math.floor(first.intersectionRatio) === 1
        ) {
          doFetch()
        }
      },
      { threshold: 1, rootMargin: '0px 0px 1000px 0px' }
    )
  )

  const handleClick = () => {
    if (!isLoading) doFetch()
  }

  useEffect(() => {
    const currentElement = element
    const currentObserver = observer.current

    if (currentElement) {
      currentObserver.observe(currentElement)
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }
  }, [element])

  useEffect(() => {
    setData((prev) => prev.concat(response))
  }, [response])

  return (
    <div className="min-h-screen px-4">
      <div className="w-full max-w-lg pt-10 mx-auto space-y-5">
        <h1 className="text-3xl font-bold">Github Explorer</h1>
        <Search />
        <ResultList items={data} error={error} loading={isLoading} />
        <button ref={setElement} onClick={handleClick}>
          more
        </button>
      </div>
    </div>
  )
}

export default App
