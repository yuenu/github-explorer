import { useCallback } from 'react'
import { ActionType } from '@/state'
import { useNavigate } from 'react-router-dom'
import { fetchRepo } from '@/api'
import { Query } from '@/types'
import { useStore } from '@/hooks'

type Props = {
  query?: Query
  type?: ActionType.LOADED | ActionType.SWITCH_QUERY
}

const useFetchRepo = () => {
  const navigate = useNavigate()
  const { dispatch } = useStore()

  const fetcher = useCallback(
    ({ query = { q: 'react', page: 1 }, type = ActionType.LOADED }: Props) => {
      dispatch({
        type: ActionType.FETCH_START,
      })

      if(type === ActionType.SWITCH_QUERY) dispatch({type: ActionType.CLEAR_RESULTS})

      fetchRepo(query).then((response) => {
        dispatch({
          type: type,
          payload: {
            response: response,
            query: query,
          },
        })

        dispatch({
          type: ActionType.FETCH_END,
        })
      })

      navigate(`search?q=${query.q}&page=${query.page}`, { replace: true })
    },
    [dispatch, navigate]
  )

  return fetcher
}

export default useFetchRepo
