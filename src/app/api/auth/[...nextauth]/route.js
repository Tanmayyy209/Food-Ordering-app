import CredentialsProvider from "next-auth/providers/credentials"
import * as mongoose from "mongoose"
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import  { User } from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from '@/libs/mongoconnect';
import { UserInfo } from "@/models/UserInfo";
import { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";


const uri = 'mongodb+srv://food-ordering:1b2kzZ9jyOZL1BEM@cluster0.f5yf323.mongodb.net/food-ordering'
const GOOGLE_CLIENT_ID = "1085210197236-8cmpajnum0jg8pt9omvljq2erfhbhhmg.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
const SECRET = "bcbcjbdcsbcjsbsdcb"



export const authOptions =  {
  secret: SECRET,
  adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
        CredentialsProvider({
          name: 'Credentials',
          id: 'credentials',
          credentials: {
            username: { label: "Email", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const email = credentials?.email;
            const password = credentials?.password;
    
            mongoose.connect(uri);
            const user = await User.findOne({email});
            const passwordOk = user && bcrypt.compareSync(password, user.password);
    
            if (passwordOk) {
              return user;
            }
   
            return null
          }
        })
      ]
  
}

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }   