import Link from "next/link";
import { FaVideo } from "react-icons/fa";

export default function Login() {
    return (
        <main className="flex items-center w-screen h-full min-h-full pt-28 justify-center">
            <div className="border flex flex-col items-center w-[30%] p-12">
            <div className="flex justify-start mb-6">
                <div className="py-2 p-1 text-blue-500">
                    <FaVideo/>
                </div>
                <div className='font-bold text-gray-700 text-3xl'>VideoSphere</div>
            </div>
            <div className='font-bold text-gray-500 text-lg mb-6'>Login to your VideoSphere account</div>
                <input className='p-2 h-12 border-gray-300 border-2 focus:outline-none focus:ring focus:ring-blue-400 rounded w-[80%] mb-3' placeholder="Enter your email">
                </input>
                <input className='p-2 h-12 border-gray-300 border-2 focus:outline-none focus:ring focus:ring-blue-400 rounded w-[80%] mb-3' placeholder="Enter your password">
                </input>
                <button className="hover:bg-blue-50 p-1 text-blue-500 rounded mb-3">
                    Login
                </button>
                <div>
                    Don't have an account? <Link className='text-blue-500' href='/signin'>Create one now.</Link>
                </div>
            </div>
        </main>
  )
}