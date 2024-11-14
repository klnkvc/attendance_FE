import {Navigate, Route, Routes} from "react-router-dom";
import PublicRoute from "./PublicRoutes.jsx";
import Authform from "../pages/Authform.jsx";
import AuthRoute from "./AuthRoute.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "../store/reducer/auth.js";
import {useEffect, useRef} from "react";
import MainLayout from "../layout/MainLayout/MainLayout.jsx";
import filterAccess from "../utils/FilterAccess.js";
import route from "./ListRoute.jsx";
import NotFound from "../pages/NotFound.jsx";

const Routing = ()=>{
    console.log("ROUTING")
    const dispatch = useDispatch()
    const routeRef = useRef([])
    const {isLogin, name} = useSelector(state => state.Auth)
    const filterRoute = ()=>{
        routeRef.current=filterAccess(route)
    }
    useEffect(() => {
        console.log("USE EFFECT")
        const getToken = !!localStorage.getItem("Authorization")
        if(getToken){
            filterRoute()
            dispatch(setUserData())
        }
        console.log("###########"+isLogin+"##########")
    }, [isLogin, dispatch]);

    console.log(isLogin + name)
    return<div>
        <Routes>
            {/*Public Route*/}
            <Route element={<PublicRoute isLogin={isLogin}/> }>
                <Route path="login" element={<Authform/>}/>
            </Route>

            {/*Auth Route*/}
            <Route element={<AuthRoute isLogin={isLogin}/>}>
                <Route element={<MainLayout/>}>
                    {routeRef.current.map(val=>(
                        <Route key={val.id} path={val.path} element={val.element}/>
                    ))}
                </Route>
            </Route>
            
            <Route path="/" element={<Navigate to="/login" replace/>} />
            <Route path="*" element={<NotFound isLogin={isLogin}/>}/>
        </Routes>
    </div>
}

export default Routing