"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-main">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">Login</h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
            Don't you have an account go to <button className="underline font-semibold cursor-pointer" onClick={()=>router.push('/signup')}> Signup</button>
        </div>

        {/* Login btn  */}
        <div>
          <button
            type="submit"
            className="w-full cursor-pointer p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </div>
      </form>
    </main>
  );
}
