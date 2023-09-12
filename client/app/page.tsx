import Image from 'next/image'
import Table from './table'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className='max-w-4xl w-full'>
        <div className='flex justify-end w-full mb-10 '>
          <button 
            className='mr-4 text-blue-500 active:bg-blue-100 font-light uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'>
            Import
          </button>
          <button 
            className='bg-blue-500 text-white active:bg-blue-600 font-light uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'>
            Export
          </button> 
        </div>
        <Table />
      </div>
    </main>
  )
}
