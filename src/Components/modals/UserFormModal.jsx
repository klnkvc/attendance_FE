import {useForm} from "react-hook-form";
import OutlineInput from "../Inputs/OutlineInput.jsx";
import {useEffect, useState} from "react";
import OutlineSelectInput from "../Inputs/OutlineSelectInput.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getRole} from "../../store/reducer/user-management/roles.js";
import {getAllGender, getWorkLocation} from "../../store/reducer/user-management/users.js";
import FormInputPass from "../Inputs/FormInputPass.jsx";
import Swal from "sweetalert2";

const UserFormModal=({title,isOpen,onClose,editMode,editValue,onSubmit})=>{
    const {control, handleSubmit, setValue,reset, formState:{errors}} = useForm()
    const dispatch = useDispatch()
    const {listRoles} = useSelector(state => state.Roles)
    const {listGender, listWorkLocation} = useSelector(state => state.User)
    const [roleOptions, setRoleOptions] = useState([])
    const [genderOptions, setGenderOptions] = useState([])
    const [locationOptions, setLocationOptions] = useState([])
    const [passShow, setPassShow] = useState(false)
    const [confShow,setConfShow]=useState(false)

    const changeShow = (setState, value)=>{
        setState(!value)
    }
    const handleMouseDownPassword = (event)=>{
        event.preventDefault();
    }

    const inititalData = async ()=>{
        try {
            await dispatch(getRole()).unwrap();
            await dispatch(getAllGender()).unwrap();
            await dispatch(getWorkLocation()).unwrap();
        } catch (err) {
            console.error(err);
            cancel()
            await Swal.fire({
                title:"Failed",
                icon:"error"
            })
        }
    }

    useEffect(() => {
        if (isOpen) {
            setRoleOptions([]);
            setGenderOptions([]);
            setLocationOptions([]);
            inititalData();
            if (editMode) {
                setValue('username', editValue.username);
                setValue('name', editValue.name);
                setValue('email', editValue.email);
                setValue('phoneNumber', editValue.phoneNumber);
                setValue('role', editValue.roleId);
                setValue('gender', editValue.genderId);
                setValue('location', editValue.workLocationId);
            }
        } else {
            reset();
        }
    }, [isOpen, editMode, editValue, dispatch, setValue, reset]);

    useEffect(() => {
        const newRoleOptions = listRoles.map(data => ({
            value: data.id,
            label: data.name
        }))
        const newGenderOptions = listGender.map(data => ({
            value: data.id,
            label: data.name
        }))
        const newLocationOptions = listWorkLocation.map(data => ({
            value: data.id,
            label: data.name
        }))
        setRoleOptions(newRoleOptions)
        setGenderOptions(newGenderOptions)
        setLocationOptions(newLocationOptions)
    }, [listRoles, listGender, listWorkLocation])

    console.log("listRoles")
    console.log(roleOptions)
    console.log(genderOptions)
    console.log(locationOptions)

    if (!isOpen) return null // Don't render the modal if it's not open

    // console.log(editMode)
    //
    // console.log(editValue)
    const submit = (data)=>{
        onSubmit(data)
    }
    const cancel =()=>{
        onClose()
        reset()

    }

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={cancel}></div>

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-1/3">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={cancel}
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">
                        <form onSubmit={handleSubmit(submit)}>
                            <OutlineInput name={"username"} control={control} label={"Username"} disable={editMode??true} rules={{
                                required: { value: editMode ? false : true, message: 'Required!' },
                                pattern: {
                                    value: /^[a-z]*$/,
                                    message: 'Invalid username, tidak boleh ada spasi, angka, huruf kapital dan simbol!'
                                }}}/>
                            <OutlineInput name={"name"} control={control} label={"Name"} rules={{ required: { value: true, message: 'Required!' } }}/>
                            <OutlineInput name={"email"} control={control} label={"Email"} rules={{ required: { value: true, message: 'Required!' } }}/>
                            <OutlineInput name={"phoneNumber"} control={control} label={"Phone Number (+62)"} inputType={"number"} rules={{
                                pattern: {
                                    value: /^8[1-9][0-9]{7,12}$/,
                                    message: 'Invalid phone number!'
                                }}}/>
                            <OutlineSelectInput name={"location"} control={control} label={"Work Location"} options={locationOptions} rules={{ required: { value: true, message: 'Required!' } }}/>
                            <OutlineSelectInput name={"role"} control={control} label={"Role"} options={roleOptions} rules={{ required: { value: true, message: 'Required!' } }}/>
                            <OutlineSelectInput name={"gender"} control={control} label={"Gender"} options={genderOptions} rules={{ required: { value: true, message: 'Required!' } }}/>
                            {!editMode?
                                <div className="mt-2 mb-4 flex flex-col gap-3">
                                    <FormInputPass name={"password"} label={"Password"} control={control} showPassword={passShow} handleClickShowPassword={()=>changeShow(setPassShow,passShow)} handleMouseDownPassword={handleMouseDownPassword} rules={{ required: { value: true, message: 'Required!' } }}/>
                                    <FormInputPass name={"confPass"} label={"Confirm Password"} control={control} showPassword={confShow} handleClickShowPassword={()=>changeShow(setConfShow,confShow)} handleMouseDownPassword={handleMouseDownPassword} rules={{ required: { value: true, message: 'Required!' } }}/>
                                </div>
                                :null}
                            <div className="flex flex-row gap-2 justify-center">
                                <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">{editMode?"Update":"Save"}</button>
                                <button type="button" className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={cancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserFormModal