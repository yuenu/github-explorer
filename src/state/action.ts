import { Item } from '@/types'
import { ActionType } from './action-type'

type ActionPayload = {
  newData: Item[]
}

interface StartAction {
  type: ActionType.START
}

interface LoadedAction {
  type: ActionType.LOADED
  payload: ActionPayload
}

export type Action = StartAction | LoadedAction
