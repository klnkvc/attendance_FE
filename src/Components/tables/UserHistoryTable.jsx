const UserHistoryTable = ({listHistory, canCreate=1, canRead=1, canUpdate=1, canDelete=1})=>{
    console.log("listHistory")
    console.log(listHistory)
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
                        </tr>
                        </thead>
                        <tbody>
                        {canRead!==0?listHistory.map((data, index)=>{
                            return <tr className="border-b" key={index}>
                                <td className="whitespace-nowrap  px-4 py-4 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.formattedDate}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.clockIn}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.clockOut}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.workTypeId===1?"WFO":"WFH"}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.wfhLoc}</td>
                            </tr>
                        }):null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default UserHistoryTable