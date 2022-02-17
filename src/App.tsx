import { useEffect, useRef } from 'react'
import { ResultList, Search } from '@/components'
import { useFetch } from '@/hooks'
import { useSearchParams } from 'react-router-dom'

const App = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch()
  const search = useRef('react')
  const elementRef = useRef<HTMLButtonElement | null>(null)
  const [searchParams] = useSearchParams({})
  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
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
      { threshold: 1, rootMargin: '200px' }
    )

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [isLoading, doFetch])

  useEffect(() => {
    if (search.current === searchParams.get('q')) return
    if (searchParams.get('q')) {
      doFetch(searchParams.get('q'))
      search.current = searchParams.get('q') || ''
    }
  }, [doFetch, searchParams])

  return (
    <div className="min-h-screen px-4">
      <div className="w-full max-w-lg pt-10 mx-auto space-y-5">
        <h1 className="text-3xl font-bold">Github Explorer</h1>
        <button>trigger</button>
        <Search />
        <ResultList items={response} loading={isLoading} error={error} />
        <button ref={elementRef}>more</button>
      </div>
    </div>
  )
}

export default App
