import React, { useContext, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
        

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {login,loading,errMess} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
          const success = await login(email,password);
        if(success){
            navigate('/')
        }
    }

   if(loading){
    return <div>Loading</div>
   }
   

  return (
    <div className='h-[100vh] flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit} className='p-5 w-80 bg-gray-800 rounded-md flex flex-col items-center justify-center gap-4' >

        <h1 className='text-3xl text-primary font-bold' >Login</h1>

        <InputText type="text" name="email"  value={email} className="p-inputtext-sm" onChange={(e)=>setEmail(e.target.value)}/>
        <Password className="p-inputtext-sm" type="password" toggleMask feedback={false} name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" className='btn btn-primary'>Login</button>
        {errMess && <p className='text-error'>{errMess}</p>}
      </form>
    </div>
  )
}

export default Login
