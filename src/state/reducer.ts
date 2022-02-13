import { Action } from './action'
import { Item } from '@/types'
import { perPage } from '@/constant'
import { ActionType } from './action-type'

type IState = {
  data: Item[]
  loading: boolean
  more: boolean
  after: number
}

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case ActionType.START:
      return { ...state, loading: true }
    case ActionType.LOADED:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload.newData],
        more: action.payload.newData.length === perPage,
        after: state.after + action.payload.newData.length,
      }
    default:
      return state
  }
}

export default reducer
