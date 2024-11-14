import {combineReducers} from "@reduxjs/toolkit";
import Auth from "./auth.js";
import Attendance from "./attendance/attendance.js"
import AttendanceHistory from "./attendance/attendance-history.js"
import User from "./user-management/users.js"
import Roles from "./user-management/roles.js";
import LeaveRequest from "./attendance/leave.js";
import LeaveHistory from "./attendance/leave-history.js";
import Wfh from "./attendance/wfh.js";
import Report from "./report/report.js";

const reducer=combineReducers({
    Auth,
    Attendance,
    AttendanceHistory,
    User,
    Roles,
    LeaveRequest,
    LeaveHistory,
    Wfh,
    Report
})

export default reducer