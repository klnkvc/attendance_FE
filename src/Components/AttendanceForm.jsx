import {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import FormInputText from "./Inputs/FormInputText.jsx";
import {useForm} from "react-hook-form";
import CameraComponents from "./CameraComponents.jsx";
import FormInputMultiline from "./Inputs/FormInputMultiline.jsx";
import {wfhClockIn, wfhClockOut, wfoClockIn, wfoClockOut} from "../store/reducer/attendance/attendance.js";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
const AttendanceForm = ({status, workStatus=1, onRefresh, id})=>{
    const [workType, setWorkType] = useState(workStatus)
    const [showModal, setShowModal]=useState()
    const [image,setImage] = useState(null)
    const [isPreview, setIsPreview] =useState(null)
    const webcamRef = useRef(null)
    const dispatch = useDispatch()

    const { handleSubmit, control } = useForm()
    useEffect(() => {
        setWorkType(workStatus);  // Update workType whenever workStatus prop changes
    }, [workStatus])
    const onClockIn = async (data)=> {
        try {
            if (workType===2){
                if (data.location ===undefined ||data.location ===""){
                    console.log("No Location")
                    await Swal.fire({
                        title: "Warning",
                        text: "Please Insert Location",
                        icon: "warning"
                    })
                    return null
                }
                if (image === null) {
                    console.log("No Image")
                    await Swal.fire({
                        title: "Warning",
                        text: "Please Capture Image",
                        icon: "warning"
                    })
                    return null
                }
                const blob = await fetch(image).then(res => res.blob());
                const file = new File([blob], 'webcam-image.jpg', { type: 'image/jpeg' });

                const payload={
                    wfhLoc:data.location,
                    photo: file
                }

                console.log(payload)
                console.log("WFH Clock In")
                await dispatch(wfhClockIn(payload)).unwrap();
                await Swal.fire({
                    title: "Success",
                    text: "Clocked In",
                    icon: "success"
                })
            } else {
                console.log("WFO Clock In")
                await dispatch(wfoClockIn()).unwrap();
                await Swal.fire({
                    title: "Success",
                    text: "Clocked In",
                    icon: "success"
                })
            }
            onRefresh()
        }catch (e) {
            console.log(e)
            await Swal.fire({
                title: "Error",
                text: "Something Wrong",
                icon: "error",
                showConfirmButton:false,
                timer:1500
            })
        }
    }
    const onClockOut = async (data)=>{
        try {
            if (workType===2){
                if (data.logbook===undefined||data.logbook===""){
                    console.log("No Logbook")
                    await Swal.fire({
                        title: "Warning",
                        text: "Please Insert Logbook",
                        icon: "warning"
                    })
                    return null
                }
                const payload={
                    logbook: data.logbook,
                }
                console.log(payload)
                console.log("WFH Clock Out")
                await dispatch(wfhClockOut([id,payload])).unwrap()
                await Swal.fire({
                    title: "Success",
                    text: "Clocked Out",
                    icon: "success"
                })
            }else {
                console.log("WFo Clock Out")
                await dispatch(wfoClockOut(id)).unwrap();
                await Swal.fire({
                    title: "Success",
                    text: "Clocked Out",
                    icon: "success"
                })
            }
            onRefresh()
        }catch (e) {
            console.log(e)
            await Swal.fire({
                title: "Error",
                text: "Something Wrong",
                icon: "error",
                showConfirmButton:false,
                timer:1500
            })
        }
    }

    const capture = useCallback(()=>{
        const imageSrc = webcamRef.current.getScreenshot()
        setIsPreview(true)
        setImage((imageSrc))
    }, [webcamRef])

    const retake = ()=>{
        setIsPreview(false)
        setImage(false)
    }

    const ImageSubmit = async()=>{
        console.log(image)
        console.log("image")
        setIsPreview(false)
        setShowModal(false)
    }
    return <>
        <div className='flex flex-row justify-center items-center'>
            <div className="bg-white w-1/3 h-fit flex flex-col p-5 items-center">
                <h1 className="text-3xl font-bold">
                    {status===1 ? "Let's Clock In":
                        status===2 ? "Time To Clock Out":
                            status===3?"You've Just Clocked Out":
                                status===4?"You're On Leave":"It's weekend, get some holiday"}
                </h1>
                <form className="flex flex-col p-5 items-center gap-5 w-2/3" onSubmit={handleSubmit(status===1?onClockIn:onClockOut)}>
                    {status ===1?
                        <>
                            {workType===2?
                                <>
                                    <p>Location details</p>
                                    <FormInputText name="location" control={control}/>

                                    <p>Take a picture</p>
                                    <button type={"button"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setShowModal(true)}>Capture Image</button>
                                </>
                                :null}

                            <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Clock In</button>
                        </>
                        : null
                    }
                    {status ===2?
                        <>
                            {workType ===2? <div className="w-full text-center">
                                    <p>What have you done today?</p>
                                    <FormInputMultiline name="logbook" control={control}/>
                                </div>
                                :null}
                            <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Clock Out</button>
                        </>
                        :null
                    }

                    {status===3||status===4||status===5?
                        status===3? <p>See You Tomorrow</p>:
                            status===4?<p> See You at Work</p>:
                                <p> See You at Monday</p>:
                        null
                    }
                </form>
            </div>
        </div>

        {/*Camera Modal*/}
        {showModal ? (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Take Attendance Photo
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto flex flex-col items-center gap-5">
                                {!isPreview?<CameraComponents webcamRef={webcamRef}/>:<img src={image} alt="Captured"/>}
                                {!isPreview?
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>capture()}>Capture Image</button>
                                    :
                                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={()=>retake()}>Retake</button>
                                }
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={ImageSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
    </>
}

AttendanceForm.propTypes = {
    status: PropTypes.number.isRequired, // or PropTypes.any.isRequired if it can be any type
    workStatus: PropTypes.number,
    onRefresh:PropTypes.func.isRequired,
    id: PropTypes.string,
};

export default AttendanceForm