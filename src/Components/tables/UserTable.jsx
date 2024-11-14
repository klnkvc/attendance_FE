const UserTable = ({listUser, canCreate=1, canRead=1, canUpdate=1, canDelete=1, editFunc, deleteFunc})=>{
    return <div className="flex flex-col bg-white rounded shadow">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead
                            className="border-b font-medium">
                        <tr>
                            <th scope="col" className=" px-4 py-4">#</th>
                            <th scope="col" className=" px-1 py-4">Username</th>
                            <th scope="col" className=" px-1 py-4">Name</th>
                            <th scope="col" className=" px-1 py-4">Phone</th>
                            <th scope="col" className=" px-1 py-4">Work Location</th>
                            {canUpdate !==0||canDelete !==0?<th scope="col" className=" px-1 py-4">Action</th>:null}
                        </tr>
                        </thead>
                        <tbody>
                        {canRead!==0?listUser.map((data, index)=>{
                            return <tr className="border-b" key={index}>
                                <td className="whitespace-nowrap  px-4 py-4 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.username}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.name}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.phoneNumber}</td>
                                <td className="whitespace-nowrap  px-1 py-4">{data.workLocationId===1?"Onsite":"Remote"}</td>
                                {canUpdate !==0||canDelete !==0?
                                    <td className="whitespace-nowrap  px-1 py-4">
                                        {canUpdate !==0?
                                            <button className="p-2 focus:outline-none" onClick={()=>editFunc(data.id)}>
                                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h4l12-12-4-4L4 16v4zM14 6l4 4M12 8l-6 6" />
                                                </svg>
                                            </button>
                                            :null}
                                        {canDelete !==0?
                                            <button className="p-2 focus:outline-none" onClick={()=>deleteFunc(data.id)}>
                                                <svg className="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0V5a2 2 0 012-2h4a2 2 0 012 2v2m-7 0h8" />
                                                </svg>
                                            </button>
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

export default UserTable