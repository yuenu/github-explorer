import { Octokit } from 'octokit'
import type { Query, Item } from '@/types'
import GITHUB_ACCESS_TOKEN from '@/github'

const octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN })

export async function fetchRepo(query: Query): Promise<Item[]> {
  return await octokit
    .request('GET /search/repositories', query)
    .then((res) => {
      if (!(res.status === 200)) {
        throw new Error('Unexpect fetch error')
      }
      return res.data.items
    })
    .catch((e) => {
      console.log('[fetchRepo] error', e)
      return []
    })
}
