import React from "react"

export default function Row({link, label}) {
    return (   
        <>
            {(link) ?
            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
            <a className="text-green-500 hover:text-green-700"
                href={link}>
            {label}
            </a>
            </td>
            :
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
            {label}
            </td>
            }
        </>
)};