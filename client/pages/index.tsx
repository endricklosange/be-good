import Table from '../components/table'
import { useEffect, useLayoutEffect, useState } from 'react'


interface User {
  displayName: string,
  mail: string
}

export default function Home() {

  let [data, setData] = useState<any[]>([])
  let [teams, setTeams] = useState<User>({displayName: '', mail: ''})

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  useLayoutEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(data => setTeams(data))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className='max-w-xl w-full'>
        <div className='flex w-full justify-between items-center mb-10'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold'>{teams.displayName}</h1>
            <h3 className='text-sm text-gray-500'>{teams.mail}</h3>
          </div>
          <div className='flex'>
            <button 
            className='mr-4 text-[#b89a52] active:bg-[#fcecd9] font-light uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'>
            Import
            </button>
            <button 
            className='bg-[#b89a52] text-white active:bg-[#d3ba81] font-light uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'>
            Export
            </button> 
          </div>
        </div>
        <Table data={data} />
      </div>
    </main>
  )
}