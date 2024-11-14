import {configureStore} from "@reduxjs/toolkit";
import reducer from "./reducer/reducer.js";

const Store= configureStore({
    reducer: reducer
})

export default Store