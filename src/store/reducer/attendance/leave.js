import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState ={
    leaveType:[],
    leaveList:[],
    listAllLeave:[],
    listAllSick:[]
}

const Leave = createSlice({
    name:"leave-request",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getLeaveType.fulfilled, (state, {payload})=>{
                const data = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        leaveType: data
                    }
                }else {
                    return{
                        ...state,
                        leaveType: []
                    }
                }
            })
            .addCase(allLeave.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listAllLeave: data
                    }
                }else {
                    return{
                        ...state,
                        listAllLeave: []
                    }
                }
            })
            .addCase(allSick.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listAllSick: data
                    }
                }else {
                    return{
                        ...state,
                        listAllSick: []
                    }
                }
            })
    }
})




// export const {}=Leave.actions

export default Leave.reducer

export const getLeaveType = createAsyncThunk('leavereq/type', async ()=>{
    try{
        const response = await axios.get("/leave-type")
        return response.data
    }catch (e) {
        throw e.response.data
    }
})

export const createLeave = createAsyncThunk("leavereq/create", async(data)=>{
    try{
        const response = await axios.post("/leave", data, {headers: {
                'Content-Type': 'multipart/form-data'
            }})
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const allLeave = createAsyncThunk('leave/allleave', async (data)=>{
    try{
        const response = await axios.post("/leave-all", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const allSick = createAsyncThunk('leave/allsick', async (data)=>{
    try{
        const response = await axios.post("/sick-all", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const leaveApproval = createAsyncThunk('leave/approval', async (data)=>{
    try{
        const response = await axios.put(`/leave-approval/${data.id}`, data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const checkLeave = createAsyncThunk('leave/check', async ()=>{
    try{
        const response = await axios.get(`/leave-check`)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
