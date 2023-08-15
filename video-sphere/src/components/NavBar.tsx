'use client'
import Link from "next/link";
import { FaKeyboard, FaRegArrowAltCircleRight, FaVideo } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const NavBar = () => {
    const router = useRouter();
    const [joinMeetingClicked, setJoinMeetingClicked] = useState(false);
    return (
        <nav className='py-2 px-8 flex justify-between'>
            <div className="flex justify-start">
                <div className="py-2 p-1 text-blue-500">
                    <FaVideo />
                </div>
                <Link href='/' className='font-bold text-gray-700 text-2xl'>VideoSphere</Link>
            </div>
            <div className={`${!joinMeetingClicked ? 'min-w-[30%]' : 'min-w-[40%]'}`}>
                <div className='flex justify-around'>
                    <button onClick={() => router.push('/signin')} className="p-2 rounded hover:bg-gray-100">
                        Signin
                    </button>
                    <div className={`pt-2 bg-white p-2 rounded text-blue-500 border ${!joinMeetingClicked? 'hover:bg-blue-100' : ''}`}>
                        {!joinMeetingClicked ? <div onClick={() => setJoinMeetingClicked(true)} className='cursor-pointer flex'>
                            <div className='pt-1'>
                                <FaRegArrowAltCircleRight />
                            </div>
                            <div className='px-2'>
                                Join the meeting
                            </div>
                        </div> : 
                        <div className="flex">
                        <div className='flex px-1 bg-white text-gray-500 rounded'>
                            <div className='pt-1 px-2'>
                                <FaKeyboard />
                            </div>
                            <input 
                                type="text"
                                className='outline-none border-0 text-black'
                                placeholder='Enter meeting code'>
                            </input>
                        </div>
                        <button className='text-blue-400 px-2 hover:bg-blue-100'>
                            Join
                        </button> 
                        </div>}
                    </div>
                    <div className='pt-2 bg-blue-400 hover:bg-blue-700 p-2 rounded text-white'>
                        <Link className='flex' href='/login'>
                            <div className='pt-1'>
                                <FaVideo />
                            </div>
                            <div className='px-2'>
                                Start meeting
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;