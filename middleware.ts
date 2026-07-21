// export { auth as middleware } from "@/auth"
import {auth} from '@/auth'
import {  NextResponse } from 'next/server'

 
export default auth((req)=>{
    const isLoggedIn = !!req.auth
    if(!isLoggedIn)  return NextResponse.redirect(new URL('/login', req.url))
   
})

export const config =  {

    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|login).*)',],
}