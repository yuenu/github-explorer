import { useState, useEffect, useCallback } from 'react'
import { Octokit } from 'octokit'
import { RootObject } from '@/types'
/* eslint-disable */

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN })

const useFetch = ({ q }: { q: string }) => {
  const [data, setData] = useState<RootObject['items']>([])
  const [loading, setLoading] = useState(false)

  const fetchRepositoryData = useCallback(() => {
    ;(async function fetchData() {
      setLoading(true)
      await octokit
        .request('GET /search/repositories', {
          q: q,
        })
        .then((response) => {
          if (response.status === 200) {
            setData(response.data.items)
            setLoading(false)
          } else throw 'Unexpect error'
        })
        .catch((e) => console.error('[Search api] error:', e))
    })()
  }, [data])

  useEffect(() => {
    fetchRepositoryData()
  }, [])

  return {
    data,
    loading,
  }
}

export default useFetch
