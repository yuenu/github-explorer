import { useReducer } from 'react'
import { ResultList, Search } from '@/components'
import { reducer, initialState } from '@/state'
import { StoreProvider } from '@/hooks'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreProvider value={{ state, dispatch }}>
      <div className="min-h-screen px-4">
        <div className="w-full max-w-lg pt-10 mx-auto space-y-5">
          <h1 className="text-3xl font-bold" data-cy="heading">Github Explorer</h1>
          <Search />
          <ResultList />
        </div>
      </div>
    </StoreProvider>
  )
}

export default App
