import { Modal, useMantineTheme } from '@mantine/core';
import axios from '../../Api/Axios.instence.js';
import React, { Fragment, useState } from 'react';
import { useSelector , useDispatch } from "react-redux"
import "./EditprofileModel.css"
import { Alert } from '@mantine/core';
import { toast , ToastContainer } from 'react-toastify';


function EditprofileModel({ ModalOpened, setModalOpened }) {

    const theme = useMantineTheme()
    const User = useSelector((state) => {
        return state.user
    })
   
    const toastoptions = {
        position: "bottom-left",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true
          }

    const dispatch = useDispatch()

    const [formdata, setformdata] = useState({
        firstname: User.firstname,
        lastname: User.lastname,
        username: User.username,
        email: User.email,
        bio:  User.bio,
        password: "",
        confirmpassword: ""
    });
    
    const [viewinput, setviewinput] = useState({
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        bio: true
    })


    const [alertopen,setalertopen] = useState(null)

    const handlesubmit = async (e) => {
        e.preventDefault()
        if (handlevalidation()) {
            axios.defaults.withCredentials = true
            const response = await axios.post("/user/editprofile", formdata, { withCredentials: true })
            console.log(response.data)
            if(response.data.success){
            afterupdation()
            dispatch({
                type:"user",
                payload:response.data.user
               })
            toast.success("Profile udpation successfully complited",toastoptions)
            }else if(response.data.error){
                setalertopen(response.data.error)
                setTimeout(() => {
                     afterupdation()
                     setModalOpened(true)
                }, 5000);
            }
        }
    }

    const handlevalidation = () => {
        const { firstname, lastname, username, email, password, confirmpassword  } = formdata

        if (firstname === '' && !viewinput.firstname) setalertopen("First Name is required")
        else if (firstname.length < 6 && !viewinput.firstname) setalertopen("First Name must have at least 6 characters")
        else if (lastname === "" && !viewinput.lastname) setalertopen("Last Name is required")
        else if (lastname.length < 6 && !viewinput.lastname) setalertopen("Last Name must have at least 6 characters")
        else if (username === "" && !viewinput.username) setalertopen("User Name is required")
        else if (username.length < 8 && !viewinput.username) setalertopen("User Name must have at least 8 characters")
        else if (email === "" && !viewinput.email) setalertopen("Email Name is required")
        else if (!/\S+@\S+\.\S+/.test(email) && !viewinput.email) setalertopen("please enter the correct email");
        else if (password === "") setalertopen("Password is required")
        else if (password.length < 10 ) setalertopen("Password must have at least 10 characters")
        else if (confirmpassword !== password) setalertopen("Password and ConfirmPassword must be same")
        else{
            setalertopen(null)
            return true;
        }
        setTimeout(()=>{
          setalertopen(null)
        },5000)
        return false
    }

    const handlechange = (event) => {
        setformdata({ ...formdata, [event.target.name]: event.target.value })
    }

    const afterupdation = () => {
        setModalOpened(false)
        setviewinput({
            firstname: true,
            lastname: true,
            username: true,
            email: true,
            bio: true
        })
        setformdata({
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            bio: "",
            password: "",
            confirmpassword: ""
        })
        setalertopen(null)
    }


    return (
        <Fragment>
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size="50%"
            opened={ModalOpened}
            onClose={() => afterupdation()}
        >
            <form onSubmit={(e)=>e.preventDefault()} className='infoForm'>
                <h3>Profile Editing</h3>

                { alertopen && <Alert  style={{height:"50px"}} title="error" color="red">{alertopen}</Alert> }

                <div>
                    {
                    viewinput.firstname ?
                        <div>
                            <span>{User.firstname}</span>
                            <button onClick={() => setviewinput({...viewinput,firstname:!viewinput.firstname})} className='button'><i class="fa-solid fa-pen"></i></button>
                        </div> :
                        <div>
                            <input type="text"
                                placeholder='firstname'
                                className='infoinput'
                                value={formdata.firstname}
                                name='firstname'
                                onChange={(e) => handlechange(e)} />
                            <button onClick={() => setviewinput({...viewinput,firstname:!viewinput.firstname})} className='button'><i class="fa-solid fa-square-xmark"></i></button>
                        </div>
                }
                </div>
                <div>
                    {
                        viewinput.lastname ?
                            <div>
                                <span>{User.lastname}</span>
                                <button onClick={() => setviewinput({...viewinput,lastname:!viewinput.lastname})}  className='button'><i class="fa-solid fa-pen"></i></button>
                            </div> :
                            <div>
                                <input type="text"
                                    placeholder='lastname'
                                    className='infoinput'
                                    value={formdata.lastname}
                                    name='lastname'
                                    onChange={(e) => handlechange(e)} />
                                <button onClick={() =>setviewinput({...viewinput,lastname:!viewinput.lastname}) } className='button'><i class="fa-solid fa-square-xmark"></i></button>
                            </div>
                    }
                </div>

                <div>{
                    viewinput.username ?
                        <div>
                            <span>{User.username}</span>
                            <button onClick={() => setviewinput({...viewinput,username:!viewinput.username})} className='button'><i class="fa-solid fa-pen"></i></button>
                        </div> :
                        <div>
                            <input type="text"
                                placeholder='User Name'
                                className='infoinput'
                                value={formdata.username}
                                name='username'
                                onChange={(e) => handlechange(e)} />
                            <button onClick={() =>setviewinput({...viewinput,username:!viewinput.username})}  className='button'><i class="fa-solid fa-square-xmark"></i></button>
                        </div>
                }
                </div>

                <div>{
                    viewinput.email ?
                        <div>
                            <span>{User.email}</span>
                            <button onClick={() => setviewinput({...viewinput,email:!viewinput.email})} className='button'><i class="fa-solid fa-pen"></i></button>
                        </div> :
                        <div>
                            <input type="email"
                                placeholder='email'
                                className='infoinput'
                                value={formdata.email}
                                name='email'
                                onChange={(e) => handlechange(e)} />
                            <button onClick={() =>setviewinput({...viewinput,email:!viewinput.email})} className='button'><i class="fa-solid fa-square-xmark"></i></button>
                        </div>
                }
                </div>

                <div>{
                    viewinput.bio ?
                        <div>
                            <span>{User.bio}</span>
                            <button onClick={() => setviewinput({...viewinput,bio:!viewinput.bio})} className='button'><i class="fa-solid fa-pen"></i></button>
                        </div> :
                        <div>
                            <input type="text"
                                placeholder='Bio'
                                className='infoinput'
                                value={formdata.bio}
                                name='bio'
                                onChange={(e) => handlechange(e)} />
                            <button onClick={() => setviewinput({...viewinput,bio:!viewinput.bio})} className='button'><i class="fa-solid fa-square-xmark"></i></button>
                        </div>
                }
                </div>

                <div>
                    <input type="text"
                        placeholder='Password'
                        className='infoinput'
                        value={formdata.password}
                        onChange={(e) => handlechange(e)}
                        name='password' />

                    <input type="text"
                        placeholder='Confirm Password'
                        value={formdata.confirmpassword}
                        onChange={(e) => handlechange(e)}
                        className='infoinput'
                        name='confirmpassword'
                         />
                </div>
                <div>
                </div>

                <div>
                   <button onClick={handlesubmit} className='button info-Button'>Update Details</button>
                </div>
            </form>
        </Modal>
        <ToastContainer></ToastContainer>
        </Fragment>
    )
}

export default React.memo(EditprofileModel)