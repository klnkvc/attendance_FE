import Swal from "sweetalert2";

const onPreview  = (name)=>{
    console.log(import.meta.env.VITE_APP_IMG_URL+name)
    Swal.fire({
        imageUrl:import.meta.env.VITE_APP_IMG_URL+name,
    })
}

const SickHistoryTable = ({listHistory, canCreate=1, canRead=1, canUpdate=1, canDelete=1})=>{
    return <div className="flex flex-col bg-white rounded shadow">
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
                            <th scope="col" className=" px-1 py-4">Description</th>
                            <th scope="col" className=" px-1 py-4">Approval</th>
                            <th scope="col" className=" px-1 py-4">Evidence</th>
                        </tr>
                        </thead>
                        <tbody>
                        {canRead!==0?listHistory.map((data, index)=>{
                            return <tr className="border-b" key={index}>
                                <td className="whitespace-nowrap  px-4 py-4 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.startDate}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.workDate}</td>
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

export default SickHistoryTable