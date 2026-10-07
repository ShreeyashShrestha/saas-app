import Image from 'next/image'
import Link from 'next/link'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Navitems from './Navitems'

const Navbar = ({ clerkConfigured }: { clerkConfigured: boolean }) => {
  return (
    <nav className='navbar'>
        <Link href={`/`}>
            <div className='flex items-center gap-2.5 cursor-pointer'>
                <Image src={"/images/logo.svg"} alt='logo' width={46} height={44}/>
            </div>
        </Link>
        <div className='flex items-center gap-8'>
            <Navitems />
            {clerkConfigured && (
                <>
                    <Show when="signed-out">
                        <div className='flex items-center gap-3'>
                            <SignInButton mode="redirect">
                                <button type="button" className='btn-signin'>Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="redirect">
                                <button type="button" className='btn-signin'>Sign Up</button>
                            </SignUpButton>
                        </div>
                    </Show>
                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                </>
            )}
        </div>
    </nav>
  )
}

export default Navbar