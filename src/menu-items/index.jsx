import dashboard from "./dashboard.jsx";
import AttendanceList from "./AttendanceList.jsx";
import UserList from "./UserList.jsx";
import ProfileList from "./ProfileList.jsx";
import ApprovalList from "./ApprovalList.jsx";
import SignOut from "./SignOut.jsx";
import ReportList from "./ReportList.jsx";

const menuItems = ()=>({
    items:[
        // dashboard,
        // ProfileList(),
        UserList(),
        ApprovalList(),
        ReportList(),
        AttendanceList(),
        SignOut
    ]
})
export default menuItems
