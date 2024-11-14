import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState ={
    listUserHistory:[]
}

const AttendanceHistory = createSlice({
    name:"attendance-history",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(userAttendanceHistory.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listUserHistory: data
                    }
                }else {
                    return{
                        ...state,
                        listUserHistory: []
                    }
                }
            })
    }
})




// export const {}=AttendanceHistory.actions

export default AttendanceHistory.reducer

export const userAttendanceHistory = createAsyncThunk('attendacehistory/user', async (data)=>{
    try{
        const response = await axios.post("/attendance-history", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})