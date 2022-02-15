import { useReducer, useCallback } from 'react'
import { reducer, initialState, ActionType } from '@/state'
import { useNavigate } from 'react-router-dom'
import { fetchRepo } from '@/api'
import { Query, State } from '@/types'

type Props = {
  query: Query
  type?: ActionType.LOADED | ActionType.SWITCH_QUERY
}

type Response = {
  state: State
  fetcher: ({ query, type }: Props) => void
}

const useFetchRepo = (): Response => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetcher = useCallback(
    ({ query, type = ActionType.LOADED }: Props) => {
      const now = Date.now()

      dispatch({
        type: ActionType.FETCH_START,
        payload: {
          fetchTimestamp: now,
        },
      })

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
    [navigate]
  )

  return { state, fetcher }
}

export default useFetchRepo
