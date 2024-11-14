import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState = {
    listUser : [],
    editValue:{},
    listGender:[],
    listWorkLocation:[],
    id:""
}


const User = createSlice({
    name:"user",
    initialState,
    reducers:{
        editUser:(state, {payload})=>{
            const findData = state.listUser.find((data) => data.id === payload)
            if(findData!==undefined){
                state.editValue=findData
                state.id=findData.id
            }
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllUser.fulfilled, (state, {payload})=>{
                return{
                    ...state,
                    listUser: payload
                }
            })
            .addCase(updateUser.fulfilled, ()=>{
                getAllUser()
            })
            .addCase(createUser.fulfilled, ()=>{
                getAllUser()
            })
            .addCase(getAllGender.fulfilled, (state,{payload})=>{
                return{
                    ...state,
                    listGender: payload
                }
            })
            .addCase(getWorkLocation.fulfilled, (state,{payload})=>{
                return{
                    ...state,
                    listWorkLocation: payload
                }
            })
    }
})

export const {editUser} = User.actions

export default User.reducer

export const getAllUser = createAsyncThunk("user/all", async ()=>{
    try {
        const response = await axios.get("/teams")
        return response.data
    }catch (e) {
        throw e.response.data
    }
})

export const deleteUser = createAsyncThunk("user/delete", async(data)=>{
    try {
        const response = await axios.delete(`/teams/${data}`)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})

export const updateUser = createAsyncThunk("user/update", async (data)=>{
    try {
        const response = await axios.put(`/teams/${data.id}`, data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})

export const getAllGender = createAsyncThunk("user/gender", async ()=>{
    try {
        const response = await axios.get("/gender")
        return response.data
    }catch (e) {
        throw e.response.data
    }
})

export const getWorkLocation = createAsyncThunk("user/workLocation", async ()=>{
    try {
        const response = await axios.get("/work-location")
        return response.data
    }catch (e) {
        throw e.response.data
    }
})

export const createUser = createAsyncThunk("user/create", async (data)=>{
    try {
        const response = await axios.post("/teams", data)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})

export const checkUserLocation = createAsyncThunk("user/checkLocation", async ()=>{
    try {
        const response = await axios.get("/teams-location")
        return response.data
    }catch (e) {
        throw e.response.data
    }
})
