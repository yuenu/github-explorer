import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`search?q=${query}`, { replace: true })
    }
  }

  const onClick = () => {
    navigate(`search?q=${query}`, { replace: true })
  }
  return (
    <div className="space-x-3">
      <span className="font-bold text-amber-700">Search Repos</span>
      <input
        className="px-3 py-1 rounded-sm"
        type="text"
        onChange={onInputChange}
        value={query}
        onKeyPress={onKeyPress}
      />
      <button type="button" onClick={onClick}>
        Search
      </button>
    </div>
  )
}

export default Search
