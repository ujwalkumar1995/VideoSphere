import Image from 'next/image'
import Link from 'next/link'
import { FaKeyboard, FaVideo } from "react-icons/fa";
import homeImage from '../../public/home-image.jpg'
import AuthModal from '@/components/AuthModal';

export default function Home() {
  return (
    <main className="flex items-left w-screen h-full min-h-full py-10 px-16">
      <div className='w-[47%] px-5'>
        <div className='border-b py-12'>
          <div className='text-5xl bold'>
            Video call and meeting facility for all.
          </div>
          <div className='py-3 text-3xl text-gray-500'>
            VideoSphere is a platform that is available to everyone. It can be used for secure and high quality video meetings and calls.
          </div>
          <div className='py-3 flex justify-start'>
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
            <div className='p-2'>
              or
            </div>
            <div className='flex pt-2 bg-white text-gray-500 p-2 rounded border'>
              <div className='pt-1 px-2'>
                <FaKeyboard/>
              </div>
              <input className='outline-none border-0 text-black' placeholder='Enter meeting code'>
              </input>
            </div>
            <button className='text-blue-400 px-2 hover:bg-blue-100'>
              Join
            </button>
          </div>
        </div>
        <div className='border-b py-12'>
          <div>
            Don't have an account? <Link className='text-blue-500' href='/signin'>Create account now</Link>
          </div>
        </div>
      </div>
      <div className='w-[47%] py-12 pl-20 text-center'>
        <Image alt='' height='600' width='800' src={homeImage}></Image>
        <div>
          <div className='text-lg text-black'>
            Get a link that you can share
          </div>
          <div className='text-reg text-gray-500'>
            Create a link that you can share with people that you want to connect with.
          </div>
        </div>
      </div>
    
    </main>
  )
}


