'use client'

import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        title: "Summer Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
        id: 2,
        title: "Winter Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "bg-gradient-to-r from-pink-50 to-blue-50",
    },
    {
        id: 3,
        title: "Spring Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
];

const Slider = () => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrent(prev => prev === slides.length - 1 ? 0 : prev + 1)
        }, 3000)

        return () => clearInterval(slideInterval)
    }, [])

    return (
        <div className="w-full h-[calc(100vh-5rem)] overflow-hidden flex relative">
            <div className="w-max h-full flex transition-all ease-in-out duration-1000" style={{transform: `translateX(-${current * 100}vw)`}}>
                {slides.map(slide => {
                    return (
                        <div className={`${slide.bg} w-[100vw] shrink-0 h-full flex flex-col md:flex-row`} key={slide.id}>
                            {/* Text Area */}
                            <div className="w-full h-1/2 md:w-1/2 md:h-full flex flex-col items-center justify-center gap-3">
                                <h2 className="text-3xl font-light">{slide.description}</h2>
                                <h1 className="text-5xl font-semibold text-center">{slide.title}</h1>
                                <Link href={slide.url}>
                                    <button className="capitalize px-3 py-3 bg-black text-white text-lg rounded-md">Shop Now</button>
                                </Link>
                            </div>
                            {/* Image */}
                            <div className="w-full h-1/2 md:w-1/2 md:h-full relative">
                                <Image fill src={slide.img} alt={slide.description} style={{ objectFit: "cover" }} />
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* slider dots */}
            <div className="absolute flex gap-5 left-1/2 bottom-8 m-auto">
                {slides.map((slide, index) => {
                    return <div key={slide.id} className='w-3 h-3 rounded-full ring-1 ring-gray-600 flex items-center justify-center' style={{ scale: `${index === current ? 1.5 : 1}` }} onClick={() => { setCurrent(index) }}>
                        {index === current && (<div className="w-2 h-2 bg-gray-600 rounded-full"></div>)}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Slider