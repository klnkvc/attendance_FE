import filterAccess from "../utils/FilterAccess.js";
import PeopleIcon from '@mui/icons-material/People';

const children = [
    {
        id:"4a4b87af-6584-41ef-9396-850e7bba1756",
        title:"Users",
        url:"/user-management",
        icon:<PeopleIcon/>
    },
]

const UserList = ()=>{
    return filterAccess(children)
}

export default UserList