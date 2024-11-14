import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState ={
    listUserWfhHistory:[],
    listWfhHistory:[],
}

const Wfh = createSlice({
    name:'wfh',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(userWfhHistory.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listUserWfhHistory: data
                    }
                }else {
                    return{
                        ...state,
                        listUserWfhHistory: []
                    }
                }
            })
            .addCase(allWfhHistory.fulfilled, (state, {payload})=>{
                const {data} = payload
                if (data && data.length > 0){
                    return{
                        ...state,
                        listWfhHistory: data
                    }
                }else {
                    return{
                        ...state,
                        listWfhHistory: []
                    }
                }
            })
    }
})

// export const {}=Wfh.actions

export default Wfh.reducer

export const createWfhRequest = createAsyncThunk('wfh/request',async (data)=>{
    try {
        const response = await axios.post("/wfh-request", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const userWfhHistory = createAsyncThunk('wfh/history', async (data)=>{
    try{
        const response = await axios.post("/wfh-history", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const allWfhHistory = createAsyncThunk('wfh/allhistory', async (data)=>{
    try{
        const response = await axios.post("/wfh-allhistory", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const wfhApproval = createAsyncThunk('wfh/approval', async (data)=>{
    try{
        const response = await axios.put(`/wfh-approval/${data.id}`, data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
export const wfhCheck = createAsyncThunk('wfh/check', async ()=>{
    try{
        const response = await axios.get(`/wfh-check/`)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})