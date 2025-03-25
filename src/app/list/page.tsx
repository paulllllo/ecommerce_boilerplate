export const dynamic = 'force-dynamic'

import Filter from '@/components/Filter'
import ListItems from '@/components/ListItems'
import { wixClientServer } from '@/lib/wixClientServer'
import Image from 'next/image'
import React, { Suspense } from 'react'

const List = async ({ searchParams }: { searchParams: any }) => {
    const wixClient = await wixClientServer()
    const cat = await wixClient.collections.getCollectionBySlug(searchParams.cat || 'all-products');

    // console.log('cat', cat)

    return (
        <div className='w-full'>
            <div className='w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col gap-8'>
                {/* Campaign */}
                <div className='w-full rounded-2xl bg-pink-100 hidden md:flex justify-between h-64 px-4'>
                    <div className='flex flex-col items-center justify-center w-full gap-8'>
                        <h1 className='font-semibold text-4xl capitalize w-3/5 text-center'>Grab up to 50% off on selected products</h1>
                        <button className='bg-pink-500 rounded-3xl px-5 py-3 text-sm text-white'>Buy Now</button>
                    </div>
                    <div className='relative h-full aspect-[1/1]'>
                        <Image src='/woman.png' alt='woman smiling' fill />
                    </div>
                </div>
                {/* Filter */}
                <div className='w-full'>
                    <Filter />
                </div>
                <div className='w-full'>
                    <h1 className='font-medium text-3xl mb-10'>{cat.collection?.name || 'All Products'}</h1>
                    <Suspense fallback={'Loading...'} >
                        {/* {console.log('cat.collection?._id', cat.collection?._id)!} */}
                        <ListItems categoryId={cat.collection?._id || process.env.ALL_PRODUCTS_WIX_CLIENT_ID!} searchParams={{...searchParams}} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default List