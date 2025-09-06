import React, {
    useState,
} from 'react'

import { beautifyString, getBgColorByCriticality, getBgColorByStatus } from "../utils";

type Service = {
    id: string
    name: string
    status: string
    product_owner: string
    criticality: string
    lastUpdated: string
}

type Props = {
    searchList: Service[]
}

export default function Search(props: Props) {
    if (!props.searchList) {
        return <div>No data available</div>
    }

    const { searchList } = props
    const [search, setSearch] = useState('')
    const [filteredList, setFilteredList] = useState(searchList)

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded p-2 w-full mb-4"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setFilteredList(
                        searchList.filter((item) =>
                            item?.name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
                            item?.status?.toLowerCase().replace("_", " ").includes(e.target.value.toLowerCase()) ||
                            item?.product_owner?.toLowerCase().includes(e.target.value.toLowerCase()) ||
                            item?.criticality?.toLowerCase().includes(e.target.value.toLowerCase())
                        )
                    )
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = '#0070f3'
                }}
            />

            <div>
                <table cellPadding="7" className="w-full table-auto">
                    <thead
                        style={{
                            fontWeight: "bolder",
                            borderBottom: "2px solid"
                        }}
                    >
                        <tr>
                            <td>Name</td>
                            <td>Status</td>
                            <td>Cirticality</td>
                            <td>Product Owner</td>
                            <td>last updated</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredList?.map((service) => (
                                <tr key={service.id} className='even:bg-brombeer-200'>
                                    <td className='px-2 py-2'>
                                        <a className="text-brombeer hover:underscore" href={`/it-landscape/services/${service.name}`}>
                                            {service.name}
                                        </a>
                                    </td>
                                    <td>
                                        <span
                                            className={`p-1.5 text-xs rounded ${getBgColorByStatus(service.status)}`}
                                        >
                                            {beautifyString(service.status as string)}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`p-1.5 text-xs rounded ${getBgColorByCriticality(service.criticality)}`}
                                        >
                                            {service.criticality}
                                        </span>
                                    </td>
                                    <td>{service.product_owner}</td>
                                    <td>{service.lastUpdated}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >
        </div >
    )
}
