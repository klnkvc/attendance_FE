const ReportTable = ({listReport, canCreate=1, canRead=1, canUpdate=1, canDelete=1, detailFunc})=>{
    return <div className="flex flex-col bg-white rounded shadow">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead
                            className="border-b font-medium">
                        <tr>
                            <th scope="col" className=" px-4 py-4">#</th>
                            <th scope="col" className=" px-1 py-4">Name</th>
                            <th scope="col" className=" px-1 py-4">Phone Number</th>
                            <th scope="col" className=" px-1 py-4">Work Location</th>
                            <th scope="col" className=" px-1 py-4">Attendance</th>
                            <th scope="col" className=" px-1 py-4">Sick</th>
                            <th scope="col" className=" px-1 py-4">Leave</th>
                            <th scope="col" className=" px-1 py-4">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {canRead!==0?listReport.map((data, index)=>{
                            return <tr className="border-b" key={index}>
                                <td className="whitespace-nowrap  px-4 py-4 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.name}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.phoneNumber}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.workLocationId===1?"Onsite":"Remote"}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.totalAttendance}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.totalSickDays}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.totalLeaveDays}</td>
                                <td className="whitespace-nowrap  px-1 py-4">
                                    <button className="p-2 focus:outline-none" onClick={()=>detailFunc({id:data.id, name:data.name})}>
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 2h6l4 4v12.5a1.5 1.5 0 01-1.5 1.5H6.5A1.5 1.5 0 015 18.5V4.5A1.5 1.5 0 016.5 3h1.75" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 2v4h4" />
                                            <circle cx="11.5" cy="11.5" r="3" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 13.5l4 4" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        }):null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default ReportTable