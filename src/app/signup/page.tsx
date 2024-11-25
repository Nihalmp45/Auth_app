"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log(response.data);
      toast.success('Successfully created! 🎉'); // Success toast
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('User Already exist ❌'); // Error toast
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user.email.length >0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false)
    }else(
    setButtonDisabled(true))
  }, [user])


  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading":"Signup"}</h1>
      <Toaster position="top-center" reverseOrder={false} />
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        name="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

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
      <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "cant sign up now":"signup"}</button>
      <Link href='/login'>Visit login page</Link>

    </div>
  );
}
