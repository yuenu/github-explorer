import { useEffect, useState, useCallback } from 'react'
import { Octokit } from 'octokit'
import { Item } from '@/types'
import { useNavigate } from 'react-router-dom'

const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN })

type State = {
  response: Item[]
  isLoading: boolean
  error: Error | null | undefined
  doFetch: () => void
}

const useFetch = (query: string): State => {
  const navigate = useNavigate()
  const [response, setResponse] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>()
  const [page, setPage] = useState(0)

  const doFetch = useCallback(() => {
    setPage((prev) => prev + 1)
    setIsLoading(true)
  }, [])

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

  return {
    response,
    isLoading,
    error,
    doFetch,
  }
}

export default useFetch
