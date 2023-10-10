
import express  from "express";
const app = express()
import userRoute from "./routes/user.route.js";
import mongoose from "mongoose";

import authRoute from "./routes/auth.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

mongoose.set("strictQuery", true)

import dotenv from "dotenv";
dotenv.config();

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connection Successful")
      }
      catch (error) {
        console.log(error);
      }
};

// 2- after writing login axios concept in Login.jsx =>to connect frontend server to backend use this and before use instal yarn add cors in api section 
app.use(cors({origin:"http://localhost:5173", credentials:true}));
// we are sending cookies from frontend to backend so credential true is needed

app.use(express.json());
app.use(cookieParser());

 
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/gigs",gigRoute);
app.use("/api/orders",orderRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);
app.use("/api/reviews",reviewRoute);

// middleware for error 
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong"

  return res.status(errorStatus).send(errMessage);
});


app.listen(8800, ()=>{
    connect();
    console.log("Backend Server is running at 8800 ")
}) 