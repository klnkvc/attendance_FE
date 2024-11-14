import {useForm} from "react-hook-form";
import OutlineInput from "../../Components/Inputs/OutlineInput.jsx";
import {useDispatch} from "react-redux";
import {createLeave} from "../../store/reducer/attendance/leave.js";
import {useEffect, useState} from "react";
import FormInputDate from "../../Components/Inputs/FormInputDate.jsx";
import OutlineMultilineInput from "../../Components/Inputs/OutlineMultilineInput.jsx";
import FormInputFile from "../../Components/Inputs/FormInputFile.jsx";
import Swal from "sweetalert2";

const LeaveRequest =()=>{
    const { handleSubmit, reset, control } = useForm()
    const dispatch = useDispatch()
    // const {leaveType} = useSelector(state => state.LeaveRequest)
    // const [leaveOptions, setLeaveOptions] = useState([])
    const [leaveType, setLeaveType] = useState(1)

    const changeLeaveType = (id)=>{
        setLeaveType(id)
        reset()
        console.log(leaveType)
    }
    useEffect(() => {
    }, [dispatch, reset]);
    const submit =async (data)=>{
        try {
            if (leaveType===1){
                const value ={
                    leaveTypeId:leaveType,
                    startDate:data.startDate,
                    workDate:data.workDate,
                    destinationCity:data.destinationCity,
                    destinationAddress:data.destinationAddress
                }
                console.log(value)
                await dispatch(createLeave(value)).unwrap()
            }
            if (leaveType===2){
                const value ={
                    leaveTypeId:leaveType,
                    startDate:data.startDate,
                    workDate:data.workDate,
                    desc:data.desc,
                    photo:data.evidence
                }
                console.log(value)
                await dispatch(createLeave(value)).unwrap()
            }
            await Swal.fire({
                title: "Success",
                text: "Requested",
                icon: "success"
            })
            reset()
        }catch (e) {
            await Swal.fire({
                title: "Error",
                text: "Something Wrong",
                icon: "error",
                showConfirmButton:false,
                timer:1500
            })
        }
    }
    return<>
        <div className='flex flex-row justify-center items-center'>
            <div className="bg-white w-1/3 h-fit flex flex-col p-5 items-center">
                <h1 className="text-3xl font-bold mb-4">Leave or Sick Form</h1>
                <div className="flex flex-row gap-5">
                    <button className="shadow bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded disabled:ring-4 disabled:hover:bg-blue-500" disabled={leaveType===1} onClick={()=>changeLeaveType(1)}>Leave</button>
                    <button className="shadow bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded disabled:ring-4 disabled:hover:bg-orange-400" disabled={leaveType===2} onClick={()=>changeLeaveType(2)}>Sick</button>
                </div>
                <form className="flex flex-col p-5 items-center w-2/3" onSubmit={handleSubmit(submit)}>
                    <div className="flex flex-col gap-2 w-full">
                        <FormInputDate name="startDate" control={control} label="Start Date" rules={{ required: { value: true, message: 'Required!' } }}/>
                        <FormInputDate name="workDate" control={control} label="Back to work at" rules={{ required: { value: true, message: 'Required!' } }}/>
                    </div>
                    {leaveType===1?
                        <>
                            <OutlineInput name={"destinationCity"} control={control} label={"Destination City"} rules={{ required: { value: true, message: 'Required!' } }}/>
                            <OutlineMultilineInput name={"destinationAddress"} control={control} label={"Destination Address"} rules={{ required: { value: true, message: 'Required!' } }}/>
                        </>
                        :null}
                    {leaveType===2?
                        <>
                            <OutlineMultilineInput name={"desc"} control={control} label={"Description"} rules={{ required: { value: true, message: 'Required!' } }}/>
                            <FormInputFile name="evidence" control={control} label="File Upload"/>
                        </>
                        :null}
                    <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Request</button>
                </form>
            </div>
        </div>

    </>
}

export default LeaveRequest