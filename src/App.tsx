import { useReducer } from 'react'
import { ResultList, Search } from '@/components'
import { reducer, initialState } from '@/state'
import { StoreProvider } from '@/hooks'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // const search = useRef('react')


  // useEffect(() => {
  //   if (error) return
  //   if (search.current === searchParams.get('q')) return
  //   if (searchParams.get('q')) {
  //     doFetch(searchParams.get('q'))
  //     search.current = searchParams.get('q') || ''
  //   }
  // }, [doFetch, searchParams, error])

  return (
    <StoreProvider value={{ state, dispatch }}>
      <div className="min-h-screen px-4">
        <div className="w-full max-w-lg pt-10 mx-auto space-y-5">
          <h1 className="text-3xl font-bold">Github Explorer</h1>
          <Search />
          <ResultList />
        </div>
      </div>
    </StoreProvider>
  )
}

export default App
