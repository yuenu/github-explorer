import { Item } from '@/types'
import { Spinner, ResultItem } from '.'

type ResultProps = {
  items: Item[]
  error?: Error | null | undefined
  loading: boolean
}

const ResultsList = ({ items, error, loading }: ResultProps) => {
  const rednerResults = () => {
    if (!!error) return <p className="text-red-600">{error}</p>
    if (items && items.length > 0)
      return items.map((item) => <ResultItem key={item.id} item={item} />)
  }
  return (
    <div className="space-y-6">
      {rednerResults()}
      {!error && loading && <Spinner />}
    </div>
  )
}

export default ResultsList
