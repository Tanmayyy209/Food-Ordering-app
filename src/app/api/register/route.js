import { User} from "@/models/User"
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const uri = 'mongodb+srv://food-ordering:1b2kzZ9jyOZL1BEM@cluster0.f5yf323.mongodb.net/food-ordering';



export async function POST(req) {
const body = await req.json();
    mongoose.connect(uri);
    const pass = body.password;
    if(!pass?.length || pass.length < 5){
        new Error('password must be at least 5 character');
    }


const notHashedPassword = pass;
const salt = bcrypt.genSaltSync(10);
body.password = bcrypt.hashSync(notHashedPassword, salt);


    const creadtedUser = await User.create(body);
    return Response.json(creadtedUser);

} 
