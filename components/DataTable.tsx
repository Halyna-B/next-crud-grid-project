"use client";
import React, {useState} from 'react';
import Link from "next/link";

interface Column<T> {
    header: string;
    accessor: keyof T;
}

interface DataTableProps<T> {
    title: string;
    data: T[];
    columns: Column<T>[];
    basePath: string;
}

interface BaseRow {
    id: string;
}

const DataTable = <T extends BaseRow>(props: DataTableProps<T>) => {

    const { title, data, columns, basePath } = props;

    const [search, setSearch] = useState('');

    const filteredData = data.filter((item) =>
        columns.some((column) =>
            item[column.accessor]?.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link
                                href={`/${basePath}/new`}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add New
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.accessor.toString()}
                                        className="px-6 py-3 border-b bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="odd:bg-gray-50 even:bg-white">
                                        {columns.map((column) => (
                                            <td
                                                key={column.accessor.toString()}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                            >
                                                {
                                                    Array.isArray(row[column.accessor])
                                                        ? (row[column.accessor] as unknown[]).join(', ')
                                                        : row[column.accessor]?.toString()
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No results found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
