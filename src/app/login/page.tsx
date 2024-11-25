"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
   
  });
  const [loading,setLoading] = useState(false)
  const [buttonDisabled,setButtonDisabled] = useState(true)
  const router = useRouter()

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success('Successfully created! 🎉'); // Success toast
      router.push("profile")
    
      
    } catch (error) {
      console.log(error)
      toast.error('wrong password ❌'); // Error toast
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (user.email.length >0 && user.password.length>0){
      setButtonDisabled(false)
    }else(
    setButtonDisabled(true))
  }, [user])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading":"Login"}</h1>
      <hr />
      <Toaster position="top-center" reverseOrder={false} />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        id="email"
        name="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="password"
        name="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "cant login now":"login now"}</button>
      <Link href='/signup'>Visit signup page</Link>

    </div>
  );
}