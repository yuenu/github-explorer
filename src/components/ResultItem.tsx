import { Item } from '@/types'
import { parseNumber, timeSince } from '@/utils'
import { Icon } from '@/components'

const ResultItem = ({ item }: { item: Item }) => {
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

export default ResultItem
