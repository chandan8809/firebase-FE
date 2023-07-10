import React, { useState } from 'react'
import {app} from "../firebaseConfig"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const auth = getAuth();
    const router=useRouter()

    const handleSubmit=async()=>{
        try{
            const response= await signInWithEmailAndPassword(auth, email, password)
            console.log("res",response)
            router.push("/")

        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className='max-w-screen-lg mx-auto mt-10'>
    <div className='text-3xl py-5'>Login</div>
    <div className='flex flex-col w-96 gap-2'>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Please enter Email' className='textarea textarea-bordered'/>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Please enter Password' className='textarea textarea-bordered'/>
    </div>
    <button onClick={handleSubmit} class="btn btn-info btn-wide mt-4">Submit</button>
    <small className='block pt-5'>Not registed, go to <Link href={'/register'} className='text-blue-500 underline'>register</Link></small>
   


    </div>
  )
}

export default Login