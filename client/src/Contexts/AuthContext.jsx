import { createContext, useState, useEffect } from 'react'

import axios from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [user,setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    const [errMess,setErrMess] = useState(null);

    const login = async (email,password)=>{
        try {
            const response = await axios.post('/auth/login',{email,password},{withCredentials:true});
            console.log(email,password);
            if(response.status === 200) {
                 fetchUser();
                return true;
            }
        } catch (error) {
            setUser(null);
            setErrMess(error.response.data.message)
            return false;
        }

    }

    const logout = async()=>{
        try {
            await axios.post('/auth/logout',{withCredentials:true});
            setUser(null);
        } catch (error) {
            setUser(null);
            console.log(error);
        }
    }

    const fetchUser = async () =>{
        try {
            const user = await axios.get('/auth/me',{withCredentials:true});

            setUser(user.data);

        } catch (error) {
            setUser(null);
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[]);



    return <AuthContext.Provider value={{login,user,loading,logout,errMess}}>{children}</AuthContext.Provider>


}