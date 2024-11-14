import dayjs from "dayjs";

const WfhApprovalTable = ({listWfh, canCreate=1, canRead=1, canUpdate=1, canDelete=1, approveFunc, rejectFunc})=>{
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
                            <th scope="col" className=" px-1 py-4">Name</th>
                            <th scope="col" className=" px-1 py-4">Phone</th>
                            <th scope="col" className=" px-1 py-4">Wfh Location</th>
                            <th scope="col" className=" px-1 py-4">Approval</th>
                            {canUpdate !==0||canDelete !==0?<th scope="col" className=" px-1 py-4">Action</th>:null}
                        </tr>
                        </thead>
                        <tbody>
                        {canRead!==0?listWfh.map((data, index)=>{
                            const isPast = dayjs(data.date.split(', ')[1],'DD-MM-YYYY').isBefore(dayjs(), 'day')
                            const removeAction = isPast || data.approval!==0
                            return <tr className="border-b" key={index}>
                                <td className="whitespace-nowrap  px-4 py-4 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.date}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.name}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.phoneNumber}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.location}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.approval===2?"Approved":data.approval===1?"Rejected":"Waiting"}</td>
                                {canUpdate !==0?
                                    <td className="whitespace-nowrap  px-1 py-4">
                                        {canUpdate !==0?
                                            !removeAction?
                                                <div>
                                                    <button className="p-2 focus:outline-none" onClick={()=>approveFunc(data.id)}>
                                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="1.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </button>
                                                    <button className="p-2 focus:outline-none" onClick={()=>rejectFunc(data.id)}>
                                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="1.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                :null
                                            :null}
                                    </td>
                                    :null}
                            </tr>
                        }):null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default WfhApprovalTable