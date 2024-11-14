import AttendanceReportTable from "../tables/AttendanceReportTable.jsx";
import {useDispatch, useSelector} from "react-redux";
import {userAttendanceReport, userLeaveReport, userSickReport} from "../../store/reducer/report/report.js";
import {useEffect} from "react";
import LeaveReportTable from "../tables/LeaveReportTable.jsx";
import SickReportTable from "../tables/SickReportTable.jsx";
import Swal from "sweetalert2";

const AttendanceDetailModal=({detailData,isOpen,onClose})=>{
    const dispatch = useDispatch()
    const {listUserAttendance,listUserSick,listUserLeave}=useSelector(state => state.Report)

    const getReport = async (value) => {
        try {
            await dispatch(userAttendanceReport(value)).unwrap();
            await dispatch(userLeaveReport(value)).unwrap();
            await dispatch(userSickReport(value)).unwrap();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (isOpen && detailData) {
            const { month, year } = detailData.range;
            const userId = detailData.id;
            getReport({ month, year, userId });
        }
    }, [detailData, isOpen]);
    const cancel =()=>{
        onClose()
    }

    if (!isOpen || !detailData) return null

    console.log("detailData")
    console.log(detailData)
    console.log(listUserAttendance)
    console.log(listUserLeave)
    console.log(listUserSick)

    const capitalizeEachWord=(str)=> {
        if (!str){
            return null
        }
        return str
            .split(' ')          // Split the string into an array of words
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )                    // Capitalize the first letter and lowercase the rest
            .join(' ');          // Join the array back into a string
    }
    const showLogbook=(data)=>{
        Swal.fire({
            title: "Logbook",
            text: data,
        });
    }
    const showImage=(data)=>{
        console.log(import.meta.env.VITE_APP_IMG_URL+data)
        Swal.fire({
            imageUrl:import.meta.env.VITE_APP_IMG_URL+data,
        })
    }

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={cancel}></div>

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-2/3 max-h-[80%] overflow-y-auto">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg font-semibold">{capitalizeEachWord(detailData.name)}</h3>
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
                    <div className="py-6 px-10 flex flex-col gap-5 max-h-[60vh] overflow-y-auto">
                        <div>
                            <h1 className="font-bold text-center pb-2">Attendance</h1>
                            <AttendanceReportTable listReport={listUserAttendance} showLogbook={showLogbook} showImage={showImage} />
                        </div>
                        <div>
                            <h1 className="font-bold text-center pb-2">Leave</h1>
                            <LeaveReportTable listReport={listUserLeave}/>
                        </div>
                        <div>
                            <h1 className="font-bold text-center pb-2">Sick</h1>
                            <SickReportTable listReport={listUserSick}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AttendanceDetailModal