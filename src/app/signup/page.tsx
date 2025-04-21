'use client'

import { useState } from "react"


export default function SignupPage() {

    const[email,setEmail] = useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[error,setError]=useState("");

    if(password!==confirmPassword){
        setError("Password and confirm Password does not match")
    }


  return (
    <main className="h-screen flex flex-col items-center justify-center bg-main">
      <h1 className="text-3xl font-bold mb-6 text-green-500">Signup</h1>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded shadow"
       
      >
        Signup
      </button>
      <form action="">

      </form>
    </main>
  )
}
