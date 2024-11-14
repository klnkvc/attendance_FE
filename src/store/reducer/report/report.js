import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState ={
    listAttendanceReport:[],
    listUserAttendance:[],
    listUserSick:[],
    listUserLeave:[]
}

const Report = createSlice({
    name:'report',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(allAttendanceReport.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listAttendanceReport: data
                    }
                }else {
                    return{
                        ...state,
                        listAttendanceReport: []
                    }
                }
            })
            .addCase(userAttendanceReport.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listUserAttendance: data
                    }
                }else {
                    return{
                        ...state,
                        listUserAttendance: []
                    }
                }
            })
            .addCase(userSickReport.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listUserSick: data
                    }
                }else {
                    return{
                        ...state,
                        listUserSick: []
                    }
                }
            })
            .addCase(userLeaveReport.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listUserLeave: data
                    }
                }else {
                    return{
                        ...state,
                        listUserLeave: []
                    }
                }
            })
    }
})

// export const {}=Report.actions

export default Report.reducer

export const allAttendanceReport = createAsyncThunk('report/attendance', async (data)=>{
    try{
        const response = await axios.post("/report", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const userAttendanceReport = createAsyncThunk('report/userAttendance', async (data)=>{
    try{
        const response = await axios.post("/attendance-report", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const userSickReport = createAsyncThunk('report/userSick', async (data)=>{
    try{
        const response = await axios.post("/sick-report", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const userLeaveReport = createAsyncThunk('report/userLeave', async (data)=>{
    try{
        const response = await axios.post("/leave-report", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})