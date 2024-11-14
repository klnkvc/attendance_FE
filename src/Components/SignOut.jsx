import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {logout} from "../store/reducer/auth.js";

const SignOut=()=>{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(logout())
    }, []);
    return <>
    </>
}

export default SignOut