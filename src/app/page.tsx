import CategoryList from "@/components/CategoryList"
import ListItems from "@/components/ListItems"
import Slider from "@/components/Slider"
import { Suspense } from "react"

const HomePage = async () => {

    return (
        <div className='w-full'>
            <Slider />
            <div className="mt-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col">
                <h1 className="font-medium text-3xl mb-10">Featured Products</h1>
                <Suspense fallback={"...Loading"} >
                    <ListItems categoryId={process.env.FEATURED_PRODUCTS_WIX_CLIENT_ID!} limit={4} />
                </Suspense>
            </div>
            <div className="mt-20 px-4 flex flex-col">
                <h1 className="font-medium text-3xl mb-10 md:px-8 lg:px-16 xl:px-32 2xl:px-64">Categories</h1>
                <CategoryList />
            </div>
            <div className="mt-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col">
                <h1 className="font-medium text-3xl mb-10">New Products</h1>
                <ListItems categoryId={process.env.FEATURED_PRODUCTS_WIX_CLIENT_ID!} limit={4} />
            </div>
        </div>
    )
}

export default HomePage