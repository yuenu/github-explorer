import { useState, useEffect, useCallback } from 'react'
import { Octokit } from 'octokit'
import { RootObject } from '@/types'
import GITHUB_ACCESS_TOKEN from '@/github'
/* eslint-disable */

const octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN })

type Props = {
  q: string
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated'
  order?: 'desc' | 'asc'
  per_page?: number
  page?: number
}

const useFetch = (props: Props) => {
  console.log(props)
  const [data, setData] = useState<RootObject['items']>([])
  const [loading, setLoading] = useState(false)

  const fetchRepositoryData = useCallback(async () => {
    setLoading(true)
    await octokit
      .request('GET /search/repositories', props)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.items)
          setLoading(false)
        } else throw 'Unexpect error'
      })
      .catch((e) => console.error('[Search api] error:', e))
  }, [])

  useEffect(() => {
    fetchRepositoryData()
  }, [props.page])

  return {
    data,
    loading,
  }
}

export default useFetch
