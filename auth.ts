import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        
        const settings = await prisma.settings.findUnique({
          where:{
            id:"settings"
          }
        })

        let user = null
        const username = credentials.username
        const password = credentials.password
        
        if(!username || !password) return null

        if(!settings){
     
   
          // return user object with their profile data
          if(username !=='eagle car rental' ||  password !=='afsarafsar') return null
        
          return {name:'Eagle Car Rental'}
        }else{

          const {email,password:settingsPassword} = settings

          if(username !==email ||  password !== settingsPassword) return null
        
          return {name:'Eagle Car Rental'}
        }
    
      },
    })
  ],
  pages: {
    signIn: "/login",
    signOut:'/login'
  },
})