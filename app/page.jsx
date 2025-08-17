'use client'
import { ModeToggle } from '@/components/ModeToggle/ModeToggle'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {

  const router = useRouter();

  return (
    <main className="w-full relative items-center flex px-15 justify-center bg-no-repeat bg-cover h-[100vh] ">
      <div className='z-20'>
        <h1 className='text-8xl font-bold'>The Art of Stunning Interior</h1>
        <div className='m-auto'>
          <p className='pt-5 text-4xl font-semibold'><span className='text-amber-500'>Calculate the cost of your work instantly, </span> based on materials and products choices.</p>
        </div>
        <div className='mt-4 text-xl w-[50%]'>
          <p className='text-gray-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere placeat saepe similique aliquid rerum neque quo cupiditate voluptatum doloribus reprehenderit enim, totam quaerat ipsum inventore eaque necessitatibus eos temporibus quas.</p>
        </div>
        <div className='mt-8'>
          {/* <Button className="bg-transparent">Try Now</Button> */}
          <button className='border px-6 py-3 border-gray-300 cursor-pointer' onClick={() => router.push('/dashboard')}>Try Now</button>
        </div>
      </div>
      <div className="absolute  z-10 w-[50%] bg-cover h-full right-0 top-0 bg-[url('https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?cs=srgb&dl=pexels-fotoaibe-1571458.jpg&fm=jpg')]">

      </div>
    </main>
  )
}

export default page