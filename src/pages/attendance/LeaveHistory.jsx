import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {userAttendanceHistory} from "../../store/reducer/attendance/attendance-history.js";
import {userLeaveHistory, userSickHistory} from "../../store/reducer/attendance/leave-history.js";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import UserHistoryTable from "../../Components/tables/UserHistoryTable.jsx";
import LeaveHistoryTable from "../../Components/tables/LeaveHistoryTable.jsx";
import SickHistoryTable from "../../Components/tables/SickHistoryTable.jsx";
import Toast from "../../utils/Toast.js";

const LeaveHistory =()=>{
    const dispatch = useDispatch()
    const {listUserLeaveHistory, listUserSickHistory}=useSelector(state => state.LeaveHistory)

    const getHistory = async (value) => {
        try {
            await dispatch(userLeaveHistory(value)).unwrap();
            await dispatch(userSickHistory(value)).unwrap();
        } catch (err) {
            console.log(err);
            await Toast.fire({
                icon: "error",
                title: "Couldn't get data"
            })
        }
    }

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

    return <>
        <div className="py-5 px-10 flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Leave History</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={'select range'} views={['month', 'year']} format={"MMM YYYY"} defaultValue={dayjs()}  onChange={onChange}/>
                </LocalizationProvider>
            </div>
            <LeaveHistoryTable listHistory={listUserLeaveHistory}/>
            <h1 className="text-2xl font-bold">Sick History</h1>
            <SickHistoryTable listHistory={listUserSickHistory}/>
        </div>
    </>
}

export default LeaveHistory