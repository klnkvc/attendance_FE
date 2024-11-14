import {jwtDecode} from "jwt-decode";

const filterAccess=(children)=>{
    let newArray =[]
    const token = localStorage.getItem("Authorization")
    if(token){
        const splitToken = token.split(" ")
        const decodeToken =jwtDecode(splitToken[1])
        const listModuleAccess = decodeToken.listModuleAccess
        listModuleAccess.map(val1=>{
            children.map(val2 =>{
                if (val1.moduleId === val2.id && val1.canRead===1){
                    newArray.push(val2)
                }
                if (val2.id ==="allow" && val2.path !==undefined){
                    newArray.push(val2)
                }
            })
        })
        return newArray
    }
}

export default filterAccess