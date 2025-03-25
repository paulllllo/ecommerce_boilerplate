'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CartModal from './CartModal'
import { useWixClient } from '@/hooks/useWixClient'
import { Cookies } from 'react-cookie'
import { useCartStore } from '@/hooks/useCartStore'

const NavLinks = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const router = useRouter()
    const wixClient = useWixClient()
    const cookies = new Cookies()

    const isLoggedIn = wixClient.auth.loggedIn()

    const {getCart, counter} = useCartStore()

    //                                      USE EFFECT

    useEffect(()=> {
        getCart(wixClient)
    }, [wixClient, getCart])



    const handleLogout = async () => {
        setIsLoggingOut(true)
        cookies.remove('refreshToken')
        const { logoutUrl } = await wixClient.auth.logout(window.location.href)
        setIsLoggingOut(false)
    }

    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push('/login')
        } else {
            setIsProfileOpen(prev => !prev)
        }
    }

  return (
    <div className='flex items-center justify-between gap-8 relative'>
        <Image src='/profile.png' alt='profile' width={22} height={22} onClick={handleProfile} className='cursor-pointer'/>
        { isProfileOpen && (
            <div className='p-10 flex flex-col items-center gap-8 absolute bg-white left-0 top-10 z-20'>
                <Link href='/'>Profile</Link>
                <span className='cursor-pointer' onClick={handleLogout}>{isLoggingOut ? 'Logging out' : 'Logout'}</span>
            </div>
        )}
        <Image src='/notification.png' alt='notification' width={22} height={22} className='cursor-pointer'/>
        <div className='relative cursor-pointer' onClick={() => setIsCartOpen(prev => !prev)}>
            <Image src='/cart.png' alt='cart' width={22} height={22} />
            <div className='w-4 h-4 rounded-full absolute -top-2 -right-2 flex items-center justify-center text-sm text-white bg-tem-red-200'>{counter}</div>
        </div>
        {isCartOpen && (
            <CartModal />
        )}
    </div>
  )
}

export default NavLinks