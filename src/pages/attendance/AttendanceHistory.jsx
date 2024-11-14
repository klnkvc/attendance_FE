import {useDispatch, useSelector} from "react-redux";
import {userAttendanceHistory} from "../../store/reducer/attendance/attendance-history.js";
import {useEffect} from "react";
import UserHistoryTable from "../../Components/tables/UserHistoryTable.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Toast from "../../utils/Toast.js";

const AttendanceHistory =()=>{
    const dispatch = useDispatch()
    const {listUserHistory}=useSelector(state => state.AttendanceHistory)

    const getHistory = async (value) => {
        try {
            await dispatch(userAttendanceHistory(value)).unwrap();
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
        getHistory(value);
    }, [dispatch]);

    const onChange = (e) => {
        const month = e["$M"] + 1;
        const year = e["$y"];
        const newRange = { month, year };
        getHistory(newRange);
    };

    return <div>
        <div className="py-5 px-10 flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Attendance History</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={'select range'} views={['month', 'year']} format={"MMM YYYY"} defaultValue={dayjs()}  onChange={onChange}/>
                </LocalizationProvider>
            </div>
            <UserHistoryTable listHistory={listUserHistory}/>
        </div>
    </div>
}
export default AttendanceHistory