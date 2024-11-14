import filterAccess from "../utils/FilterAccess.js";
import AssignmentIcon from '@mui/icons-material/Assignment';
const children = [
    {
        id:"74865474-6adb-44dd-b4b8-2ebf6b3689fe",
        title:"Attendance Report",
        url:"/attendance-report",
        icon:<AssignmentIcon/>
    },

]

const ReportList = ()=>{
    return filterAccess(children)
}

export default ReportList