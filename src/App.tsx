import {
  useEffect,
  useRef,
  useState,
  useReducer,
  ReactNode,
  createContext,
  useContext,
} from 'react'
import { Item } from '@/types'
import { ResultList, Search } from '@/components'
import { reducer, ActionType } from '@/state'
import { useFetch } from '@/hooks'

import { Octokit } from 'octokit'
import GITHUB_ACCESS_TOKEN from '@/github'
const octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN })

// REDUCER
const initialState = {
  loading: false,
  more: true,
  data: [] as Item[],
  after: 1,
}

export interface AppContextInterface {
  loading: boolean
  data: Item[]
  more: boolean
  load: () => void
}
const AppContext = createContext<AppContextInterface>({
  loading: false,
  data: [] as Item[],
  more: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  load: () => {},
})

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { loading, data, after, more } = state

  const load = () => {
    console.log('fetch the data')
    dispatch({ type: ActionType.START })

    try {
      octokit
        .request('GET /search/repositories', { q: 'react', page: after })
        .then((response) => {
          console.log(response)
          dispatch({
            type: ActionType.LOADED,
            payload: { newData: response.data.items },
          })
        })
    } catch {
      throw 'Unexpect error on fetch data'
    }
  }

  console.log(loading, data, more)
  return (
    <AppContext.Provider value={{ loading, data, more, load }}>
      {children}
    </AppContext.Provider>
  )
}

const App = () => {
  // const { data, loading, more, load } = useContext(AppContext)
  const [{ response, isLoading, error }, doFetch] = useFetch('react')
  const [element, setElement] = useState<HTMLElement | null>(null)

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.intersectionRatio) {
          console.log('toggle')
        }
      },
      { threshold: 1 }
    )
  )

  const handleClick = () => {
    console.log('clicked')
  }

  useEffect(() => {
    const currentElement = element
    const currentObserver = observer.current

    if (currentElement) {
      currentObserver.observe(currentElement)
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }
  }, [element])

  return (
    <AppProvider>
      <div className="min-h-screen px-4">
        <div className="w-full max-w-lg pt-10 mx-auto space-y-5">
          <h1 className="text-3xl font-bold">Github Explorer</h1>
          <Search />
          <ResultList items={response} error={error} loading={isLoading} />
          <button ref={setElement} onClick={}>
            more
          </button>
        </div>
      </div>
    </AppProvider>
  )
}

export default App
