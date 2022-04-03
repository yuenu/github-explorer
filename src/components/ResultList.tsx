import { useEffect, useRef } from 'react'
import { Spinner, ResultItem } from '@/components'
import { useFetchRepo, useStore } from '@/hooks'

const ResultsList = () => {
  const { state } = useStore()
  const moreRef = useRef<HTMLSpanElement | null>(null)
  const fetcher = useFetchRepo()

  useEffect(() => {
    if(!moreRef.current) return

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if(!state.isLoading && first.intersectionRatio && state.query.page) {
        fetcher({ query: {
          ...state.query,
          page: state.results.length > 0 ? state.query.page + 1 : 1
        }})
      }
    }, { threshold: 1})

    observer.observe(moreRef.current)

    return () => observer.disconnect()

  }, [fetcher, state.isLoading, state.query, state.results.length])

  return (
    <div className="space-y-6">
      {state.results.map((item) => (
        <ResultItem key={item.id} item={item} />
      ))}
      {state.isLoading && <Spinner />}
      <span ref={moreRef}></span>
    </div>
  )
}

export default ResultsList
