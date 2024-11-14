import filterAccess from "../utils/FilterAccess.js";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';

const children = [
    {
        id:"746e8476-0dbd-490a-86c4-e66308a7ea40",
        title:"Attendance",
        url:"/attendance",
        icon:<AccessTimeFilledIcon/>
    },
    {
        id:"fa1e2e9c-2ef6-4241-8a08-a9b8c4f9fbca",
        title:"WFH Request",
        url:"/wfh",
        icon:<HomeWorkIcon/>
    },
    {
        id:"00a5450e-7ada-4f43-95e2-b0e39bac7d6d",
        title:"Leave Request",
        url:"/leave-request",
        icon:<DirectionsRunIcon/>
    },
    {
        id:"8829a91b-85dc-400c-82b0-4dcaed595b9f",
        title:"Attendance History",
        url:"/attendance-history",
        icon:<AccessTimeOutlinedIcon/>
    },
    {
        id:"2746071d-d5ca-496a-8694-87550a622db7",
        title:"WFH History",
        url:"/wfh-history",
        icon:<HomeWorkOutlinedIcon/>
    },
    {
        id:"22fc5e7f-76c8-41c2-91e0-ae7d6ff90eb2",
        title:"Leave History",
        url:"/leave-history",
        icon:<DirectionsRunIcon/>
    },

]

const AttendanceList = ()=>{
    return filterAccess(children)
}

export default AttendanceList