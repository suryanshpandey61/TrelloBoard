'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }
  
    // Save JWT in localStorage (or cookie for better security)
    localStorage.setItem("token", data.token);
  
    alert("Welcome! You are logged in.");
    // Optionally redirect to a protected route
  };
  

  return (
    <div className="w-full h-screen flex mx-auto p-8 login-bg">

      <div className="flex justify-center items-center flex-grow ">
        <div className="w-[90%] max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

          <form className="space-y-4"
          onSubmit={handleLogin}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 cursor-pointer text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center ">
            <div className="text-sm flex gap-x-1.5 text-gray-600">
            <p>  Do not have an account   </p>
             <button onClick={()=>router.push('/signup')} className='text-slate-600 cursor-pointer font-semibold'> Signup</button>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
