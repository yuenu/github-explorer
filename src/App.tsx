import useFetch from './hooks/useFetch'
import { useEffect } from 'react'
import Icon from './components/Icon'

function App() {
  const { data } = useFetch({ q: 'react' })
  console.log('data:', data)
  return (
    <div className="min-h-screen bg-[#f5f3f7]">
      <div className="max-w-lg w-full h-4  mx-auto pt-10 space-y-5">
        <h1 className="text-3xl font-bold">Github Explorer</h1>
        <Search />
        <Result data={data} />
      </div>
    </div>
  )
}

function Search() {
  return (
    <div className="space-x-3">
      <span className="text-amber-700 font-bold">Search Repos</span>
      <input className="" type="text" />
    </div>
  )
}

function Result({ data }: { data: any }) {
  return (
    <div>
      {data.length > 0 && (
        <div className="h-40  p-3 bg-white rounded-lg shadow-lg">
          <div className="flex gap-3">
            <Icon.Repository className="w-3" />
            <span className="text-sm text-blue-700">
              {data[0].owner.login}/react
            </span>
          </div>
          <div className="text-sm ml-6 mt-2 text-gray-800">
            A declarative, efficient, and flexible JavaScript library for
            building user interfaces.
          </div>
          <div className="flex gap-1 items-center ml-6 mt-1">
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-2xl">
              react
            </span>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-2xl">
              react
            </span>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-2xl">
              react
            </span>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-2xl">
              react
            </span>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-2xl">
              react
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs ml-6 mt-2 text-gray-500">
            <div className="flex items-center gap-1">
              <Icon.Star className="w-3" />
              <span>182k</span>
            </div>
            <div>Javascript</div>
            <div>MIT license</div>
            <div>Updated 6 hours ago</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
