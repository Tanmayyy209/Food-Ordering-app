import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {User} from "@/models/User";
import mongoose from "mongoose";

const uri = 'mongodb+srv://food-ordering:1b2kzZ9jyOZL1BEM@cluster0.f5yf323.mongodb.net/food-ordering'


export async function GET() {
  mongoose.connect(uri);
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}