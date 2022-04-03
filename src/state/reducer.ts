import { Action } from './action'
import type { IState } from '@/types'
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
  hasMore: true,
}

export const reducer = (
  state: IState = initialState,
  action: Action
): IState => {
  switch (action.type) {
    case ActionType.FETCH_START:
      return {
        ...state,
        isLoading: true,
      }
    case ActionType.LOADED: {
      const { response, query } = action.payload
      return {
        ...state,
        results: [...state.results, ...response],
        query: { ...state.query, ...query },
      }
    }
    case ActionType.SWITCH_QUERY: {
      const { response, query } = action.payload
      return {
        ...state,
        results: response,
        query: { ...state.query, ...query },
      }
    }
    case ActionType.FETCH_END:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CLEAR_RESULTS: {
      return {
        ...state,
        results: []
      }
    }
    default:
      return state
  }
}
