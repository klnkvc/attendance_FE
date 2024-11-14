import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import WfhHistoryTable from "../../Components/tables/WfhHistoryTable.jsx";
import {userWfhHistory} from "../../store/reducer/attendance/wfh.js";
import Toast from "../../utils/Toast.js";

const WfhHistory =()=>{
    const dispatch = useDispatch()
    const {listUserWfhHistory}=useSelector(state => state.Wfh)

    const getHistory = async (value) => {
        try {
            await dispatch(userWfhHistory(value)).unwrap()
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
    }

    return <>
        <div className="py-5 px-10 flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">WFH History</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={'select range'} views={['month', 'year']} format={"MMM YYYY"} defaultValue={dayjs()}  onChange={onChange}/>
                </LocalizationProvider>
            </div>
            <WfhHistoryTable listWfh={listUserWfhHistory}/>
            {/*<UserHistoryTable listHistory={listUserHistory}/>*/}
        </div>
    </>
}

export default WfhHistory