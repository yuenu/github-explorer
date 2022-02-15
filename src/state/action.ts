import { Item } from '@/types'
import { ActionType } from './action-type'
import { Query } from '@/types'

export interface FetchStartAction {
  type: ActionType.FETCH_START
  payload: {
    fetchTimestamp: number
  }
}

export interface FetchEndAction {
  type: ActionType.FETCH_END
}

export interface LoadedAction {
  type: ActionType.LOADED
  payload: {
    response: Item[]
    query: Query
  }
}

export interface SwitchQueryAction {
  type: ActionType.SWITCH_QUERY
  payload: {
    response: Item[]
    query: Query
  }
}

export type Action =
  | FetchStartAction
  | FetchEndAction
  | LoadedAction
  | SwitchQueryAction
