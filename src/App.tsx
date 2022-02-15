import { useEffect, useRef, useState } from 'react'
import { ResultList, Search } from '@/components'
import { useFetchRepo } from '@/hooks'

const App = () => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const { state, fetcher } = useFetchRepo()
  const [page, setPage] = useState(1)

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (
          !state.isLoading &&
          first.intersectionRatio &&
          Math.floor(first.intersectionRatio) === 1
        ) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 1, rootMargin: '0px 0px 1000px 0px' }
    )
  )

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

  const loadPage = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    fetcher({ query: { q: 'react', page: page } })
  }, [fetcher, page])

  return (
    <div className="min-h-screen px-4">
      <div className="w-full max-w-lg pt-10 mx-auto space-y-5">
        <h1 className="text-3xl font-bold">Github Explorer</h1>
        <Search />
        <ResultList items={state.results} loading={state.isLoading} />
        <button ref={setElement} onClick={loadPage}>
          more
        </button>
      </div>
    </div>
  )
}

export default App
