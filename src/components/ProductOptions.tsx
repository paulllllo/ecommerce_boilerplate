'use client'

import { products } from "@wix/stores";
import { useEffect, useState } from "react"
import SingleAdd from "./SingleAdd";

const ProductOptions = ({ productId, productOptions, productVariants }: {
    productId: string;
    productOptions: products.ProductOption[];
    productVariants: products.Variant[];
}) => {
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({})
    const [selectedVariant, setSelectedVariant] = useState<products.Variant>({})

    const handleClickOption = (optionType: any, choice: any) => {
        setSelectedOptions(prev => ({ ...prev, [optionType]: choice }))
    }

    // console.log('selectedVariant', selectedVariant)

    useEffect(() => {
        const selected = productVariants.find(variant => {
            const variantChoices = variant.choices
            if (!variantChoices) return false

            return Object.entries(selectedOptions).every(([key, value]) => variantChoices[key] === value)
        })

        setSelectedVariant(selected!)
    }, [selectedOptions, productVariants])

    const variantIsInStock = (choices: any) => {
        return productVariants.some((variant: any) => {
            const variantChoices = variant.choices
            if (!variantChoices) return false

            return Object.entries(choices).every(([key, value]) => {
                // console.log('variant quantity, variant inStock', variant, variant.stock?.inStock)
                const result = variantChoices[key] === value && variant.stock?.inStock && (variant.stock?.quantity > 0)
                // console.log('productVariants', productVariants)
                // console.log('[key, value]', key, value)
                // console.log('variant', variant)
                // console.log('result', result)
                // if(variant.stock?.inStock) console.log('variant', variant)
                return result
                //  && (variant.stock?.quantity > 0)
            })
        })
    }

    return (
        <div className="flex flex-col gap-8">
            {productOptions.map((option) => {
                return (<div className="flex flex-col gap-4 capitalize" key={option.name}>
                    <h3 className="font-semibold text-xl">Choose a {option.name}</h3>
                    <div className="flex w-full gap-4">
                        {option.choices?.map((choice: any) => {
                            // console.log('option', option)
                            // console.log('choice', choice)
                            const selected = selectedOptions[option.name!] === choice.description

                            const disabled = !variantIsInStock({ ...selectedOptions, [option.name!]: choice.description })

                            const clickHandler = disabled ? undefined : () => handleClickOption(option.name!, choice.description!)
                            // console.log('selected, disabled', selected, disabled)
                            // console.log('selectedOptions', selectedOptions)

                            return (
                                option.name?.toLowerCase() === 'color' ?
                                    (
                                        <div key={choice.value} className="w-10 h-10 relative rounded-full ring-1 ring-gray-400" style={{ backgroundColor: choice.description, cursor: (disabled ? 'not-allowed' : 'pointer') }}
                                            onClick={clickHandler}
                                        >
                                            {selected ?
                                                <div className="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-blue-300" /> :
                                                disabled ?
                                                    <div className="w-12 h-[2px] bg-red-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" /> :
                                                    ''}
                                        </div>
                                    ) :
                                    (
                                        <button key={choice.value} disabled={disabled} className="px-5 py-2 relative rounded-xl cursor-pointer text-sm" style={{
                                            backgroundColor: (selected ? '#F9A8D4' : disabled ? '#f4d3e5' : '#f8f8f8'),
                                            color: (selected ? '#f8f8f8' : disabled ? '#f8f8f8' : '#F9A8D4')
                                        }}
                                            onClick={clickHandler}
                                        >
                                            {choice.description}
                                        </button>
                                    )

                            )
                        })
                        }
                    </div>
                </div>)
            })}
            <SingleAdd productId={productId} variantId={selectedVariant._id || ''} stockNumber={selectedVariant.stock?.quantity || 0} />
        </div>
    )
}

{/* <h3 className="font-semibold text-xl">Choose a Color</h3>
                <div className="flex w-full gap-4">
                    <div className="w-10 h-10 relative rounded-full bg-black ring-1 ring-gray-400 cursor-pointer"></div>
                    <div className="w-10 h-10 relative rounded-full bg-violet-600 ring-1 ring-gray-400 cursor-pointer">
                        <div className="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-blue-300" />
                    </div>
                    <div className="w-10 h-10 relative rounded-full ring-1 ring-gray-400 cursor-not-allowed">  
                        <div className="w-12 h-[2px] bg-red-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-xl">Choose a Color</h3>
                <div className="flex w-full gap-4">
                    <button className="px-5 py-2 relative rounded-xl ring-2 ring-pink-300 cursor-pointer text-sm text-pink-300">
                        Large
                    </button>
                    <button className="px-5 py-2 rounded-xl bg-pink-200 cursor-not-allowed text-sm text-white">
                        Medium
                    </button>
                    <button className="px-5 py-2 relative rounded-xl bg-pink-400 cursor-pointer text-white">
                        Small
                    </button>
                </div>
            </div>
        </div> */}

export default ProductOptions