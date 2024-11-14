import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import {allLeave, allSick, leaveApproval} from "../../store/reducer/attendance/leave.js";
import LeaveApprovalTable from "../../Components/tables/LeaveApprovalTable.jsx";
import SickApprovalTable from "../../Components/tables/SickApprovalTable.jsx";
import {wfhApproval} from "../../store/reducer/attendance/wfh.js";
import Toast from "../../utils/Toast.js";

const LeaveApproval =()=>{
    const dispatch = useDispatch()
    const {listAllLeave, listAllSick}=useSelector(state => state.LeaveRequest)
    const [updateTrigger, setUpdateTrigger] = useState(0)
    const getHistory = async (value) => {
        try {
            await dispatch(allLeave(value)).unwrap();
            await dispatch(allSick(value)).unwrap();
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
    }, [dispatch, updateTrigger]);
    const onChange = (e) => {
        const month = e["$M"] + 1;
        const year = e["$y"];
        const newRange = { month, year };
        getHistory(newRange);
    };
    const leaveApproved = async (id) => {
        try {
            await dispatch(leaveApproval({id, approval: 2})).unwrap()
            setUpdateTrigger(prev => prev + 1);
            await Toast.fire({
                icon: "success",
                title: "Approved"
            })
        } catch (err) {
            await Toast.fire({
                icon: "error",
                title: "Something Wrong"
            })
            console.log(err);
        }
    }
    const leaveReject = async (id) => {
        try {
            await dispatch(leaveApproval({id, approval: 1})).unwrap()
            setUpdateTrigger(prev => prev + 1);
            await Toast.fire({
                icon: "success",
                title: "Rejected"
            })
        } catch (err) {
            await Toast.fire({
                icon: "error",
                title: "Something Wrong"
            })
            console.log(err);
        }
    }
    return <>
        <div className="py-5 px-10 flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Leave Approval</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={'select range'} views={['month', 'year']} format={"MMM YYYY"} defaultValue={dayjs()}  onChange={onChange}/>
                </LocalizationProvider>
            </div>
            <LeaveApprovalTable listLeave={listAllLeave} approveFunc={leaveApproved} rejectFunc={leaveReject}/>
            <h1 className="text-2xl font-bold">Sick Approval</h1>
            <SickApprovalTable listSick={listAllSick} approveFunc={leaveApproved} rejectFunc={leaveReject}/>
        </div>
    </>
}

export default LeaveApproval