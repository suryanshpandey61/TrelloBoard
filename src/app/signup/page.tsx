'use client'

import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

const Signup: React.FC = () => {

  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("");
  const[error,setError] = useState("");


  const handleSubmit = async (e:React.FormEvent) => {
     
      e.preventDefault();

      if(password!==confirmPassword){
        setError("Password do not match please again check the pasword");
        return;
      }

      const response = await fetch("/api/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({name,email,password,confirmPassword}),
      });

      const data=await response.json();

      if(response.ok){
        toast.success("User Created Successfully! Please log in.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
      }else{
        const text = await response.text(); 
       
        toast.error(data.error || "An error occurred While Signing Up");
        setError(data.error || "Something went Wrong");
        throw new Error(`API error: ${response.status} - ${text}`);
      }


  };


  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
     
      <div className="flex justify-center items-center flex-grow signup-bg">
        <div className="w-[90%] lg:pt-0 mt-2 max-w-lg p-5 bg-white rounded-lg shadow-md mb-2">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 pt-2 ">Create Account</h2>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form 
          onSubmit={handleSubmit}
          className="space-y-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
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
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
            
              
            
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
