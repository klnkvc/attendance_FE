import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import axios from "../../utils/axios.js";

const initialState ={
  isLogin:false,
  name:"",
  username:"",
  workLocation:"",
  token:localStorage.getItem("Authorization"),
  listModuleAccess:[]
}

const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData:(state)=>{
      if(state.token !== null){
        state.isLogin=true
        const splitToken = state.token.split(" ")
        const decodeToken = jwtDecode((splitToken[1]))
        state.username=decodeToken.username
        state.name=decodeToken.name
        state.workLocation=decodeToken.workLocation
        state.listModuleAccess=decodeToken.listModuleAccess
      }
    },
    logout:(state)=>{
      localStorage.removeItem("Authorization")
      state.username=""
      state.name=""
      state.token=null
      state.isLogin=false
      state.workLocation=""
      state.listModuleAccess=[]
    }
  },
  extraReducers:(builder)=>{
    builder
        .addCase(login.fulfilled, (state, {payload})=>{
          const {authorization} = payload
          localStorage.setItem("Authorization", `${authorization}`)
          return{
            ...state,
            isLogin:true,
            token:authorization
          }
        })
  }
});

export const {logout, setUserData} =Auth.actions

export default Auth.reducer;
export const login=createAsyncThunk("auth/login", async (data)=>{
  try {
    const response = await axios.post("/login", data)
    return response.data
  }catch (e) {
    throw e.response.data
  }
})
