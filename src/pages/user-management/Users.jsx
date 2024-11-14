import {useEffect, useState} from "react";
import {createUser, deleteUser, editUser, getAllUser, updateUser} from "../../store/reducer/user-management/users.js";
import {useDispatch, useSelector} from "react-redux";
import UserTable from "../../Components/tables/UserTable.jsx";
import Swal from "sweetalert2";
import UserFormModal from "../../Components/modals/UserFormModal.jsx";
import Toast from "../../utils/Toast.js";

const Users = ()=>{
    const dispatch = useDispatch()
    const {listUser, editValue, id} = useSelector(state => state.User)
    const [editMode,setEditMode] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [currentEditId, setCurrentEditId] = useState(null);

    const getUsers = async ()=>{
        try {
            await dispatch(getAllUser()).unwrap();
        } catch (err) {
            console.error(err);
            await Toast.fire({
                icon: "error",
                title: "Couldn't get data"
            })
        }
    }

    useEffect(()=>{
        getUsers()
    }, [dispatch])

    useEffect(() => {
        if (currentEditId !== null) {
            const findData = listUser.find(user => user.id === currentEditId);
            if (findData) {
                dispatch(editUser(currentEditId)); // Set editValue in Redux state
            }
        }
    }, [currentEditId, listUser, dispatch]);

    const closeModal = ()=>{
        setShowModal(false)
        setEditMode(false)

    }
    const userUpdate = (id) => {
        setCurrentEditId(id); // Set current edit ID
        setEditMode(true)
        setShowModal(true); // Show modal
    }
    const userCreate = ()=>{
        setShowModal(true)
    }

    const onSubmit = async (data)=>{
        const value = {
            name: data.name.toLowerCase().trim(),
            username: data.username.trim(),
            email: data.email.trim(),
            phoneNumber: data.phoneNumber,
            password: !editMode?data.password.trim():null,
            confPassword: !editMode?data.confPass.trim():null,
            genderId: data.gender,
            roleId: data.role,
            workLocationId:data.location
        }

        if(value.password !== value.confPassword){
            await Swal.fire({
                title: "Oops..",
                text: "Password not match!",
                icon: "warning"
            })
            return;
        }

        if (!editMode){
            console.log("Not Edit Mode ############################")
            Swal.fire({
                title: 'Warning!',
                text: "After creating account, Username can't be changed",
                icon:"warning",
                confirmButtonText:"Yes, create user",
                cancelButtonText:"No",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then((result)=>{
                if(result.isConfirmed){
                    dispatch(createUser(value))
                        .unwrap()
                        .then((res) => {
                            getUsers()
                            closeModal()
                            Swal.fire({
                                title:"Success",
                                text:res.message,
                                icon:"success"
                            })
                        })
                        .catch((err) => {
                            Swal.fire({
                                title:"Failed",
                                text:"Something Wrong",
                                icon:"error"
                            })
                        });
                }
            })
            console.log("Not Edit")
        }else {
            console.log("Edit Mode ############################")
            try {
                await dispatch(updateUser({id:currentEditId, ...value}))
                    .unwrap()
                    .then((res) => {
                        Swal.fire("Updated", res.message, "success")
                    })

                await getUsers()
                closeModal()
            }catch (e) {
                console.log(e)
                await Swal.fire({
                    title:"Failed",
                    text:"Something Wrong",
                    icon:"error"
                })
            }
            console.log({id, ...value})
        }
    }
    const userDelete = (id)=>{
        const [findData] = listUser.filter((data) => data.id === id)
        return Swal.fire({
            title:"Apakah anda yakin?",
            text:"Setelah menghapus data tidak akan ditampilkan lagi!",
            icon:"warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText:'Iya, hapus!',
            cancelButtonText:"no"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(findData.id))
                    .unwrap()
                    .then((res) => {
                        Swal.fire("Delete", res, "success")
                        getUsers()
                    })
                    .catch((err) => Swal.fire('Oops..', err.message, 'error'));
            }
        })
    }

    return <div>
        <div className="py-5 px-10 flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Users</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center" onClick={userCreate}>
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 20 20"><path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>New</span>
                </button>
            </div>
            <UserTable listUser={listUser} editFunc={userUpdate} deleteFunc={userDelete}/>
        </div>

        <UserFormModal title={editMode?"Edit User":"Create User"} isOpen={showModal} onClose={closeModal} editMode={editMode} editValue={editValue} onSubmit={onSubmit}/>
    </div>
}

export default Users