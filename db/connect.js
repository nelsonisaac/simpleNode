import mongoose from "mongoose"

const connectDB = (URL) => {
    console.log('connecting to DB');
    return mongoose
    .connect(URL,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    
}

export default connectDB;