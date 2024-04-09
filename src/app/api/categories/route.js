import mongoose from "mongoose";
import { Category } from "@/models/category";
import {isAdmin} from "@/app/api/auth/[...nextauth]/route";


const uri = 'mongodb+srv://food-ordering:1b2kzZ9jyOZL1BEM@cluster0.f5yf323.mongodb.net/food-ordering'


export async function POST(req) {
     mongoose.connect(uri);
     const {name} = await req.json();
     if (await isAdmin()) {
      const categoryDoc = await Category.create({name});
      return Response.json(categoryDoc);
    } else {
      return Response.json({});
    }
  }
  

  export async function PUT(req) {
    mongoose.connect(uri);
    const {_id, name} = await req.json();
    if (await isAdmin()) {
      await Category.updateOne({_id}, {name});
    }
    return Response.json(true);
  }

  export async function GET() {
    mongoose.connect(uri);
    return Response.json(
      await Category.find()
    );
  }

  export async function DELETE(req) {
    mongoose.connect(uri);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()) {
      await Category.deleteOne({_id});
    }
    return Response.json(true);
  }