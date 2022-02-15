import { Action } from './action'
import type { State } from '@/types'
import { perPage } from '@/constant'
import { ActionType } from './action-type'

export const initialState = {
  results: [],
  isLoading: false,
  query: {
    q: 'react',
    page: -1,
    perPage: perPage,
  },
  isMore: true,
  fetchTimestamp: null,
}

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.FETCH_START:
      return {
        ...state,
        isLoading: true,
        fetchTimestamp: action.payload.fetchTimestamp,
      }
    case ActionType.LOADED:
      return {
        ...state,
        results: state.results.concat(action.payload.response),
        query: action.payload.query,
      }
    case ActionType.SWITCH_QUERY:
      return {
        ...state,
        results: action.payload.response,
        query: action.payload.query,
      }
    case ActionType.FETCH_END:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
