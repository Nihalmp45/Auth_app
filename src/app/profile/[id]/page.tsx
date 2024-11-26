"use client"
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

export default function ProfilePage({params}:{params: { data: string }} ){
    const router = useRouter()
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const username = searchParams.get('username')
    const id = searchParams.get('data')
  

    const profile = ()=>{
        router.push('/profile')
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile {id}</h1>
            <hr />
            <p>Email: {email}</p>
            <p>Username: {username}</p>
            <button className="bg-green-800 mt-4 text-white font-bold py-2 px-4 rounded" onClick={profile}>go to profile</button>

        </div>
    )
}