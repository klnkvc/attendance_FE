import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState = {
    todayAttendance:[],
    attendanceId:null,
    clockIn:null,
    clockOut:null,
    workType:null
}

const Attendance = createSlice({
    name:"attendance",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchTodayAttendance.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0) {
                    return {
                        ...state,
                        todayAttendance: data,
                        attendanceId: data[0].id,
                        clockIn: data[0].clockIn,
                        clockOut: data[0].clockOut,
                        workType: data[0].workTypeId
                    };
                } else {
                    return {
                        ...state,
                        todayAttendance: [],
                        attendanceId: null,
                        clockIn: null,
                        clockOut: null,
                        workType: null
                    };
                }
            })
    }
})

// export const {} = Attendance.actions
export default Attendance.reducer
export const fetchTodayAttendance = createAsyncThunk("attendance/today", async ()=>{
    try {
        const response =await axios.get("/attendance-user")
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const wfoClockIn = createAsyncThunk("attendance/wfoin", async ()=>{
    try {
        const response =await axios.post("/wfo")
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const wfhClockIn = createAsyncThunk("attendance/wfhin", async (data)=>{
    try {
        const response =await axios.post("/wfh", data, {headers: {
                'Content-Type': 'multipart/form-data'
            }})
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const wfoClockOut = createAsyncThunk("attendance/wfoout", async (data)=>{
    try {
        const response =await axios.put(`/wfo/${data}`)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const wfhClockOut = createAsyncThunk("attendance/wfhout", async (data)=>{
    try {
        const response =await axios.put(`/wfh/${data[0]}`, data[1])
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
