import Table from '../components/table'
import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'

interface User {
  displayName: string,
  mail: string
}

const Home: NextPage = () => {
  let [data, setData] = useState<any[]>([])
  let [teams, setTeams] = useState<User>({displayName: '', mail: ''})
  const [isLoading, setIsLoading] = useState(false);
  let inputFileRef = useRef<HTMLInputElement | null>(null);

  const submitFile = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (inputFileRef.current?.files?.length) {
      const formData = new FormData();
      Object.values(inputFileRef.current.files).forEach(file => { formData.append('file', file) })
      await fetch('/api/import', { method: 'POST', body: formData })
        .then(res => console.log(res.json()));
    }
    await fetch('/api/convert')
      .then(res => console.log(res.json()))
    await fetch('/api/upload')
      .then(res => console.log(res.json()))
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setData(data))
    setIsLoading(false);
  };

  const exportDBToCsv = async () => {
    await fetch('/api/export')
      .then(res => res.json())
      .then(name => {
        fetch(`/export/${name}`)
          .then(res => res.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(new Blob([name]));
            const link = document.createElement('a');
            link.href = url;
            link.download = "export.csv";
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
          })
    
      })
  }

  useEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(data => setTeams(data))
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setData(data))
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
            <form className='flex'>
              <input className='hidden' type="file" id='file' name="file" ref={inputFileRef} multiple />
              <label htmlFor="file" className='mr-4 border border-[#b89a52] text-[#b89a52] rounded-full active:text-[#d3ba81] font-light uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'>
                File
              </label>
              <input type="submit" value={isLoading ? "Load" : "Upload"} disabled={isLoading} onClick={submitFile} 
              className='mr-4 text-[#b89a52] active:bg-[#fcecd9] font-light uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150' />
            </form>
            <button
              onClick={exportDBToCsv}
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

export default Home
