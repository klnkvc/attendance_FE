import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState = {
    listRoles : [],
}


const Roles = createSlice({
    name:"roles",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getRole.fulfilled, (state, {payload})=>{
                return{
                    ...state,
                    listRoles: payload
                }
            })
    }
})

// export const {} = Roles.actions

export default Roles.reducer

export const getRole = createAsyncThunk("user/role", async ()=>{
    try {
        const response = await axios.get(`/role/`)
        return response.data
    }catch (e) {
        throw e.response.data
    }
})