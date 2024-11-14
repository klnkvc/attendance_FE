import {useSelector} from "react-redux";

const Dashboard = ()=>{
    const {name, workLocation} = useSelector(state => state.Auth)
    console.log(name)

    return<>
        <div className='flex flex-row justify-center items-center'>
            <div className="bg-white w-full h-fit flex flex-col p-5">
                <h1 className="text-4xl font-medium mb-4">Welcome {name}</h1>
                <p className="text-xl font-normal mb-4">You're Working {workLocation} </p>
            </div>
        </div>

    </>
}

export default Dashboard