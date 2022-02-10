import { useState, useEffect } from 'react'
import { Octokit } from 'octokit'
/* eslint-disable */

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN })

const useFetch = ({ q }: { q: string }) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async function fetchData() {
      setLoading(true)
      return await octokit
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
  }, [])

  return {
    data,
    loading,
  }
}

export default useFetch
