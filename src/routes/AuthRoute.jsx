import {Navigate, Outlet} from "react-router-dom";

const AuthRoute = ({isLogin}) =>{
    return isLogin ? <Outlet/> : <Navigate to="/login" replace/>
}

export default AuthRoute