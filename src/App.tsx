import useFetch from './hooks/useFetch'
import Icon from './components/Icon'
import { Item } from '@/types'
import { parseNumber, timeSince } from '@/utils'

function App() {
  const { data } = useFetch({ q: 'react' })
  return (
    <div className="min-h-screen bg-[#f5f3f7]">
      <div className="w-full h-4 max-w-lg pt-10 mx-auto space-y-5">
        <h1 className="text-3xl font-bold">Github Explorer</h1>
        <Search />
        <Results items={data} />
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
  return (
    <div className="space-y-6">
      {items.length > 0 ? (
        items.map((item: Item) => <ResultItem key={item.id} item={item} />)
      ) : (
        <div className="lds-dual-ring"></div>
      )}
    </div>
  )
}

function ResultItem({ item }: { item: Item }) {
  return (
    <div className="p-3 bg-white rounded-lg drop-shadow-md" key={item.id}>
      <a href={item.html_url} className="flex gap-3">
        <Icon.Repository className="w-3" />
        <span className="text-sm text-blue-700">{item.full_name}</span>
      </a>
      <div className="mt-2 ml-6 text-sm text-gray-800">{item.description}</div>
      <div className="flex flex-wrap items-center mt-2 ml-6 gap-x-1 gap-y-2">
        {item.topics &&
          item.topics.map((topic: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-2xl "
            >
              {topic}
            </span>
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
