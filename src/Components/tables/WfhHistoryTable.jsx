const WfhHistoryTable = ({listWfh, canCreate=1, canRead=1, canUpdate=1, canDelete=1})=>{
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
                            <th scope="col" className=" px-1 py-4">Location</th>
                            <th scope="col" className=" px-1 py-4">Approval</th>
                        </tr>
                        </thead>
                        <tbody>
                        {canRead!==0?listWfh.map((data, index)=>{
                            return <tr className="border-b" key={index}>
                                <td className="whitespace-nowrap  px-4 py-4 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.date}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.location}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.approval===2?"Approved":data.approval===1?"Rejected":"Waiting"}</td>
                            </tr>
                        }):null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default WfhHistoryTable