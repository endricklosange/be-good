import Table from '../components/table'
import { useEffect, useState } from 'react'


export default function Home() {

  let [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className='max-w-4xl w-full'>
        <div className='flex justify-end w-full mb-10 '>
          <button 
            className='mr-4 text-[#b89a52] active:bg-[#fcecd9] font-light uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'>
            Import
          </button>
          <button 
            className='bg-[#b89a52] text-white active:bg-[#b99a72] font-light uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'>
            Export
          </button> 
        </div>
        <Table data={data} />
      </div>
    </main>
  )
}