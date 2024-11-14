import {useDispatch, useSelector} from "react-redux";
import {allWfhHistory, wfhApproval} from "../../store/reducer/attendance/wfh.js";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import WfhApprovalTable from "../../Components/tables/WfhApprovalTable.jsx";
import Toast from "../../utils/Toast.js";

const WFHApproval =()=>{
    const dispatch = useDispatch()
    const {listWfhHistory}=useSelector(state => state.Wfh)
    const [updateTrigger, setUpdateTrigger] = useState(0)
    const getHistory = async (value) => {
        try {
            await dispatch(allWfhHistory(value)).unwrap()
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
    }, [dispatch, updateTrigger]);
    const onChange = (e) => {
        const month = e["$M"] + 1;
        const year = e["$y"];
        const newRange = { month, year };
        getHistory(newRange);
    }
    const WfhApproved = async (id) => {
        try {
            await dispatch(wfhApproval({id, approval: 2})).unwrap()
            setUpdateTrigger(prev => prev + 1);
            await Toast.fire({
                icon: "success",
                title: "WFH Approved"
            })
        } catch (err) {
            await Toast.fire({
                icon: "error",
                title: "Something Wrong"
            })
            console.log(err);
        }
    }
    const WfhReject = async (id) => {
        try {
            await dispatch(wfhApproval({id, approval: 1})).unwrap()
            setUpdateTrigger(prev => prev + 1);
            await Toast.fire({
                icon: "success",
                title: "WFH Rejected"
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
                <h1 className="text-2xl font-bold">WFH Approval</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={'select range'} views={['month', 'year']} format={"MMM YYYY"} defaultValue={dayjs()}  onChange={onChange}/>
                </LocalizationProvider>
            </div>
            <WfhApprovalTable listWfh={listWfhHistory} approveFunc={WfhApproved} rejectFunc={WfhReject}/>
        </div>
    </>
}

export default WFHApproval