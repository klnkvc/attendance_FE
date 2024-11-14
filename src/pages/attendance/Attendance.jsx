import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodayAttendance} from "../../store/reducer/attendance/attendance.js";
import AttendanceForm from "../../Components/AttendanceForm.jsx";
import {wfhCheck} from "../../store/reducer/attendance/wfh.js";
import {checkUserLocation} from "../../store/reducer/user-management/users.js";
import {checkLeave} from "../../store/reducer/attendance/leave.js";

const Attendance=()=>{
    const dispatch = useDispatch()
    const todayAttendance = useSelector(state=>state.Attendance)
    const [formStatus, setFormStatus]= useState(0)
    const [wfhData, setWfhData]= useState([])
    const [loading, setLoading] = useState(true)
    const [workLocation, setWorkLocation] = useState("")
    const [isLeave, setIsLeave]=useState([])

    const getTodayAttendance = async ()=>{
        try {
            await dispatch(fetchTodayAttendance()).unwrap()
            const response = await dispatch(wfhCheck()).unwrap()
            setWfhData(response.data)
            const locationResponse = await dispatch(checkUserLocation()).unwrap()
            setWorkLocation(locationResponse.data[0].name)
            const leaveResponse = await dispatch(checkLeave()).unwrap()
            setIsLeave(leaveResponse.data)
        } catch (err) {
            console.error(err)
        }finally {
            setLoading(false)  // Set loading to false once data is fetched
        }
    }

    useEffect( ()=>{
        getTodayAttendance()
    }, [dispatch])

    useEffect(() => {
        if (!loading) {
            if (isLeave.length===1){
                setFormStatus(4)
                console.log("SET STATUS TO 4")
            }else {
                checkStatus()
            }
        }
    }, [todayAttendance, loading])
    console.log(todayAttendance)

    // get Day
    const d = new Date()
    let day = d.getDay()

    const checkStatus = ()=>{
        console.log("Check Status Running")
        if (day===0||day===6) {
            setFormStatus(5)
        }else if (todayAttendance.clockIn===null && todayAttendance.clockOut===null) {
            setFormStatus(1)
        }else if (todayAttendance.clockIn!==null && todayAttendance.clockOut===null) {
            setFormStatus(2)
        }else if (todayAttendance.clockIn!==null && todayAttendance.clockOut!==null) {
            setFormStatus(3)
        }
    }
    const handleRefresh = async () => {
        setLoading(true)
        await getTodayAttendance();
    }
    const checkWorkLocation = ()=>{
        if (wfhData.length===1){
            console.log("WFH CHECK")
            return 2
        }
        if (workLocation==="onsite"){
            console.log("Onsite CHECK")
            return 1
        }
        if (workLocation==="remote"){
            console.log("Remote CHECK")
            return 2
        }
    }
    console.log(todayAttendance)
    console.log(isLeave.length)
    return<>
        <AttendanceForm status={formStatus} workStatus={todayAttendance.workType??checkWorkLocation()} onRefresh={handleRefresh} id={todayAttendance.attendanceId}/>
    </>
}
export default Attendance



//form status
//1 = not clocked in
//2 = just clocked in
//3 = just clocked out
//4 = weekend