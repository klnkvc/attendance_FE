const AttendanceReportTable = ({listReport, canCreate=1, canRead=1, canUpdate=1, canDelete=1, showImage, showLogbook})=>{
    return <div className="flex flex-col bg-white rounded shadow">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead
                            className="border-b font-medium">
                        <tr>
                            <th scope="col" className=" px-4 py-4">#</th>
                            <th scope="col" className=" px-1 py-4">Date</th>
                            <th scope="col" className=" px-1 py-4">Clock In</th>
                            <th scope="col" className=" px-1 py-4">Clock Out</th>
                            <th scope="col" className=" px-1 py-4">Work Type</th>
                            <th scope="col" className=" px-1 py-4">Location</th>
                            <th scope="col" className=" px-1 py-4">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {canRead!==0?listReport.map((data, index)=>{
                            const isRemove = ()=>{
                                if (data.workTypeId===1){
                                    return true
                                }else {return false}
                            }
                            return <tr className="border-b" key={index}>
                                <td className="whitespace-nowrap  px-4 py-4 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.formattedDate}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.clockIn}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.clockOut}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.workTypeId===1?"WFO":"WFH"}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.wfhLoc}</td>
                                <td className="whitespace-nowrap  px-1 py-4">
                                    {!isRemove()?
                                        <div>
                                            <button className="p-2 focus:outline-none" onClick={()=>showLogbook(data.logbook)} title={"View Logbook"}>
                                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18v14H3z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5l9 6 9-6" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 10h5M7 14h5" />
                                                </svg>
                                            </button>
                                            <button className="p-2 focus:outline-none" onClick={()=>showImage(data.imageCapture)} title={"View Image Proof"}>
                                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7.5h2l1.5-2h12l1.5 2h2a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H2.5a1.5 1.5 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 1.5-1.5z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5h.01" />
                                                </svg>
                                            </button>
                                        </div>
                                        :null}
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

export default AttendanceReportTable