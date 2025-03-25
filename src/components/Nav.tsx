import Link from "next/link"
import Menu from "./Menu"
import SearchBar from "./SearchBar"
import dynamic from "next/dynamic"
// import NavLinks from "./NavLinks"

const NavLinks = dynamic(()=>import('./NavLinks'), {ssr: false})

const Nav = () => {
  return (
    <div className='h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
        {/* MOBILE */}
        <div className="w-full h-full md:hidden flex items-center justify-between">
            <Link href='/'>
                <div className="text-2xl">BONO</div>
            </Link>
            <Menu />
        </div>

        {/* DESKTOP */}
        <div className="w-full h-full hidden md:flex items-center justify-between gap-8">
            {/* LEFT */}
            <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
                <Link href='/'>
                    <div className="text-2xl">BONO</div>
                </Link>

                <div className="hidden xl:flex items-center gap-4">
                    <Link href='/'>Home</Link>
                    <Link href='/'>About</Link>
                    <Link href='/'>Contact</Link>
                    <Link href='/'>Testimonials</Link>
                    <Link href='/'>Services</Link>
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
                <SearchBar />
                <NavLinks />
            </div>
        </div>
    </div>
  )
}

export default Nav