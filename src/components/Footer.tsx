import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='mt-20 py-20 w-full flex flex-col bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 gap-14'>
            {/* Top */}
            <div className='w-full flex flex-col md:flex-row justify-between gap-12'>
                {/* Left */}
                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                    <Link href='/'>
                        <div className="text-2xl font-semibold">BONO</div>
                    </Link>
                    <p className='text-sm'>23 Tokunbo Omisore street, Lekki phase 1, Lagos, Nigeria</p>
                    <Link className='font-semibold' href='mailto:paulkelechi11@gmail.com'>paulkelechi11@gmail.com</Link>
                    <Link className='font-semibold' href='phone:paulkelechi11@gmail.com'>+2348130394202</Link>
                    <div className='flex items-center md:justify-between gap-4'>
                        <Link href="https://www.facebook.png"><Image src="/facebook.png" alt="" width={16} height={16} /></Link>
                        <Link href="https://www.instagram.com"><Image src="/instagram.png" alt="" width={16} height={16} /></Link>
                        <Link href="https://www.youtube.com"><Image src="/youtube.png" alt="" width={16} height={16} /></Link>
                        <Link href="https://www.pinterest.com"><Image src="/pinterest.png" alt="" width={16} height={16} /></Link>
                        <Link href="https://www.x.com"><Image src="/x.png" alt="" width={16} height={16} /></Link>
                    </div>
                </div>
                {/* Middle */}
                <div className='hidden lg:flex lg:w-1/2 flex-row gap-8 justify-between'>
                    <div className='flex flex-col gap-8'>
                        <h1 className='text-xl font-semibold capitalize'>Company</h1>
                        <div className='text-sm font-normal flex flex-col gap-4'>
                            <Link href='/'>About Us</Link>
                            <Link href='/'>Careers</Link>
                            <Link href='/'>Affiliates</Link>
                            <Link href='/'>Blog</Link>
                            <Link href='/'>Contact Us</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <h1 className='text-xl font-semibold capitalize'>Shop</h1>
                        <div className='text-sm font-normal flex flex-col gap-4'>
                            <Link href='/'>About Us</Link>
                            <Link href='/'>Careers</Link>
                            <Link href='/'>Affiliates</Link>
                            <Link href='/'>Blog</Link>
                            <Link href='/'>Contact Us</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <h1 className='text-xl font-semibold capitalize'>Help</h1>
                        <div className='text-sm font-normal flex flex-col gap-4'>
                            <Link href='/'>About Us</Link>
                            <Link href='/'>Careers</Link>
                            <Link href='/'>Affiliates</Link>
                            <Link href='/'>Blog</Link>
                            <Link href='/'>Contact Us</Link>
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                    <h1 className='text-xl font-semibold capitalize'>Subscribe</h1>
                    <p className='text-sm w-2/3 md:w-full'>Be the first to get the latest news about trends, promotions and much more!</p>
                    <div className='w-2/3 flex md:w-full'>
                        <input className='flex w-3/4 bg-white text-gray-500 text-sm h-10 px-4' placeholder='Email address' />
                        <button className='w-1/4 flex items-center justify-center bg-tem-red-200 text-white text-sm h-10'>JOIN</button>
                    </div>
                    <span className='text-sm font-semibold'>Secure Payments</span>
                    <div className='flex gap-4 justify-between'>
                        <Image src="/discover.png" alt="" width={40} height={20} />
                        <Image src="/skrill.png" alt="" width={40} height={20} />
                        <Image src="/paypal.png" alt="" width={40} height={20} />
                        <Image src="/mastercard.png" alt="" width={40} height={20} />
                        <Image src="/visa.png" alt="" width={40} height={20} />
                    </div>
                </div>
            </div>
            {/* Bottom */}
            <div className='w-full flex flex-col justify-between items-center md:flex-row gap-4'>
                <span className='text-sm'>© 2024 Bono Shop</span>
                <div className='flex flex-col items-center md:flex-row gap-4'>
                    <div className='flex gap-4'>
                        <span className='text-gray-500 font-medium text-sm'>Language</span>
                        <span className='text-black font-medium text-sm'>United States | English</span>
                    </div>
                    <div className='flex gap-4'>
                        <span className='text-gray-500 font-medium text-sm'>Currency</span>
                        <span className='text-black font-medium text-sm'>$USD</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer