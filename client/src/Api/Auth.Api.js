import axios from "./Axios.instence.js";
axios.defaults.withCredentials = true



export const jwtverifycation = async (callback) => {
     try{
        const response = await axios.get("/auth/jwtveryfication",{withCredentials:true})
        callback(response);
     }catch(err) {
        callback(err)
     }
}

export const Login = async (formdata,callback) => {
    try{

        const user = await axios.post("/auth/login", formdata,{withCredentials:true})
        if(user){
            callback(user)
        }else{
            console.log("error")
        }
    }catch(err){
        callback(err)
    }
}

export const Signup = async (formdata,callback) => {
    try{

        const user = await axios.post("/auth/newuser/signup", formdata,{withCredentials:true})
        if(user){
            callback(user)
        }else{
            callback("error")
        }

    }catch(err){
       callback(err)
    }
}