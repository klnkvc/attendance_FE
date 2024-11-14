import Swal from "sweetalert2";
import dayjs from "dayjs";

const onPreview  = (name)=>{
    console.log(import.meta.env.VITE_APP_IMG_URL+name)
    Swal.fire({
        imageUrl:import.meta.env.VITE_APP_IMG_URL+name,
    })
}

const SickApprovalTable = ({listSick, canCreate=1, canRead=1, canUpdate=1, canDelete=1,approveFunc, rejectFunc})=>{
    return <div className="flex flex-col bg-white rounded shadow">
        {/*<img src={import.meta.env.VITE_APP_IMG_URL + '1721903670101-13.png'}/>*/}
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead
                            className="border-b font-medium">
                        <tr>
                            <th scope="col" className=" px-4 py-4">#</th>
                            <th scope="col" className=" px-1 py-4">Start Date</th>
                            <th scope="col" className=" px-1 py-4">Work Date</th>
                            <th scope="col" className=" px-1 py-4">Name</th>
                            <th scope="col" className=" px-1 py-4">Phone</th>
                            <th scope="col" className=" px-1 py-4">Description</th>
                            <th scope="col" className=" px-1 py-4">Approval</th>
                            <th scope="col" className=" px-1 py-4">Evidence</th>
                            {canUpdate !==0||canDelete !==0?<th scope="col" className=" px-1 py-4">Action</th>:null}
                        </tr>
                        </thead>
                        <tbody>
                        {canRead!==0?listSick.map((data, index)=>{
                            const isPast = dayjs(data.startDate.split(', ')[1],'DD-MM-YYYY').isBefore(dayjs(), 'day')
                            const removeAction = isPast || data.approval!==0
                            return <tr className="border-b" key={index}>
                                <td className="whitespace-nowrap  px-4 py-4 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.startDate}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.workDate}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.name}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.phoneNumber}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.desc}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.approval===2?"Approved":data.approval===1?"Rejected":"Waiting"}</td>
                                <td className="whitespace-nowrap  px-1 py-4">
                                    {data.evidence?<button className="p-2 focus:outline-none" onClick={()=>onPreview(data.evidence)}>
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16h16V8l-6-6H4z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
                                            <circle cx="11" cy="11" r="3" strokeLinecap="round" strokeLinejoin="round" />
                                            <line x1="13" y1="13" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>:null}
                                </td>{canUpdate !==0?
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

export default SickApprovalTable