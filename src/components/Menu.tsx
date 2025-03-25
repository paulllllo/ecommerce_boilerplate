'use client'

// import * as React from 'react'
import Image from "next/image"

import Link from "next/link"
import { useState } from "react"

const Menu = () => {
    const [open, setOpen] = useState(false)

  return (
    <div>
        <Image width={28} height={28} src='/menu.png' alt='' className='cursor-pointer' onClick={() => setOpen(prev => !prev)}/>
        {open && (
            <div className="w-full h-[calc(100vh-4rem)] bg-black text-white flex flex-col items-center justify-center gap-4 absolute top-20 left-0 z-20">
                <Link href='/'>Home</Link>
                <Link href='/'>About</Link>
                <Link href='/'>Contant</Link>
                <Link href='/'>Testimonials</Link>
                <Link href='/'>Services</Link>
            </div>
        )}
    </div>
  )
}

export default Menu