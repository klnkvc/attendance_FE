import filterAccess from "../utils/FilterAccess.js";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const children = [
    {
        id:"5cb0c1c8-8126-4d5d-a778-a661742c8b26",
        title:"Profile",
        url:"/profile",
        icon:<AccountBoxIcon/>
    }
]

const ProfileList = ()=>{
    return filterAccess(children)
}

export default ProfileList