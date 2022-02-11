import { useFetch, useIntersectionObserver } from './hooks'
import Icon from './components/Icon'
import { Item } from '@/types'
import { parseNumber, timeSince } from '@/utils'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<Item[]>([])
  const { data } = useFetch({ q: 'react', per_page: 10, page })

  const handleClick = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    setResults((prev) => prev.concat(data))
  }, [data])
  return (
    <div className="min-h-screen px-4">
      <div className="w-full max-w-lg pt-10 mx-auto space-y-5">
        <h1 className="text-3xl font-bold">Github Explorer</h1>
        <Search />
        <Results items={results} />
        <button onClick={handleClick}>more</button>
      </div>
    </div>
  )
}

function Search() {
  return (
    <div className="space-x-3">
      <span className="font-bold text-amber-700">Search Repos</span>
      <input className="" type="text" />
    </div>
  )
}

type ResultProps = {
  items: Item[]
}

function Results({ items }: ResultProps) {
  const ref = useRef<HTMLBodyElement>(document.querySelector('body'))
  const entry = useIntersectionObserver(ref, {
    rootMargin: '0px 0px 20px 0px',
    threshold: 0,
  })
  const isVisible = !!entry?.isIntersecting
  return (
    <div className="space-y-6">
      {items.length > 0 ? (
        items.map((item: Item, index: number) => {
          if (items.length === index + 1) {
            return <ResultItem key={item.id} item={item} />
          } else {
            return <ResultItem key={item.id} item={item} />
          }
        })
      ) : (
        <div className="lds-dual-ring"></div>
      )}
    </div>
  )
}

function ResultItem({ item }: { item: Item }) {
  return (
    <div className="p-3 bg-white rounded-lg drop-shadow-md" key={item.id}>
      <a
        href={item.html_url}
        className="flex gap-3 hover:underline hover:decoration-blue-700"
      >
        <Icon.Repository className="w-3" />
        <span className="text-sm text-blue-700">{item.full_name}</span>
      </a>
      <div className="mt-2 ml-6 text-sm text-gray-800">{item.description}</div>
      <div className="flex flex-wrap items-center mt-2 ml-6 gap-x-1 gap-y-2">
        {item.topics &&
          item.topics.map((topic: string, index: number) => (
            <a
              key={index}
              className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-2xl "
            >
              {topic}
            </a>
          ))}
      </div>
      <div className="flex flex-wrap items-center mt-2 ml-6 text-xs text-gray-500 gap-x-3 gap-y-1">
        <div className="flex items-center gap-1 break-words ">
          <Icon.Star className="w-3" />
          <span>{parseNumber(item.stargazers_count)}</span>
        </div>
        <div>{item.language}</div>
        <div>{item.license && item.license.name}</div>
        <div>Updated {timeSince(item.updated_at)}</div>
      </div>
    </div>
  )
}

export default App
