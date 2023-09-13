interface TableProps {
    data: any[]
}

export default function Table(data: TableProps) {

    const count = (row: string) => {
        return row.split(',').length
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('fr-FR')
    }

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-lg text-gray-700">Liste des événements</h3>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr className="grid grid-cols-4">
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                                Evenement
                            </th>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                                participants
                            </th>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                                date début
                            </th>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                                date fin
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((event: any) => (
                            <tr className="grid grid-cols-4" key={event.id}>
                                <th className="capitalize border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    {event.title}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    {count(event.participant)}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    {formatDate(event.start_at)}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    {formatDate(event.end_at)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
