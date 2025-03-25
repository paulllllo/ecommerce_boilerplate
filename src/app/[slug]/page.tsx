import ImagePreview from '@/components/ImagePreview'
import ProductOptions from '@/components/ProductOptions'
import SingleAdd from '@/components/SingleAdd'
import { wixClientServer } from '@/lib/wixClientServer'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { useState } from 'react'
import DOMPurify from "isomorphic-dompurify"
import ProductDescription from '@/components/ProductDescription'

const Product = async ({ params }: { params: any }) => {
    const wixClient = await wixClientServer()
    const products = await wixClient.products.queryProducts().eq('slug', params.slug).find();

    if (!products.items[0]) {
        return notFound;
    }

    const product = products.items[0]

    // console.log('product', product.description)
    // console.log('product', product)

    return (
        <div className='w-full flex flex-col md:flex-row gap-14 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
            {/* Image Area */}
            <ImagePreview images={product.media?.items} />
            {/* Product Details */}
            <div className='w-full md:w-1/2 flex flex-col gap-8'>
                <h1 className='text-3xl font-semibold'>{product.name}</h1>
                <ProductDescription description={product.description!} />
                <div className='h-[2px] bg-gray-100 w-full' />
                {product.priceData?.discountedPrice === product.priceData?.price ?
                    (<div className='w-full flex items-center gap-4'>
                        <span className='text-2xl font-semibold'>${product.priceData?.discountedPrice}</span>
                    </div>) :
                    (<div className='w-full flex items-center gap-4'>
                        <span className='text-gray-400 text-xl font-semibold line-through'>${product.priceData?.price}</span>
                        <span className='text-2xl font-semibold'>${product.priceData?.discountedPrice}</span>
                    </div>
                    )}
                <div className='h-[2px] bg-gray-100 w-full' />
                {product.productOptions && product.variants ? <ProductOptions productId={product._id!} productOptions={product.productOptions!} productVariants={product.variants!} /> : <SingleAdd productId={product._id!} variantId={""} stockNumber={product.stock?.quantity || 0} />}
                <div className='h-[2px] bg-gray-100 w-full' />
                {product.additionalInfoSections?.map(section => {
                    return (section.title !== 'shortDesc' && <div className='w-full flex flex-col gap-4' key={section.title}>
                        <h2 className='text-lg font-semibold uppercase'>{section.title}</h2>
                        <p className='w-full text-lg text-gray-500'>{section.description}</p>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default Product