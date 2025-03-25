'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Pagination = ({currentPage, hasPrev, hasNext}: {currentPage: number, hasPrev:boolean, hasNext:boolean}) => {
    const { replace } = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const addPageParam = (current: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', current.toString())
        replace(`${pathname}?${params.toString()}`)
    }

  return (
    <div className='w-full flex items-center justify-between'>
        <button className='p-2 w-24 text-white bg-pink-500 disabled:bg-pink-200 disabled:cursor-not-allowed rounded-md' disabled={!hasPrev} onClick={(()=>addPageParam(currentPage - 1))}>Prev</button>
        <button className='p-2 w-24 text-white bg-pink-500 disabled:bg-pink-200 disabled:cursor-not-allowed rounded-md' disabled={!hasNext} onClick={(()=>addPageParam(currentPage + 1))}>Next</button>
    </div>
  )
}

export default Pagination