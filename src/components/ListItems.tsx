import { wixClientServer } from "@/lib/wixClientServer"
import { products } from "@wix/stores"
import Image from "next/image"
import Link from "next/link"
import DOMPurify from "isomorphic-dompurify"
import { Console } from "console"
import Pagination from "./Pagination"

const DEFAULT_PRODUCT_COUNT = 5

const ListItems = async ({ categoryId, limit, searchParams }: { categoryId: string, limit?: number, searchParams?: any }) => {
    const wixClient = await wixClientServer()

    // console.log('wixServer', wixClientServer)

    const productQuery = wixClient.products
        .queryProducts()
        .startsWith('name', searchParams?.name || '')
        .hasSome('productType', [searchParams?.type || 'physical', 'digital'])
        .gt('priceData.price', searchParams?.min || 0)
        .lt('priceData.price', searchParams?.max || 99999)
        .eq('collectionIds', categoryId)
        .limit(DEFAULT_PRODUCT_COUNT)
        .skip(searchParams?.page ? parseInt(searchParams?.page) * (limit || DEFAULT_PRODUCT_COUNT) : 0)

    let res

    if (searchParams?.sort) {
        const [sortType, sortBy] = searchParams.sort.split(' ')

        if (sortType === 'asc') {
            // console.log(`sort:, ${sortType},${sortBy}`)
            res = await productQuery.ascending(sortBy)?.find()
        }else if (sortType === 'desc') {
            res = await productQuery.descending(sortBy).find()
        } else {
            res = await productQuery.find()
        }
    } else {
        res = await productQuery.find()
        // console.log('res', res)
    }

    return (
        <div className="w-full flex flex-wrap gap-x-8 gap-y-10 justify-between">
            {res.items.map((product: products.Product) => {
                return <div key={product._id} className="w-full md:w-[45%] lg:w-[22%] gap-4 flex flex-col">
                    {/* Image */}
                    <Link href={`/${product.slug}`} className="relative rounded-md overflow-hidden h-80 w-full shrink-0">
                        <Image
                            src={product.media?.mainMedia?.image?.url || '/product.png'}
                            alt=''
                            fill
                            className="object-cover z-10 bg-slate-200 hover:opacity-0 transition-opacity ease-in-out duration-500" />
                        {product.media?.items && (
                            <Image
                                src={product.media?.items[1]?.image?.url || '/product.png'}
                                alt=''
                                fill
                                className="object-cover bg-slate-200" />
                        )}
                    </Link>
                    {/* Product Area */}
                    <div className="w-full flex flex-col flex-1 gap-4 justify-between">
                        <div className="w-full flex items-center justify-between text-lg">
                            <h1 className="font-medium">{product.name}</h1>
                            <span className="font-semibold">${product.priceData?.price}</span>
                        </div>
                        {/* Description */}
                        {product.additionalInfoSections && <div className="text-md text-gray-500 flex" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.additionalInfoSections?.find((section: any) => section.title === 'shortDesc')?.description || "") }}>
                        </div>}
                        {/* Button */}
                        <button className='w-fit px-3 py-2 ring-1 ring-tem-red-200 rounded-2xl text-sm text-tem-red-200'>Add to cart</button>
                    </div>
                </div>
            })}

            <Pagination  currentPage={res.currentPage!} hasPrev={res.hasPrev()} hasNext={res.hasNext()}/>
        </div>
    )
}

export default ListItems