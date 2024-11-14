import filterAccess from "../utils/FilterAccess.js";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined.js";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun.js";

const children = [
    {
        id:"37cc9851-a243-4790-8951-4e32cd94046d",
        title:"WFH Approval",
        url:"/wfh-approval",
        icon:<HomeWorkOutlinedIcon/>
    },
    {
        id:"b4d87df1-bc58-435c-8df7-6cf63766466a",
        title:"Leave Approval",
        url:"/leave-approval",
        icon:<DirectionsRunIcon/>
    },

]

const ApprovalList = ()=>{
    return filterAccess(children)
}

export default ApprovalList