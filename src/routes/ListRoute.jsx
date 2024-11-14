import Dashboard from "../pages/Dashboard.jsx";
import Attendance from "../pages/attendance/Attendance.jsx";
import Users from "../pages/user-management/Users.jsx";
import AttendanceHistory from "../pages/attendance/AttendanceHistory.jsx";
import LeaveRequest from "../pages/attendance/LeaveRequest.jsx";
import Profile from "../pages/profile/Profile.jsx";
import LeaveHistory from "../pages/attendance/LeaveHistory.jsx";
import WFHApproval from "../pages/approval/WFHApproval.jsx";
import LeaveApproval from "../pages/approval/LeaveApproval.jsx";
import SignOut from "../Components/SignOut.jsx";
import WfhRequest from "../pages/attendance/WfhRequest.jsx";
import WfhHistory from "../pages/attendance/WfhHistory.jsx";
import AttendanceReport from "../pages/reports/AttendanceReport.jsx";

const route = [
    {
        id: "allow",
        path: 'dashboard',
        element: <Dashboard/>
    },
    {
        id: "746e8476-0dbd-490a-86c4-e66308a7ea40",
        path: 'attendance',
        element: <Attendance/>
    },
    {
        id: "8829a91b-85dc-400c-82b0-4dcaed595b9f",
        path: 'attendance-history',
        element: <AttendanceHistory/>
    },
    {
        id: "22fc5e7f-76c8-41c2-91e0-ae7d6ff90eb2",
        path: 'leave-history',
        element: <LeaveHistory/>
    },
    {
        id: "4a4b87af-6584-41ef-9396-850e7bba1756",
        path: 'user-management',
        element: <Users/>
    },
    {
        id: "00a5450e-7ada-4f43-95e2-b0e39bac7d6d",
        path: 'leave-request',
        element: <LeaveRequest/>
    },
    {
        id: "5cb0c1c8-8126-4d5d-a778-a661742c8b26",
        path: 'profile',
        element: <Profile/>
    },
    {
        id: "37cc9851-a243-4790-8951-4e32cd94046d",
        path: 'wfh-approval',
        element: <WFHApproval/>
    },
    {
        id: "b4d87df1-bc58-435c-8df7-6cf63766466a",
        path: 'leave-approval',
        element: <LeaveApproval/>
    },
    {
        id: "allow",
        path: 'signout',
        element: <SignOut/>
    },
    {
        id: "fa1e2e9c-2ef6-4241-8a08-a9b8c4f9fbca",
        path: 'wfh',
        element: <WfhRequest/>
    },
    {
        id: "2746071d-d5ca-496a-8694-87550a622db7",
        path: 'wfh-history',
        element: <WfhHistory/>
    },
    {
        id: "74865474-6adb-44dd-b4b8-2ebf6b3689fe",
        path: 'attendance-report',
        element: <AttendanceReport/>
    },
]

export default route