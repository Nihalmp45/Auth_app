"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import react, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [email,setEmail] = useState("nothing")
  const [username,setUsername] = useState("nothing")

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("logout failed");
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
    setEmail(res.data.data.email)
    setUsername(res.data.data.username)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link
            href={{
              pathname: `/profile/${data}`,
              query: { email:email,username:username,data:data},
            }}
          >
            {data}
          </Link>
        )}
      </h2>
      <button onClick={logout} className="">
        Logout
      </button>
      <button
        className="bg-green-800 mt-4 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get user details
      </button>
    </div>
  );
}
