'use client'

import Image from 'next/image'
import React, { useState } from 'react'

// const images = [
//     {
//         id: 1,
//         url: 'https://images.pexels.com/photos/4048672/pexels-photo-4048672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//     },
//     {
//         id: 2,
//         url: 'https://images.pexels.com/photos/8290032/pexels-photo-8290032.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'
//     },
//     {
//         id: 3,
//         url: 'https://images.pexels.com/photos/30888208/pexels-photo-30888208/free-photo-of-cozy-morning-with-latte-art-and-newspaper.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'
//     },
//     {
//         id: 4,
//         url: 'https://images.pexels.com/photos/30856712/pexels-photo-30856712/free-photo-of-stylish-young-adult-with-curly-hair-and-rings.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'
//     }
// ]

const ImagePreview = ({ images }: {images: any}) => {
    const [current, setCurrent] = useState(0)

    // console.log('images', images)

    return (
        <div className='flex flex-col w-full gap-8 md:w-1/2 h-fit sticky top-20'>
            <div className='w-full h-96 rounded-2xl relative overflow-hidden'>
                <Image src={images[current].image.url} alt='' fill className='object-cover' />
            </div>
            <div className='w-full gap-4 flex items-center justify-between'>
                {images.map((image: any, i: number) => {
                    return (<div key={image._id} className='w-1/4 h-32 rounded-2xl relative cursor-pointer overflow-hidden' onClick={() => setCurrent(prev => i)}>
                        <Image src={images[i].image.url} alt='' fill className='object-cover' />
                    </div>)
                })}
            </div>
        </div>
    )
}

export default ImagePreview