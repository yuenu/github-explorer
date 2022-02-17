import { useEffect, useState, useCallback } from 'react'
import { Octokit } from 'octokit'
import { Item } from '@/types'
import { useNavigate } from 'react-router-dom'

const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN })

type State = {
  response: Item[]
  isLoading: boolean
  error: Error | null | undefined
}

const useFetch = (): [State, (search?: string | undefined | null) => void] => {
  const navigate = useNavigate()
  const [response, setResponse] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>()
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('react')

  const doFetch = useCallback(
    (search?: string | null) => {
      if (isLoading) return
      if (search) {
        setPage(1)
        setQuery(search)
      } else {
        setPage((prev) => prev + 1)
      }

      setIsLoading(true)
    },
    [isLoading]
  )

  useEffect(() => {
    if (!isLoading) return // const abortController = new AbortController()
    ;(async () => {
      try {
        const response = await octokit.request('GET /search/repositories', {
          q: query,
          page: page,
        })
        setResponse(response.data.items)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.name === 'AbortError') {
          return
        }
        setError(error)
      }
      setIsLoading(false)
      navigate(`search?q=${query}&page=${page}`, { replace: true })
    })()
  }, [isLoading, navigate, page, query])

  return [{ response, isLoading, error }, doFetch]
}

export default useFetch
