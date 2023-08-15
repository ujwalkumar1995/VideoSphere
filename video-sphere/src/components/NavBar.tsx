'use client'
import Link from "next/link";
import { FaRegArrowAltCircleRight, FaVideo } from "react-icons/fa";

const NavBar = () => {
    return (
        <nav className='py-2 px-8 flex justify-between'>
            <div className="flex justify-start">
                <div className="py-2 p-1 text-blue-500">
                    <FaVideo/>
                </div>
                <Link href='/' className='font-bold text-gray-700 text-2xl'>VideoSphere</Link>
            </div>
            <div className="min-w-[30%]">
                <div className='flex justify-around'>
                    <button className="p-2 rounded hover:bg-gray-100">
                        Signin
                    </button>
                    <div className='pt-2 bg-white p-2 rounded text-blue-500 border hover:bg-blue-100'>
                        <Link className='flex' href=''>
                            <div className='pt-1'>
                                <FaRegArrowAltCircleRight />
                            </div>
                            <div className='px-2'>
                                Join the meeting
                            </div>
                        </Link>
                    </div>
                    <div className='pt-2 bg-blue-400 hover:bg-blue-700 p-2 rounded text-white'>
                        <Link className='flex' href=''>
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