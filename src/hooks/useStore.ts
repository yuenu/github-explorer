/* eslint-disable @typescript-eslint/ban-types */
import { useContext, createContext } from 'react'
import { AppContextInterface } from '@/types'

function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined)
  function useCtx() {
    const c = useContext(ctx)
    if (c === undefined)
      throw new Error('useCtx must be inside a Provider with a value')
    return c
  }
  return [useCtx, ctx.Provider] as const // 'as const' makes TypeScript infer a tuple
}

export const [useStore, StoreProvider] = createCtx<AppContextInterface>()
