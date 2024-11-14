import SidebarGroup from "./SidebarGroup.jsx";
import {useRef} from "react";
const Sidebar = ()=>{
    const accessList = useRef([])
    accessList.current = [
        {
            "moduleId": "caee5eaa-7dee-47e2-8252-f6dca03da759",
            "moduleName": "notes",
            "canRead": 1,
            "canCreate": 1,
            "canUpdate": 1,
            "canDelete": 1
        },
        {
            "moduleId": "62d4a641-b7ff-4575-8bfa-2739631cc545",
            "moduleName": "todo",
            "canRead": 1,
            "canCreate": 1,
            "canUpdate": 1,
            "canDelete": 1
        }
    ]

    return<>
        <div className="bg-green-600 w-64">
            {accessList.current.map(val=><SidebarGroup key={val.moduleId} name={val.moduleName}/>)}
        </div>
    </>
}
export default Sidebar