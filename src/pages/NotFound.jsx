import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const NotFound=({isLogin})=>{
    const navigate = useNavigate()
    useEffect(() => {
        const timer =setTimeout(()=>{
            navigate(isLogin?"/dashboard":"/login", {replace:true})
        }, 1000)
        return ()=>{
            clearTimeout(timer)
        }
    }, [isLogin]);
    return<>
        NOT FOUND
    </>
}
export default NotFound