import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import {allAttendanceReport} from "../../store/reducer/report/report.js";
import ReportTable from "../../Components/tables/ReportTable.jsx";
import AttendanceDetailModal from "../../Components/modals/AttendanceDetailModal.jsx";
import Toast from "../../utils/Toast.js";
import Swal from "sweetalert2";

const AttendanceReport = ()=>{
    const dispatch = useDispatch()
    const {listAttendanceReport}=useSelector(state => state.Report)
    const [showModal, setShowModal] = useState(false)
    const [detailData, setDetailData]=useState({})

    const getHistory = async (value) => {
        try {
            await dispatch(allAttendanceReport(value)).unwrap()
        } catch (err) {
            console.log(err);
            await Toast.fire({
                icon: "error",
                title: "Couldn't get data"
            })
        }
    };
    useEffect(() => {
        const initialDate = dayjs();
        const value = {
            month: initialDate.month() + 1,
            year: initialDate.year()
        };
        setDetailData({...detailData,range:value})
        getHistory(value);
    }, [dispatch]);
    const onChange = (e) => {
        const month = e["$M"] + 1;
        const year = e["$y"];
        const newRange = { month, year };
        setDetailData({...detailData,range:newRange})
        getHistory(newRange);
    }
    const reportDetail = async ({id, name}) => {
        try {
            setDetailData({...detailData,id:id,name:name})
            setShowModal(true)
        } catch (err) {
            console.log(err);
            setShowModal(false)
            await Swal.fire({
                title:"Failed",
                text:"Couldn't get data",
                icon:"error"
            })
        }
    }
    const closeModal = ()=>{
        setShowModal(false)
    }
    console.log(detailData.name)
    return <>
        <div className="py-5 px-10 flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Attendance Report</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={'select range'} views={['month', 'year']} format={"MMM YYYY"} defaultValue={dayjs()}  onChange={onChange}/>
                </LocalizationProvider>
            </div>
            <ReportTable listReport={listAttendanceReport} detailFunc={reportDetail} />
        </div>
        <AttendanceDetailModal isOpen={showModal} onClose={closeModal} detailData={detailData} />
    </>
}
export default AttendanceReport