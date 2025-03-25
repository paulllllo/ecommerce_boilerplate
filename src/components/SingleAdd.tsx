'use client'

import { useCartStore } from "@/hooks/useCartStore"
import { useWixClient } from "@/hooks/useWixClient"
import { useState } from "react"

// TEMPORARY
// const numberOfItems = 4

const SingleAdd = ({productId, variantId, stockNumber}: {productId: string, variantId: string, stockNumber: number}) => {
    const [number, setNumber] = useState(1)

    const handleChange = (type: 'i' | 'd') => {
        if (type === 'd' && number > 1) {
            setNumber(prev => prev - 1)
        } else if (type === 'i' && number < stockNumber) {
            setNumber(prev => prev + 1)
        }
    }

    const wixClient = useWixClient()
    const { addItem, isLoading } = useCartStore()

    const addToCart = async () => {
        addItem(wixClient, productId, variantId, number)
    }

    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-xl">Choose a Color</h3>
            <div className='w-full flex justify-between'>
                <div className='flex gap-4 items-center'>
                    <div className='bg-gray-100 flex items-center gap-6 justify-between rounded-3xl p-3'>
                        <span className='text-lg font-semibold cursor-pointer' onClick={() => handleChange('d')}>-</span>
                        <span className='text-sm font-semibold'>{number}</span>
                        <span className='text-lg font-semibold cursor-pointer' onClick={() => handleChange('i')}>+</span>
                    </div>
                    <p className="text-sm">Only <span className="text-pink-300">{stockNumber} items</span> left!<br/>Don&apos;t miss it!</p>
                </div>
                <button onClick={addToCart} className="px-6 py-3 rounded-3xl ring-2 ring-pink-300 text-pink-300 font-semibold hover:bg-pink-300 hover:text-white disabled:cursor-not-allowed disabled:ring-0 disabled:bg-pink-200" disabled={isLoading}>Add To Cart</button>
            </div>
        </div>
    )
}

export default SingleAdd