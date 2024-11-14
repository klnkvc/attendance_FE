import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login, setUserData} from "../store/reducer/auth.js";
import FormInputText from "../Components/Inputs/FormInputText.jsx";
import FormInputPass from "../Components/Inputs/FormInputPass.jsx";
import {useState} from "react";
import Swal from "sweetalert2";

const Authform = ()=>{
    const {handleSubmit, control}=useForm()
    const dispatch =useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] =useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onLogin = async (data) => {
        const value = {
            username:data.Username,
            password:data.Password
        }
        console.log(value)


        await dispatch(login(value))
            .unwrap()
            .then(()=>{
                dispatch(setUserData())
                navigate("/dashboard", {replace:true})
            })
            .catch((err)=> {
                console.log(err.stack)
                Swal.fire({
                    title:"Failed",
                    text:"Something Wrong",
                    icon:"error"
                })
            })
    }

    return<>
        <section className="h-screen">
            <div className="container h-full px-6 py-24 mx-auto">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"
                        />
                    </div>

                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <h1 className="text-center text-3xl font-bold ">INFINITE LEARNING</h1>
                        <h1 className="text-center text-xl font-light mb-10">Attendance System</h1>
                        <form className="text-center flex flex-col gap-3" onSubmit={handleSubmit(onLogin)}>
                            <FormInputText label={"Username"} name={"Username"} control={control}/>
                            <FormInputPass label={"Password"} name={"Password"} control={control} handleClickShowPassword={handleClickShowPassword} handleMouseDownPassword={handleMouseDownPassword} showPassword={showPassword}/>
                            <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-4">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Authform