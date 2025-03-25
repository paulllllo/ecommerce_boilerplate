import { wixClientServer } from '@/lib/wixClientServer'
import { collections } from '@wix/stores'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryList = async () => {
    const wixClient = await wixClientServer()
    const { items } = await wixClient.collections.queryCollections().find();

    // console.log('items', items)

    return (
        <div className='w-full overflow-x-scroll scrollbar-hidden'>
            {/* Scroller */}
            <div className='flex w-fit gap-8'>
                {items.map((category: collections.Collection) => {
                    return (
                        <div key={category._id} className="w-3/4 md:w-[45vw] lg:w-[22vw] gap-6 flex flex-shrink-0 flex-col">
                            {/* Image */}
                            <Link href={'/list?cat=' + category.slug} className="relative rounded-xl overflow-hidden h-80 w-full">
                                <Image
                                    src={category.media?.mainMedia?.image?.url || '/product.png'}
                                    alt=''
                                    fill
                                    className="object-cover bg-slate-200" />
                            </Link>
                            <h1 className="font-semibold w-full text-lg text-gray-500">{category.name}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoryList