import React, { useState } from 'react'
import {app} from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import Link from 'next/link';
import { useRouter } from 'next/router';


const Register = () => {
    const router= useRouter()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleSubmit=async()=>{
        try{
            const response= await createUserWithEmailAndPassword(auth, email, password)
            console.log("res",response)
            router.push("/login")

        }catch(error){
            console.log(error)
        }
    }

    const handleGoogleLogin=async()=>{
        try{
            const response= await signInWithPopup(auth, provider)
            console.log("res",response)
            router.push("/index")

        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className='max-w-screen-lg mx-auto mt-10'>
    <div className='text-3xl py-5'>Register</div>
    <div className='flex flex-col w-96 gap-2'>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Please enter Email' className='textarea textarea-bordered'/>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Please enter Password' className='textarea textarea-bordered'/>
    </div>
    <button onClick={handleSubmit} class="btn btn-info btn-wide mt-4">Submit</button>
    <small className='block pt-5'>already registed, go to <Link href={'/login'} className='text-blue-500 underline'>login</Link></small>
    
    <div onClick={handleGoogleLogin} className='border inline-block p-2 rounded-full bg-blue-200 mt-4 hover:scale-125 transition cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
    </div>
    </div>
  )
}

export default Register