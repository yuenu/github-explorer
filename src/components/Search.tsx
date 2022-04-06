import React, { useState } from 'react'
import { useFetchRepo } from '@/hooks'
import { ActionType } from '@/state'

const Search = () => {
  const [inputQuery, setInputQuery] = useState('')
  const fetcher = useFetchRepo()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetcher({
      query: { q: inputQuery, page: 1 },
      type: ActionType.SWITCH_QUERY,
    })
  }


  return (
    <form className="space-x-3" onSubmit={onSubmit}>
      <span className="font-bold text-amber-700" data-cy="title">Search Repos</span>
      <input
        className="px-3 py-1 rounded-sm"
        type="text"
        onChange={onInputChange}
        value={inputQuery}
        data-cy="search-input"
      />
      <button type="submit" data-cy="submit">
        Search
      </button>
    </form>
  )
}

export default Search
