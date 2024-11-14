import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState ={
    listUserLeaveHistory:[],
    listUserSickHistory:[]
}

const leaveHistory = createSlice({
    name:"leave-history",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(userLeaveHistory.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listUserLeaveHistory: data
                    }
                }else {
                    return{
                        ...state,
                        listUserLeaveHistory: []
                    }
                }
            })
            .addCase(userSickHistory.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listUserSickHistory: data
                    }
                }else {
                    return{
                        ...state,
                        listUserSickHistory: []
                    }
                }
            })
    }
})




// export const {}=AttendanceHistory.actions

export default leaveHistory.reducer

export const userLeaveHistory = createAsyncThunk('leavehistory/userleave', async (data)=>{
    try{
        const response = await axios.post("/leave-history", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const userSickHistory = createAsyncThunk('leavehistory/usersick', async (data)=>{
    try{
        const response = await axios.post("/sick-history", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})