import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import FormInputDate from "../../Components/Inputs/FormInputDate.jsx";
import OutlineInput from "../../Components/Inputs/OutlineInput.jsx";
import {createWfhRequest} from "../../store/reducer/attendance/wfh.js";
import Swal from "sweetalert2";

const WfhRequest =()=>{
    const { handleSubmit, reset, control, setValue } = useForm()
    const dispatch = useDispatch()

    const submit =async (data)=>{
        try {
            console.log(data)
            await dispatch(createWfhRequest(data)).unwrap()
            await Swal.fire({
                title: "Success",
                text: "WFH Requested",
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
                <h1 className="text-3xl font-bold mb-4">WFH Request</h1>
                <form className="flex flex-col p-5 items-center w-2/3" onSubmit={handleSubmit(submit)}>
                    <FormInputDate name="date" control={control} label="Date" rules={{ required: { value: true, message: 'Required!' } }}/>
                    <OutlineInput name={"location"} control={control} label={"Location"} rules={{ required: { value: true, message: 'Required!' } }}/>
                    <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Request</button>
                </form>
            </div>
        </div>

    </>
}

export default WfhRequest