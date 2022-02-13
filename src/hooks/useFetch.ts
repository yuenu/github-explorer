import { useState, useEffect, useCallback } from 'react'
import { Octokit } from 'octokit'
import { RootObject } from '@/types'
import GITHUB_ACCESS_TOKEN from '@/github'

const octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN })

type Props = {
  q: string
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated'
  order?: 'desc' | 'asc'
  per_page?: number
  page?: number
}

const useFetch = (query: string) => {
  const [response, setResponse] = useState<RootObject['items']>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>()
  const [page, setPage] = useState(0)

  const doFetch = useCallback(() => {
    setIsLoading(true)
    setPage((prev) => prev + 1)
  }, [])

  useEffect(() => {
    if (!isLoading) return
    const abortController = new AbortController()
    ;(async () => {
      try {
        const response = await octokit.request('GET /search/repositories', {
          q: query,
          page: page,
          signal: abortController.signal,
        })
        setResponse(response.data.items)
      } catch (error: any) {
        if (error.name === 'AbortError') {
          return
        }
        setError(error)
        setIsLoading(false)
      }
    })()
  }, [isLoading, page, query])

  return [
    {
      response,
      isLoading,
      error,
    },
    doFetch,
  ]
}

export default useFetch
